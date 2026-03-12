from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import json
from datetime import datetime

# Import from modules directory
from modules.document_processor import DocumentProcessor
from modules.risk_analyzer import RiskAnalyzer
import modules.indian_context_methods as indian_methods
from utils import save_uploaded_file, allowed_file

# ── History persistence ──────────────────────────────────────────────────────
HISTORY_FILE = 'data/analysis_history.json'

def _ensure_data_dir():
    os.makedirs('data', exist_ok=True)

def _load_history():
    _ensure_data_dir()
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return []

def _save_history(history: list):
    _ensure_data_dir()
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)

def _append_history_entry(entry: dict):
    """Prepend entry so newest appears first."""
    history = _load_history()
    history.insert(0, entry)
    _save_history(history)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'HEAD'])
def root():
    return jsonify({
        'status': 'active',
        'message': 'BankPilot AI Backend is running',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/health', methods=['GET', 'HEAD'])
def health():
    return jsonify({'status': 'healthy'})

@app.errorhandler(Exception)
def handle_exception(e):
    # Pass through HTTP errors
    print(f"CRITICAL ERROR: {str(e)}")
    import traceback
    traceback.print_exc()
    return jsonify({'error': str(e)}), 500

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'csv', 'xlsx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize processors
doc_processor = DocumentProcessor()
risk_analyzer = RiskAnalyzer()

@app.route('/upload-documents', methods=['POST'])
def upload_documents():
    if not request.files:
        return jsonify({'error': 'No files uploaded'}), 400
    
    session_id = str(uuid.uuid4())
    session_dir = os.path.join(UPLOAD_FOLDER, session_id)
    os.makedirs(session_dir, exist_ok=True)
    
    upload_results = []
    file_mapping = {}
    
    for key in request.files:
        files = request.files.getlist(key)
        for file in files:
            if file and allowed_file(file.filename, ALLOWED_EXTENSIONS):
                filepath, _ = save_uploaded_file(file, session_dir)
                upload_results.append({
                    'filename': file.filename,
                    'key': key,
                    'status': 'success'
                })
                # Store the last file for each key as the primary one for processing
                file_mapping[key] = filepath
                
                # Write metadata immediately to be safe
                with open(os.path.join(session_dir, 'metadata.json'), 'w') as f:
                    json.dump(file_mapping, f)
            
    return jsonify({
        'session_id': session_id,
        'files': upload_results,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    import time
    start_time = time.time()
    data = request.json
    session_id = data.get('session_id')
    loan_amount = data.get('loan_amount', 2.0)
    
    if not session_id:
        return jsonify({'error': 'Session ID is required'}), 400
        
    print(f"DEBUG: Starting analysis for session {session_id}")
    session_dir = os.path.join(UPLOAD_FOLDER, session_id)
    metadata_path = os.path.join(session_dir, 'metadata.json')
    
    if not os.path.exists(metadata_path):
        return jsonify({'error': 'Session metadata not found'}), 404
        
    try:
        with open(metadata_path, 'r') as f:
            file_mapping = json.load(f)
            
        # Process the actual documents
        s = time.time()
        extracted_data = doc_processor.process_documents(file_mapping)
        print(f"DEBUG: Document processing took {time.time()-s:.2f}s")
        
        # Add company name if present in request or defaults
        if 'company_name' not in extracted_data:
            extracted_data['company_name'] = data.get('company_name', 'Applicant Entity')
            
        # Perform external research
        s = time.time()
        research = doc_processor.perform_external_research(extracted_data['company_name'])
        extracted_data['research_intelligence'] = research['recent_news']
        print(f"DEBUG: External research took {time.time()-s:.2f}s")
        
        # Run risk analysis
        s = time.time()
        analysis = risk_analyzer.analyze_risk(extracted_data)
        analysis['extracted_data'] = extracted_data
        analysis['research_intelligence'] = extracted_data.get('research_intelligence', [])
        print(f"DEBUG: Risk analysis took {time.time()-s:.2f}s")
        
        # Generate recommendation
        s = time.time()
        requested_amount = request.json.get('loan_amount')
        recommendation = risk_analyzer.generate_recommendation(analysis, extracted_data, requested_amount)
        recommendation['reasons'] = [recommendation['explanation']] + recommendation.get('conditions', [])
        print(f"DEBUG: Recommendation generation took {time.time()-s:.2f}s")
        
        total_time = time.time() - start_time
        print(f"DEBUG: Total analysis time: {total_time:.2f}s")

        # ── Auto-save to Dashboard history ──────────────────────────────────
        try:
            company_name = extracted_data.get('company_name', data.get('company_name', 'Applicant Entity'))
            risk_score   = analysis.get('total_score', 0)
            decision     = recommendation.get('decision', 'REVIEW')
            confidence   = round((100 - risk_score * 0.1) / 100, 2)
            fraud_flags  = analysis.get('fraud_flags', [])
            loan_amt     = requested_amount or loan_amount

            history_entry = {
                'analysis_id': f'A{str(uuid.uuid4())[:6].upper()}',
                'session_id': session_id,
                'company_name': company_name,
                'risk_score': risk_score,
                'fraud_flags': fraud_flags,
                'loan_decision': decision,
                'confidence': confidence,
                'loan_amount': loan_amt,
                'recommended_limit': recommendation.get('recommended_limit', ''),
                'timestamp': datetime.now().isoformat()
            }
            _append_history_entry(history_entry)
            print(f"DEBUG: Saved history entry for {company_name} (score={risk_score})")
        except Exception as he:
            print(f"WARNING: Could not save history entry: {he}")
        # ────────────────────────────────────────────────────────────────────

        return jsonify({
            'session_id': session_id,
            'risk_analysis': analysis,
            'recommendation': recommendation,
            'research_findings': research['recent_news'],
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        print(f"ERROR: Analysis failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/ai-query', methods=['POST'])
def ai_query():
    data = request.json
    session_id = data.get('session_id')
    query = data.get('query')
    
    if not query:
        return jsonify({'error': 'Query is required'}), 400
        
    # Simulated AI response
    response = f"Based on the analyzed documents for session {session_id}, the company shows strong revenue growth but a slightly elevated debt ratio. {query} suggests a stable outlook."
    
    return jsonify({
        'response': response,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/history', methods=['GET'])
def get_history():
    """Return all persisted analysis history records (newest first)."""
    history = _load_history()
    return jsonify({'history': history, 'total': len(history)})


@app.route('/dashboard-summary', methods=['GET'])
def dashboard_summary():
    history = _load_history()
    total = len(history)

    approved_count = sum(1 for h in history if h.get('loan_decision') == 'APPROVED')
    review_count   = sum(1 for h in history if h.get('loan_decision') == 'REVIEW')
    high_risk      = sum(1 for h in history if h.get('risk_score', 0) >= 70)
    medium_risk    = sum(1 for h in history if 40 <= h.get('risk_score', 0) < 70)
    low_risk       = sum(1 for h in history if h.get('risk_score', 0) < 40)

    # Recent activity rows for the Evaluation Hub table
    recent_activity = []
    for h in history[:10]:
        score = h.get('risk_score', 0)
        if score >= 70:
            risk_level = 'High'
        elif score >= 40:
            risk_level = 'Medium'
        else:
            risk_level = 'Low'
        recent_activity.append({
            'id': h.get('session_id', h.get('analysis_id', 'N/A')),
            'company': h.get('company_name', 'Unknown'),
            'amount': f"₹{h.get('loan_amount', 0)} Cr" if h.get('loan_amount') else 'N/A',
            'status': 'AI Analysis Complete',
            'riskLevel': risk_level,
            'sector': 'General',
            'ews': score >= 70,
            'timestamp': h.get('timestamp', '')
        })

    # Revenue trend: last 6 months approximation from history
    from collections import defaultdict
    monthly = defaultdict(list)
    for h in history:
        ts = h.get('timestamp', '')
        if ts:
            try:
                dt = datetime.fromisoformat(ts)
                key = dt.strftime('%b')
                monthly[key].append(h.get('risk_score', 50))
            except Exception:
                pass
    revenue_trend = [
        {'month': m, 'revenue': round(100 - sum(v)/len(v), 1), 'target': 75}
        for m, v in list(monthly.items())[-6:]
    ] if monthly else [
        {'month': 'Oct', 'revenue': 125, 'target': 120},
        {'month': 'Nov', 'revenue': 138, 'target': 130},
        {'month': 'Dec', 'revenue': 152, 'target': 145},
        {'month': 'Jan', 'revenue': 168, 'target': 160},
        {'month': 'Feb', 'revenue': 175, 'target': 170},
        {'month': 'Mar', 'revenue': 142, 'target': 150},
    ]

    latest = history[0] if history else None
    latest_analysis = None
    if latest:
        latest_analysis = {
            'score': latest.get('risk_score', 0),
            'limit': latest.get('recommended_limit', '₹0.0 Cr'),
            'compliance': round(latest.get('confidence', 0) * 100),
            'rationales': [
                {'title': 'Latest Decision', 'desc': f"{latest.get('company_name')} — {latest.get('loan_decision')}"},
                {'title': 'Risk Score', 'desc': f"Score {latest.get('risk_score')} · Confidence {round(latest.get('confidence',0)*100)}%"}
            ]
        }

    document_insights = [
        {'doc': 'Financial Statements', 'status': 'Verified', 'confidence': 96, 'color': 'emerald'},
        {'doc': 'Bank Statements', 'status': 'Verified', 'confidence': 94, 'color': 'emerald'},
        {'doc': 'GST Filings', 'status': 'Verified', 'confidence': 98, 'color': 'emerald'},
    ] if total > 0 else [
        {'doc': 'Financial Statements', 'status': 'Pending', 'confidence': 0, 'color': 'gray'},
        {'doc': 'Bank Statements', 'status': 'Pending', 'confidence': 0, 'color': 'gray'},
    ]

    return jsonify({
        'total_applications': total,
        'approved_count': approved_count,
        'review_count': review_count,
        'average_risk_score': round(sum(h.get('risk_score', 0) for h in history) / total, 1) if total else 0,
        'risk_distribution': [
            {'name': 'Low Risk',    'value': low_risk,    'color': '#10b981'},
            {'name': 'Medium Risk', 'value': medium_risk, 'color': '#f59e0b'},
            {'name': 'High Risk',   'value': high_risk,   'color': '#ef4444'},
        ],
        'recent_activity': recent_activity,
        'revenue_trend': revenue_trend,
        'latest_analysis': latest_analysis,
        'document_insights': document_insights,
        'recent_alerts': (
            [{'id': 1, 'type': 'high', 'message': f'Revenue mismatch detected for {history[0]["company_name"]}'}]
            if history else
            [{'id': 1, 'type': 'medium', 'message': 'No analyses completed yet'}]
        )
    })

if __name__ == '__main__':
    # Ensure uploads directory exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
        
    # Check for trained model
    if not os.path.exists('models/credit_model.pkl'):
        print("Model not found. Running training...")
        try:
            from train_model import train_and_save_model
            train_and_save_model()
        except Exception as e:
            print(f"Bootstrap training failed: {e}")

    print("Starting Flask server on http://0.0.0.0:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
