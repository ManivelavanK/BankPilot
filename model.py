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

    def predict(self, feature_vector):
        """
        Runs prediction on the feature vector.
        0 = Approve, 1 = Review, 2 = Reject
        Returns decision and risk score.
        """
        if self.model is None:
            return 1, 0.5 # Default to review with medium risk if model not found
        
        # Prepare for prediction (X must be 2D array)
        X = np.array([feature_vector])
        
        # Predict class
        decision_class = self.model.predict(X)[0]
        
        # Risk score calculation
        # Predict probabilities (if available in model)
        # Class 0: Approve (Low risk)
        # Class 1: Review (Medium risk)
        # Class 2: Reject (High risk)
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
        """
        reasons = []
        
        if features['debt_ratio'] > 0.8:
            reasons.append("High financial leverage (Debt Ratio > 0.8)")
        elif features['debt_ratio'] > 0.5:
            reasons.append("Moderate debt levels")

        if features['profit_margin'] < 0.05:
            reasons.append("Low profitability margin (< 5%)")

        if features['credit_score'] < 600:
            reasons.append("Low director credit score (< 600)")
        elif features['credit_score'] < 700:
            reasons.append("Moderate credit score")
            
        if features['cash_flow'] < 10: # Scaled
            reasons.append("Weak cash flow")

        if features['gst_growth'] < 0:
            reasons.append("Negative GST growth trend")
            
        if not reasons:
            reasons.append("Strong overall financial health")

        return reasons

    def get_decision_label(self, class_id):
        # 0 = Approve, 1 = Review, 2 = Reject
        mapping = {
            0: "APPROVE",
            1: "REVIEW REQUIRED",
            2: "HIGH RISK"
        }
        return mapping.get(class_id, "REVIEW REQUIRED")
