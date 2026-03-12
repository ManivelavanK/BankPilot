import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

def generate_synthetic_data(n_samples=2000):
    np.random.seed(42)
    
    data = []
    for _ in range(n_samples):
        revenue = np.random.uniform(50, 1000) # Lakhs (50L to 10Cr)
        profit_margin = np.random.uniform(-0.1, 0.4)
        debt_ratio = np.random.uniform(0.1, 1.2)
        cash_flow = np.random.uniform(-5, 50)
        credit_score = np.random.uniform(300, 900)
        collateral_value = np.random.uniform(0, 500)
        gst_growth = np.random.uniform(-0.1, 0.5)
        
        # Scoring logic for synthetic labels
        score = 0
        if profit_margin > 0.15: score += 20
        if debt_ratio < 0.4: score += 25
        if credit_score > 750: score += 25
        if cash_flow > 10: score += 15
        if collateral_value > 100: score += 10
        if gst_growth > 0.15: score += 20
        
        # Penalties
        if debt_ratio > 0.9: score -= 30
        if credit_score < 600: score -= 40
        if profit_margin < 0: score -= 20
        
        # Decision Class
        if score > 60:
            status = 0 # Approve
        elif score > 25:
            status = 1 # Review
        else:
            status = 2 # Reject
            
        data.append([revenue, profit_margin, debt_ratio, cash_flow, credit_score, collateral_value, gst_growth, status])
    
    columns = ['revenue', 'profit_margin', 'debt_ratio', 'cash_flow', 'credit_score', 'collateral_value', 'gst_growth', 'loan_status']
    return pd.DataFrame(data, columns=columns)

def train_and_save_model():
    print("Generating comprehensive synthetic dataset for Indian Context...")
    df = generate_synthetic_data()
    
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/training_dataset.csv', index=False)
    
    X = df.drop('loan_status', axis=1)
    y = df['loan_status']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Optimizing Random Forest via GridSearchCV...")
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth': [None, 10, 15],
        'min_samples_split': [2, 5],
        'class_weight': ['balanced', None]
    }
    
    rf = RandomForestClassifier(random_state=42)
    grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1, verbose=1)
    grid_search.fit(X_train, y_train)
    
    best_model = grid_search.best_estimator_
    y_pred = best_model.predict(X_test)
    
    print(f"\nBest Parameters: {grid_search.best_params_}")
    print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model
    os.makedirs('models', exist_ok=True)
    with open('models/credit_model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    
    print("Optimized Indian-Context model saved to models/credit_model.pkl")

if __name__ == "__main__":
    train_and_save_model()
