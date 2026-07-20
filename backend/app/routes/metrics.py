from fastapi import APIRouter
from app.schemas import MetricsResponse
from app.config import settings

router = APIRouter(tags=['Information'])

@router.get('/metrics', response_model=MetricsResponse, summary='Model Metrics', description='Returns the evaluation metrics from model training.')
def get_metrics():
    return MetricsResponse(
        training_accuracy=settings.TRAIN_ACC,
        validation_accuracy=settings.VAL_ACC,
        test_accuracy=settings.TEST_ACC,
        macro_precision=settings.MACRO_PRECISION,
        macro_recall=settings.MACRO_RECALL,
        macro_f1=settings.MACRO_F1,
        roc_auc=settings.ROC_AUC,
        epochs=settings.EPOCHS,
        max_sequence_length=settings.MAX_SEQ_LENGTH,
        model_name=settings.MODEL_NAME
    )
