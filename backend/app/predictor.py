import torch
import logging
import time
from typing import Dict
from app.schemas import PredictionResponse
from app.preprocessing import preprocess_text
from app.model_loader import get_model, get_tokenizer, get_label_encoder, get_device

logger = logging.getLogger(__name__)

class Predictor:
    def __init__(self):
        self.model = get_model()
        self.tokenizer = get_tokenizer()
        self.label_encoder = get_label_encoder()
        self.device = get_device()
        self.max_length = 384

    def predict(self, text: str) -> PredictionResponse:
        total_start = time.time()
        
        # Preprocessing
        prep_start = time.time()
        clean_text = preprocess_text(text)
        prep_time = (time.time() - prep_start) * 1000
        
        # Tokenization
        tok_start = time.time()
        encoded = self.tokenizer(
            clean_text,
            truncation=True,
            padding=True,
            max_length=self.max_length,
            return_tensors="pt"
        )
        input_ids = encoded["input_ids"].to(self.device)
        attention_mask = encoded["attention_mask"].to(self.device)
        tok_time = (time.time() - tok_start) * 1000
        
        # Inference
        inf_start = time.time()
        with torch.no_grad():
            outputs = self.model(
                input_ids=input_ids,
                attention_mask=attention_mask
            )
            probabilities = torch.softmax(outputs.logits, dim=1).cpu().squeeze(0).numpy()
        inf_time = (time.time() - inf_start) * 1000
        
        # Log timing
        logger.info(f"Latency Breakdown - Preprocessing: {prep_time:.2f}ms | Tokenization: {tok_time:.2f}ms | Inference: {inf_time:.2f}ms")
            
        # Post-processing
        classes = self.label_encoder.classes_
        prob_distribution = {
            classes[i]: float(probabilities[i]) for i in range(len(classes))
        }
        
        predicted_idx = int(probabilities.argmax())
        predicted_label = classes[predicted_idx]
        confidence = float(probabilities[predicted_idx])
        
        total_time_ms = (time.time() - total_start) * 1000
        
        return PredictionResponse(
            prediction=predicted_label,
            confidence=confidence,
            probabilities=prob_distribution,
            processing_time_ms=total_time_ms
        )

predictor_instance = None

def get_predictor():
    global predictor_instance
    if predictor_instance is None:
        predictor_instance = Predictor()
    return predictor_instance
