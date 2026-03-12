import pandas as pd
import numpy as np

class FeatureEngineer:
    def __init__(self):
        pass

    def extract_features(self, data):
        """
        Takes raw extracted financial values and creates structured ML features.
        """
        # Debt Ratio = total_liabilities / total_assets
        total_assets = data.get('total_assets', 1000000)
        if total_assets == 0: total_assets = 1 # Avoid div zero
        debt_ratio = data.get('total_liabilities', 0) / total_assets
        
        # Profit Margin = net_profit / revenue
        revenue = data.get('revenue', 1000000)
        if revenue == 0: revenue = 1
        profit_margin = data.get('net_profit', 0) / revenue
        
        # Cash Flow Stability
        cash_flow = data.get('cash_flow', 0)
        
        # Credit Score
        credit_score = data.get('director_credit_score', 600)
        
        # Collateral Coverage Ratio
        # Assuming loan amount might be needed here, or just basic value
        collateral_value = data.get('collateral_value', 0)
        
        # GST Growth
        gst_growth = data.get('gst_growth', 0)
        
        # Feature dictionary for internal use
        features = {
            'revenue': revenue / 100000, # In lakhs
            'profit_margin': profit_margin,
            'debt_ratio': debt_ratio,
            'cash_flow': cash_flow / 10000, # scaled
            'credit_score': credit_score,
            'collateral_value': collateral_value / 100000, # in lakhs
            'gst_growth': gst_growth
        }
        
        return features

    def get_feature_vector(self, features):
        """
        Converts the features dictionary into a list/array for the ML model.
        MUST match the training column order:
        ['revenue', 'profit_margin', 'debt_ratio', 'cash_flow', 'credit_score', 'collateral_value', 'gst_growth']
        """
        ordered_keys = ['revenue', 'profit_margin', 'debt_ratio', 'cash_flow', 'credit_score', 'collateral_value', 'gst_growth']
        return [features[k] for k in ordered_keys]
