from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename

# Import custom modules
from document_parser import DocumentParser
from feature_engineering import FeatureEngineer
from model import CreditModel
from utils import allowed_file

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'csv', 'xlsx', 'xls', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize modules
doc_parser = DocumentParser()
feature_engineer = FeatureEngineer()
credit_model = CreditModel('models/credit_model.pkl')

# Memory store for prototype
analysis_results = {}

@app.route('/upload-documents', methods=['POST'])
def upload_documents():
    try:
        session_id = str(uuid.uuid4())
        uploaded_files = {}
        
        # In a real app, the frontend sends specific keys for file types
        # Matching names from DataUpload.tsx
        file_types = [
            'gst_data', 'bank_statement', 'annual_report', 
            'financial_statement', 'director_kyc', 'collateral_documents'
        ]
        
        for ft in file_types:
            if ft in request.files:
                file = request.files[ft]
                if file and file.filename and allowed_file(file.filename, ALLOWED_EXTENSIONS):
                    filename = secure_filename(f"{session_id}_{ft}_{file.filename}")
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    uploaded_files[ft] = filepath
        
        if not uploaded_files:
            return jsonify({'error': 'No valid documents uploaded'}), 400
            
        # Extract initial data
        extracted_data = doc_parser.process_all_docs(uploaded_files)
        
        # Store metadata
        analysis_results[session_id] = {
            'uploaded_files': uploaded_files,
            'extracted_data': extracted_data,
            'timestamp': datetime.now().isoformat(),
            'status': 'uploaded'
        }
        
        return jsonify({
            'session_id': session_id,
            'message': 'Documents uploaded successfully',
            'extracted_data': extracted_data
        })
        
    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/analyze-credit', methods=['POST'])
@app.route('/analyze', methods=['POST'])
def analyze():
    # Handles both /analyze and /analyze-credit for compatibility
    try:
        data = request.json
        session_id = data.get('session_id')
        
        if not session_id or session_id not in analysis_results:
            return jsonify({'error': 'Invalid or expired session ID'}), 404
            
        session_data = analysis_results[session_id]
        extracted_data = session_data['extracted_data']
        
        # Pipeline execution
        # 1. Feature Engineering
        features = feature_engineer.extract_features(extracted_data)
        feature_vector = feature_engineer.get_feature_vector(features)
        
        # 2. Prediction
        decision_class, risk_val = credit_model.predict(feature_vector)
        decision_label = credit_model.get_decision_label(decision_class)
        
        # 3. Explainability
        reasons = credit_model.explain_decision(features)
        
        # 4. Map to frontend expected scores (0-100)
        # Class 0: Approve (~80-100)
        # Class 1: Review (~50-79)
        # Class 2: Reject (< 50)
        total_score = int((1 - risk_val) * 100)
        
        # Map features to specific scores for radar chart
        risk_analysis = {
            'total_score': total_score,
            'character_score': int(extracted_data.get('director_credit_score', 600) / 9),
            'capacity_score': int((1 - features['debt_ratio']) * 100) if features['debt_ratio'] < 1 else 10,
            'capital_score': int(features['profit_margin'] * 200) + 50, # Rough mapping
            'conditions_score': 85, # Default good sector
            'collateral_score': 90 if features['collateral_value'] > 50 else 60,
            'risk_factors': reasons,
            'extracted_data': extracted_data
        }
        
        # Sanitize scores to max 100
        for k, v in risk_analysis.items():
            if k.endswith('_score') and isinstance(v, int):
                risk_analysis[k] = min(max(v, 0), 100)

        # Loan recommendation object expected by frontend
        recommendation = {
            'decision': decision_label,
            'risk_score': risk_val, # As in prompt (0-1)
            'reasons': reasons,
            'interest_rate': "10.5%" if decision_class == 0 else "12.0%" if decision_class == 1 else "N/A",
            'recommended_limit': "₹5 Cr", # Dummy
            'explanation': "The AI engine has analyzed all documents and determined this rating based on the provided financial metrics and credit history."
        }
        
        # Store results
        analysis_results[session_id].update({
            'risk_analysis': risk_analysis,
            'recommendation': recommendation,
            'status': 'completed'
        })
        
        return jsonify({
            'session_id': session_id,
            'risk_analysis': risk_analysis,
            'recommendation': recommendation
        })
        
    except Exception as e:
        print(f"Analysis error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/ai-query', methods=['POST'])
def ai_query():
    try:
        data = request.json
        query = data.get('query', '').lower()
        session_id = data.get('session_id')
        
        if not session_id or session_id not in analysis_results:
            return jsonify({'response': "Please upload and analyze documents first before asking questions."})
            
        session_data = analysis_results[session_id]
        
        # Simplified AI assistant based on analysis results
        recommendation = session_data.get('recommendation', {})
        decision = recommendation.get('decision', 'IN PROGRESS')
        reasons = recommendation.get('reasons', [])
        
        if 'why' in query:
            resp = f"The decision for {decision} was made because: {', '.join(reasons)}."
        elif 'risk' in query:
            resp = f"The overall risk score is {int((1-recommendation.get('risk_score', 0))*100)}/100. High risk factors: {', '.join(reasons[:2])}."
        elif 'revenue' in query or 'financial' in query:
            rev = session_data['extracted_data'].get('revenue', 0)
            resp = f"Extracted revenue is ₹{rev:,}. Profit margin is healthy at {int(session_data['risk_analysis']['capital_score']/5)}%."
        else:
            resp = f"Based on the analysis, the status is {decision}. I can discuss the financial indicators like debt ratio, net profit, or collateral value. What would you like to know?"
            
        return jsonify({'response': resp})
        
    except Exception as e:
        return jsonify({'response': f"I encountered an error processing your query: {str(e)}"})

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    # Initial train if model doesn't exist (optional, usually handled by train_model.py)
    if not os.path.exists('models/credit_model.pkl'):
        print("Model not found. Running training...")
        import train_model
        train_model.train_and_save_model()
        
    app.run(debug=True, host='0.0.0.0', port=5000)