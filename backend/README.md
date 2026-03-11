# Sample Test Data for BankPilot Demo

## Sample Annual Report Data (for PDF testing)
Company: TechCorp Manufacturing Pvt Ltd
Annual Revenue: ₹180,000,000
Net Profit: ₹24,000,000
Total Debt: ₹45,000,000
EBITDA Margin: 18%
Credit Rating: BBB+
Promoter: Rajesh Kumar

## Sample GST Data (CSV format)
Date,Invoice_No,Sales,CGST,SGST,Total
2023-01-01,INV001,500000,45000,45000,590000
2023-01-02,INV002,750000,67500,67500,885000
2023-01-03,INV003,300000,27000,27000,354000

## Sample Bank Statement (CSV format)
Date,Description,Debit,Credit,Balance
2023-01-01,Opening Balance,0,1000000,1000000
2023-01-02,Customer Payment,0,590000,1590000
2023-01-03,Supplier Payment,200000,0,1390000
2023-01-04,Customer Payment,0,885000,2275000

## API Testing Commands

### 1. Upload Documents
curl -X POST http://localhost:5000/upload-documents \
  -F "annual_report=@sample_annual_report.pdf" \
  -F "gst_data=@sample_gst.csv" \
  -F "bank_statement=@sample_bank.csv"

### 2. Analyze Credit
curl -X POST http://localhost:5000/analyze-credit \
  -H "Content-Type: application/json" \
  -d '{"session_id": "your_session_id_here"}'

### 3. Generate CAM
curl -X POST http://localhost:5000/generate-cam \
  -H "Content-Type: application/json" \
  -d '{"session_id": "your_session_id_here"}'

### 4. AI Query
curl -X POST http://localhost:5000/ai-query \
  -H "Content-Type: application/json" \
  -d '{"query": "Why was this loan approved?", "session_id": "your_session_id_here"}'

## Expected Workflow
1. Start backend server: python app.py
2. Upload documents via frontend or API
3. Get session_id from upload response
4. Analyze credit using session_id
5. Generate CAM report
6. Query AI Copilot for explanations