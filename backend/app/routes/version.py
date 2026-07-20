from fastapi import APIRouter
from typing import Dict, Any
from app.config import settings

router = APIRouter(tags=['System'])

@router.get('/version', summary='API Version', description='Returns detailed version information.')
def get_version() -> Dict[str, Any]:
    return {
        'model_version': settings.API_VERSION,
        'training_date': settings.TRAINING_DATE,
        'dataset_version': settings.DATASET_VERSION,
        'framework_versions': {
            'fastapi': settings.FASTAPI_VER,
            'torch': settings.TORCH_VER,
            'transformers': settings.TRANSFORMERS_VER
        },
        'git_commit': settings.GIT_COMMIT
    }
