import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from app.model_loader import get_model, get_tokenizer

def main():
    print("Loading model via old loader...")
    model = get_model()
    tokenizer = get_tokenizer()
    
    print("Saving using native Hugging Face format (safetensors)...")
    os.makedirs("backend/models/hf_model", exist_ok=True)
    model.save_pretrained("backend/models/hf_model")
    tokenizer.save_pretrained("backend/models/hf_model")
    print("Done! Model is now saved in backend/models/hf_model")

if __name__ == "__main__":
    main()
