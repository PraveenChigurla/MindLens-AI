import pandas as pd
import numpy as np
from app.predictor import get_predictor
import logging

logging.basicConfig(level=logging.INFO)

def main():
    try:
        df = pd.read_excel("../updated_70_samples.xlsx")
        df.dropna(subset=['status'], inplace=True)
        
        sample = df.sample(min(20, len(df)), random_state=42)
        predictor = get_predictor()
        
        match_count = 0
        for idx, row in sample.iterrows():
            text = row["rewritten"] if "rewritten" in row else str(row.iloc[0])
            true_status = row["status"]
            if true_status == 'Personality Disorder':
                true_status = 'Personality disorder'
                
            response = predictor.predict(text)
            
            print(f"Text: {text[:50]}...")
            print(f"True Status: {true_status}")
            print(f"Prediction: {response.prediction} (Confidence: {response.confidence:.4f})")
            print("-" * 30)
            match_count += 1
            
        print(f"Validation successful. Processed {match_count} samples.")
    except Exception as e:
        print(f"Error during validation: {e}")

if __name__ == "__main__":
    main()
