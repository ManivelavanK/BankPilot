from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
from werkzeug.utils import secure_filename
import uuid

from modules.document_processor import DocumentProcessor
from modules.risk_analyzer import RiskAnalyzer
from modules.cam_generator import CAMGenerator

# Import Indian context methods
import sys
sys.path.append('modules')
from modules.indian_context_methods import *

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'csv', 'json', 'txt', 'xlsx', 'xls', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload directory
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize modules
doc_processor = DocumentProcessor()
risk_analyzer = RiskAnalyzer()
cam_generator = CAMGenerator()

# Store analysis results (in production, use database)
analysis_results = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-documents', methods=['POST'])
def upload_documents():
    try:
        session_id = str(uuid.uuid4())
        uploaded_files = {}
        
        print(f"Received files: {list(request.files.keys())}")
        
        # Handle file uploads
        for file_type in ['annual_report', 'financial_statement', 'gst_data', 'bank_statement', 'due_diligence', 'director_kyc', 'collateral_documents']:
            if file_type in request.files:
                file = request.files[file_type]
                if file and file.filename and allowed_file(file.filename):
                    filename = secure_filename(f"{session_id}_{file_type}_{file.filename}")
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    uploaded_files[file_type] = filepath
                    print(f"Saved file: {filename}")
        
        if not uploaded_files:
            print("No valid files uploaded")
            return jsonify({'error': 'No valid files uploaded'}), 400
        
        # Process documents
        try:
            extracted_data = doc_processor.process_documents(uploaded_files)
            
            # Add external research for Indian context
            company_name = extracted_data.get('company_name')
            if company_name:
                research_data = doc_processor.perform_external_research(company_name)
                extracted_data['external_research'] = research_data
            
            print(f"EXTRACTED DATA: {extracted_data}")
        except Exception as e:
            print(f"Document processing error: {e}")
            extracted_data = {'error': 'Document processing failed'}
        
        # Store for analysis
        analysis_results[session_id] = {
            'uploaded_files': uploaded_files,
            'extracted_data': extracted_data,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify({
            'session_id': session_id,
            'extracted_data': extracted_data,
            'message': 'Documents uploaded and processed successfully'
        })
        
    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/analyze-credit', methods=['POST'])
def analyze_credit():
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        
        if not session_id or session_id not in analysis_results:
            return jsonify({'error': 'Invalid session ID'}), 400
        
        session_data = analysis_results[session_id]
        extracted_data = session_data['extracted_data']
        
        # Perform risk analysis
        risk_analysis = risk_analyzer.analyze_risk(extracted_data)
        print(f"RISK ANALYSIS: {risk_analysis}")
        
        # Generate loan recommendation
        recommendation = risk_analyzer.generate_recommendation(risk_analysis, extracted_data)
        print(f"RECOMMENDATION: {recommendation}")
        
        # Update session data
        analysis_results[session_id].update({
            'risk_analysis': risk_analysis,
            'recommendation': recommendation
        })
        
        return jsonify({
            'risk_analysis': risk_analysis,
            'recommendation': recommendation
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-cam', methods=['POST'])
def generate_cam():
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        
        if not session_id or session_id not in analysis_results:
            return jsonify({'error': 'Invalid session ID'}), 400
        
        session_data = analysis_results[session_id]
        
        # Generate CAM report
        cam_report = cam_generator.generate_cam(session_data)
        
        return jsonify({
            'cam_report': cam_report
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ai-query', methods=['POST'])
def ai_query():
    try:
        data = request.get_json()
        query = data.get('query', '').lower()
        session_id = data.get('session_id')
        
        if not session_id or session_id not in analysis_results:
            return jsonify({'error': 'No analysis data available'}), 400
        
        session_data = analysis_results[session_id]
        
        # Simple query handling
        response = handle_ai_query(query, session_data)
        
        return jsonify({'response': response})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def handle_ai_query(query, session_data):
    """Handle AI Copilot queries with detailed explainability"""
    recommendation = session_data.get('recommendation', {})
    risk_analysis = session_data.get('risk_analysis', {})
    extracted_data = session_data.get('extracted_data', {})
    
    query_lower = query.lower()
    
    # Detailed explainability responses
    if 'why' in query_lower and ('approved' in query_lower or 'rejected' in query_lower):
        decision = recommendation.get('decision', 'UNKNOWN')
        score = risk_analysis.get('total_score', 0)
        risk_factors = risk_analysis.get('risk_factors', [])
        
        explanation = f"""DECISION EXPLANATION:
        
Final Decision: {decision}
Risk Score: {score}/100
        
DETAILED ANALYSIS:
1. Character Assessment: {risk_analysis.get('character_score', 'N/A')}/100
2. Capacity Analysis: {risk_analysis.get('capacity_score', 'N/A')}/100  
3. Capital Evaluation: {risk_analysis.get('capital_score', 'N/A')}/100
4. Conditions Review: {risk_analysis.get('conditions_score', 'N/A')}/100
5. Collateral Assessment: {risk_analysis.get('collateral_score', 'N/A')}/100
        
KEY FACTORS:
{chr(10).join([f'• {factor}' for factor in risk_factors[:5]])}
        
RECOMMENDATION: {recommendation.get('explanation', 'Analysis complete')}"""
        return explanation
        
    elif 'risk' in query_lower:
        return f"""RISK ANALYSIS SUMMARY:
        
Overall Risk Score: {risk_analysis.get('total_score', 'N/A')}/100
Risk Classification: {'Low Risk' if risk_analysis.get('total_score', 0) > 75 else 'Medium Risk' if risk_analysis.get('total_score', 0) > 50 else 'High Risk'}
        
FIVE Cs BREAKDOWN:
• Character: {risk_analysis.get('character_score', 'N/A')}/100
• Capacity: {risk_analysis.get('capacity_score', 'N/A')}/100
• Capital: {risk_analysis.get('capital_score', 'N/A')}/100
• Conditions: {risk_analysis.get('conditions_score', 'N/A')}/100
• Collateral: {risk_analysis.get('collateral_score', 'N/A')}/100
        
KEY RISK FACTORS:
{chr(10).join([f'• {factor}' for factor in risk_analysis.get('risk_factors', [])])}"""
        
    elif 'financial' in query_lower or 'data' in query_lower:
        return f"""FINANCIAL DATA EXTRACTED:
        
COMPANY: {extracted_data.get('company_name', 'Not identified')}
DOCUMENT TYPE: {extracted_data.get('document_type', 'Unknown')}
        
FINANCIAL METRICS:
• Revenue: ₹{extracted_data.get('revenue', 0):,}
• Profit: ₹{extracted_data.get('profit', 0):,}
• Debt: ₹{extracted_data.get('debt', 0):,}
• Profit Margin: {risk_analysis.get('profit_margin', 'N/A')}%
• Debt Ratio: {risk_analysis.get('debt_ratio', 'N/A')}%
        
REGULATORY IDs:
• PAN: {extracted_data.get('pan', 'Not found')}
• GSTIN: {extracted_data.get('gstin', 'Not found')}
• CIN: {extracted_data.get('cin', 'Not found')}
        
DATA SOURCES:
• GST Sales: ₹{extracted_data.get('gst_sales', 0):,}
• Bank Deposits: ₹{extracted_data.get('bank_deposits', 0):,}"""
        
    elif 'gstr' in query_lower or 'gst' in query_lower:
        return f"""GST ANALYSIS:
        
DOCUMENT CLASSIFICATION: {extracted_data.get('document_type', 'Unknown')}
GST SALES REPORTED: ₹{extracted_data.get('gst_sales', 0):,}
BANK DEPOSITS: ₹{extracted_data.get('bank_deposits', 0):,}
        
COMPLIANCE CHECK:
• GSTIN Identified: {'Yes' if extracted_data.get('gstin') else 'No'}
• Data Consistency: {'Good' if abs(extracted_data.get('gst_sales', 0) - extracted_data.get('bank_deposits', 0)) < 1000000 else 'Requires Review'}
        
Note: GSTR-2A shows input tax credits while GSTR-3B shows monthly returns. Our system analyzes both for comprehensive assessment."""
        
    elif 'cibil' in query_lower:
        return f"""CIBIL ANALYSIS:
        
DOCUMENT TYPE: {extracted_data.get('document_type', 'Unknown')}
CREDIT RATING: {extracted_data.get('credit_rating', 'Not found')}
        
CIBIL COMMERCIAL INSIGHTS:
• Company Credit History: Under Review
• Payment Behavior: {extracted_data.get('payment_behavior', 'Not available')}
• Outstanding Obligations: Analysis in progress
        
Note: CIBIL Commercial reports provide detailed credit history for businesses. Integration with live CIBIL data recommended for production."""
        
    else:
        return """I can provide detailed explanations about:
        
• WHY decisions were made (ask "why was this approved/rejected?")
• RISK analysis breakdown (ask "explain the risk factors")
• FINANCIAL data extraction (ask "show financial data")
• GST compliance analysis (ask "explain GST analysis")
• CIBIL credit assessment (ask "show CIBIL analysis")
        
My analysis uses the Five Cs of Credit framework with Indian regulatory context including GSTR forms, CIBIL reports, and MCA compliance."""
    
    return response

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)