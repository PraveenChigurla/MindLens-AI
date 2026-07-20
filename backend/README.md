# MentalHealthAI Backend

This is the inference backend for the MentalHealthAI project, built with FastAPI and PyTorch.

## Architecture
- **Framework**: FastAPI
- **Model**: DistilBERT (`distilbert-base-uncased`) fine-tuned for sequence classification (7 classes).
- **Structure**:
  - `app/api.py`: FastAPI application, endpoints, and middleware for logging.
  - `app/predictor.py`: Core inference logic (preprocessing -> tokenization -> inference -> post-processing).
  - `app/preprocessing.py`: Exact reproduction of text preprocessing from the training notebook.
  - `app/model_loader.py`: Singleton manager ensuring models are loaded exactly once at startup.
  - `app/schemas.py`: Pydantic definitions for request/response validation.
  - `app/config.py`: Environment configurations.

## Inference Pipeline
1. **Preprocessing**: The raw text undergoes Unicode normalization, HTML unescaping, URL/email/mention removal, emoji demojization, and extra whitespace stripping. It is strictly preserved in its casing.
2. **Tokenization**: Uses HuggingFace `AutoTokenizer`, truncated and padded to a max length of 384 tokens.
3. **Model Prediction**: DistilBERT outputs raw logits. Softmax is applied to convert these into a probability distribution.
4. **Post-processing**: The probabilities are mapped to the 7 original string labels via a scikit-learn `LabelEncoder`.

## Replacing or Retraining the Model
1. If you retrain the model, save the PyTorch `state_dict` (e.g., `best_distilbert.pt`) to `backend/models/distilbert_model.pt`.
2. Ensure the `label_encoder.pkl` saved during training (if the classes change) is updated in `backend/models/label_encoder.pkl`.
3. Restart the backend to automatically load the new weights and mapping.

## Local Development
To run the backend locally:
```bash
pip install -r requirements.txt
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
```
Swagger UI documentation will be available at `http://localhost:8000/docs`.

## Testing
Run tests using:
```bash
python -m pytest tests/
```
