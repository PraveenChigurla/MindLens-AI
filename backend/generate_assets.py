import os
import joblib
from sklearn.preprocessing import LabelEncoder
from transformers import AutoTokenizer

def main():
    # 1. Create and save LabelEncoder
    classes = ["Anxiety", "Bipolar", "Depression", "Normal", "Personality disorder", "Stress", "Suicidal"]
    le = LabelEncoder()
    le.fit(classes)
    
    os.makedirs("models", exist_ok=True)
    joblib.dump(le, "models/label_encoder.pkl")
    print("Saved label_encoder.pkl")
    
    # 2. Download and save Tokenizer
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    tokenizer.save_pretrained("models/tokenizer")
    print("Saved tokenizer to models/tokenizer")

if __name__ == "__main__":
    main()
