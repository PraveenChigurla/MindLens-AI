import pytest
from fastapi.testclient import TestClient
from app.api import app
from app.preprocessing import preprocess_text
from app.model_loader import get_model, get_tokenizer, get_label_encoder

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["application"] == "Mental Health Text Classification API"

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "uptime" in data

def test_labels_endpoint():
    response = client.get("/labels")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 7

def test_metrics_endpoint():
    response = client.get("/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "training_accuracy" in data

def test_version_endpoint():
    response = client.get("/version")
    assert response.status_code == 200
    data = response.json()
    assert "model_version" in data

def test_model_loads_successfully():
    model = get_model()
    assert model is not None
    assert not next(model.parameters()).requires_grad
    
    tokenizer = get_tokenizer()
    assert tokenizer is not None
    
    label_encoder = get_label_encoder()
    assert label_encoder is not None
    assert len(label_encoder.classes_) == 7

def test_preprocessing():
    text = "Check out this link: http://example.com @user and email test@test.com ❤️"
    processed = preprocess_text(text)
    assert "http://example.com" not in processed
    assert "@user" not in processed
    assert "test@test.com" not in processed
    assert "red_heart" in processed.lower()
    
def test_prediction_endpoint():
    response = client.post("/predict", json={"text": "I feel really anxious and stressed out."})
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "confidence" in data
    assert "probabilities" in data
    assert "processing_time_ms" in data
    assert len(data["probabilities"]) == 7

def test_invalid_input_handling_empty_string():
    response = client.post("/predict", json={"text": ""})
    assert response.status_code == 422

def test_invalid_input_handling_whitespace():
    response = client.post("/predict", json={"text": "   "})
    assert response.status_code == 422

def test_very_long_text():
    long_text = "I am sad. " * 499
    response = client.post("/predict", json={"text": long_text})
    assert response.status_code == 200
    assert "prediction" in response.json()
    
def test_too_long_text():
    long_text = "I am sad. " * 600
    response = client.post("/predict", json={"text": long_text})
    assert response.status_code == 422

def test_unicode_text():
    response = client.post("/predict", json={"text": "æøå I feel like I'm losing control 😢"})
    assert response.status_code == 200
    assert "prediction" in response.json()
