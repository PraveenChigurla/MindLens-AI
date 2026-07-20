from pydantic import BaseModel, Field, field_validator
from typing import Dict, Any, List

class PredictionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="The text to analyze")

    @field_validator('text')
    @classmethod
    def text_must_not_be_whitespace(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError('Text cannot be empty or just whitespace')
        return v

class PredictionResponse(BaseModel):
    prediction: str = Field(..., description="The predicted class")
    confidence: float = Field(..., description="Confidence score between 0 and 1")
    probabilities: Dict[str, float] = Field(..., description="Probability distribution across all classes")
    processing_time_ms: float = Field(..., description="Total processing time in milliseconds")

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    device: str
    uptime: str

class RootResponse(BaseModel):
    application: str
    model: str
    version: str
    status: str

class MetricsResponse(BaseModel):
    training_accuracy: float
    validation_accuracy: float
    test_accuracy: float
    macro_precision: float
    macro_recall: float
    macro_f1: float
    roc_auc: float
    epochs: int
    max_sequence_length: int
    model_name: str
