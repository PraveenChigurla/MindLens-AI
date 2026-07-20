from fastapi import APIRouter
from typing import List
from app.model_loader import get_label_encoder

router = APIRouter(tags=['Information'])

@router.get('/labels', response_model=List[str], summary='Get Labels', description='Returns the list of classification labels.')
def get_labels():
    encoder = get_label_encoder()
    return encoder.classes_.tolist()
