import pickle
import os
import numpy as np

class CreditModel:
    def __init__(self, model_path='models/credit_model.pkl'):
        self.model_path = model_path
        self.model = None
        self.load_model()

    def load_model(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            print("Model loaded successfully.")
        else:
            print(f"Model file not found at {self.model_path}")

    def predict(self, feature_vector, feature_names=None):
        """
        Runs prediction on the feature vector.
        0 = Approve, 1 = Review, 2 = Reject
        Returns decision and risk score.
        """
        if self.model is None:
            return 1, 0.5 # Default to review with medium risk if model not found
        
        # Prepare for prediction (X must be 2D array)
        if feature_names:
            import pandas as pd
            X = pd.DataFrame([feature_vector], columns=feature_names)
        else:
            X = np.array([feature_vector])
        
        # Predict class
        decision_class = self.model.predict(X)[0]
        
        # Risk score calculation
        try:
            probs = self.model.predict_proba(X)[0]
            # Risk score as high probability of reject (class 2)
            risk_score = probs[2]
            # Adjust if class 1 is also high
            risk_score += probs[1] * 0.5
        except:
            # Fallback if probability not available
            risk_score = 0.9 if decision_class == 2 else 0.5 if decision_class == 1 else 0.1

        return int(decision_class), float(risk_score)

    def explain_decision(self, features):
        """
        Provides reasons for the decision based on feature thresholds.
        Tailored for Indian Context (CIBIL, GST, etc.)
        """
        reasons = []
        
        if features['debt_ratio'] > 0.8:
            reasons.append("High financial leverage identified (Debt-to-Asset Ratio > 0.8)")
        elif features['debt_ratio'] > 0.5:
            reasons.append("Moderate debt levels observed")

        if features['profit_margin'] < 0.05:
            reasons.append("Low profitability margin identified (< 5%)")

        if features['credit_score'] < 650:
            reasons.append("Low Bureau (CIBIL-like) credit score identified")
        elif features['credit_score'] < 750:
            reasons.append("Satisfactory credit score, but scope for improvement")
            
        if features['cash_flow'] < 10:
            reasons.append("Weak cash flow stability in recent cycles")

        if features['gst_growth'] < 0:
            reasons.append("Negative GST turnover trend identified")
        elif features['gst_growth'] > 0.15:
            reasons.append("Strong GST turnover growth verified")
            
        if not reasons:
            reasons.append("Exceptional overall financial health and compliance profile")

        return reasons

    def get_decision_label(self, class_id):
        # 0 = Approve, 1 = Review, 2 = Reject
        mapping = {
            0: "APPROVED (LOW RISK)",
            1: "REVIEW REQUIRED (MODERATE RISK)",
            2: "HIGH RISK / REJECTED"
        }
        return mapping.get(class_id, "REVIEW REQUIRED")
