from fastapi import APIRouter
from app.schemas import HealthResponse
from app.model_loader import get_model, get_device
import time

router = APIRouter(tags=['System'])
startup_time = time.time()

@router.get('/health', response_model=HealthResponse, summary='Health Check', description='Returns API health status and model loading state.')
def health_check():
    uptime_seconds = time.time() - startup_time
    uptime_str = f'{uptime_seconds:.2f} seconds'
    try:
        model = get_model()
        model_loaded = model is not None
    except Exception:
        model_loaded = False
    device = str(get_device())
    return HealthResponse(status='healthy', model_loaded=model_loaded, device=device, uptime=uptime_str)
