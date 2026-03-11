import pandas as pd
import pdfplumber
import os

class DocumentParser:
    def __init__(self):
        pass
    
    def parse_document(self, filepath, doc_type):
        """
        Parses a document and extracts basic financial indicators.
        Returns a dictionary of fields.
        """
        extension = os.path.splitext(filepath)[1].lower()
        
        # Prototype: Rule-based extraction logic
        # In a real scenario, this would use OCR for PDF or detailed parsing for CSV/Excel
        if extension == '.csv':
            return self._parse_csv(filepath, doc_type)
        elif extension in ['.xlsx', '.xls']:
            return self._parse_excel(filepath, doc_type)
        elif extension == '.pdf':
            return self._parse_pdf(filepath, doc_type)
        
        return {}

    def _parse_csv(self, filepath, doc_type):
        try:
            df = pd.read_csv(filepath)
            # Mock extraction for prototype
            return self._extract_indicators_from_df(df, doc_type)
        except Exception as e:
            print(f"Error parsing CSV: {e}")
            return {}

    def _parse_excel(self, filepath, doc_type):
        try:
            df = pd.read_excel(filepath)
            # Mock extraction for prototype
            return self._extract_indicators_from_df(df, doc_type)
        except Exception as e:
            print(f"Error parsing Excel: {e}")
            return {}

    def _parse_pdf(self, filepath, doc_type):
        try:
            text = ""
            with pdfplumber.open(filepath) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() + "\n"
            
            # Simulated extraction from text for prototype
            # Mocking values based on document type
            return self._mock_extraction(doc_type)
        except Exception as e:
            print(f"Error parsing PDF: {e}")
            return {}

    def _extract_indicators_from_df(self, df, doc_type):
        # In a real system, we'd look for specific column names
        # For prototype, we provide realistic mock values based on the file type
        return self._mock_extraction(doc_type)

    def _mock_extraction(self, doc_type):
        """
        Returns mock clinical data based on document type for the hackathon prototype.
        Real production systems would use specific document scrapers or OCR.
        """
        data = {}
        if doc_type == 'gst_data':
            data = {
                'gst_sales': 12000000, # 1.2 Cr
                'tax_paid': 1800000,
                'gst_growth': 0.15
            }
        elif doc_type == 'bank_statement':
            data = {
                'bank_balance': 500000,
                'cash_inflow': 2400000,
                'cash_outflow': 1800000,
                'cash_flow': 600000
            }
        elif doc_type == 'financial_statement' or doc_type == 'annual_report':
            data = {
                'revenue': 15000000, # 1.5 Cr
                'net_profit': 2200000,
                'total_assets': 50000000, # 5 Cr
                'total_liabilities': 15000000 # 1.5 Cr
            }
        elif doc_type == 'director_kyc':
            data = {
                'director_credit_score': 720
            }
        elif doc_type == 'collateral_documents':
            data = {
                'collateral_value': 8000000 # 80L
            }
        
        return data

    def process_all_docs(self, uploaded_files):
        combined_data = {}
        for doc_type, filepath in uploaded_files.items():
            doc_data = self.parse_document(filepath, doc_type)
            combined_data.update(doc_data)
        
        # Ensure all required fields have defaults if missing
        defaults = {
            'revenue': 0,
            'tax_paid': 0,
            'bank_balance': 0,
            'cash_inflow': 0,
            'cash_outflow': 0,
            'total_assets': 1000000, # Avoid div zero
            'total_liabilities': 0,
            'net_profit': 0,
            'director_credit_score': 600,
            'collateral_value': 0,
            'gst_growth': 0
        }
        
        for k, v in defaults.items():
            if k not in combined_data:
                combined_data[k] = v
                
        return combined_data
