from fastapi import APIRouter, HTTPException
import logging
from app.schemas import PredictionRequest, PredictionResponse
from app.predictor import get_predictor

logger = logging.getLogger(__name__)
router = APIRouter(tags=['Inference'])

@router.post('/predict', response_model=PredictionResponse, summary='Predict Text', description='Classifies the input text into a mental health category.')
def predict(request: PredictionRequest):
    try:
        predictor = get_predictor()
        return predictor.predict(request.text)
    except Exception as e:
        logger.error(f'Prediction failed: {str(e)}')
        raise HTTPException(status_code=500, detail='Internal server error during prediction')
