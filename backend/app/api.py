from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.model_loader import get_model, get_tokenizer, get_label_encoder
from app.schemas import RootResponse

# Import Routes
from app.routes.health import router as health_router
from app.routes.labels import router as labels_router
from app.routes.metrics import router as metrics_router
from app.routes.version import router as version_router
from app.routes.predict import router as predict_router

# Import Middleware and Exceptions
from app.middleware import request_timing_and_logging_middleware, security_headers_middleware
from app.exceptions import custom_http_exception_handler, validation_exception_handler, global_exception_handler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up MentalHealthAI backend...")
    logger.info("Initializing models and tokenizer...")
    try:
        get_label_encoder()
        get_tokenizer()
        get_model()
        logger.info("Model loading completed successfully.")
    except Exception as e:
        logger.error(f"Failed to load model on startup: {e}")
        raise e
    yield
    # Shutdown
    logger.info("Shutting down MentalHealthAI backend...")

app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="REST API for Mental Health Text Classification using DistilBERT.",
    lifespan=lifespan
)

# Exception Handlers
app.add_exception_handler(StarletteHTTPException, custom_http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)

# Middlewares (Added in reverse order of execution in FastAPI, wait, add_middleware is reverse, but @app.middleware is added at the end)
app.middleware("http")(request_timing_and_logging_middleware)
app.middleware("http")(security_headers_middleware)
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

# Include Routers
app.include_router(health_router)
app.include_router(labels_router)
app.include_router(metrics_router)
app.include_router(version_router)
app.include_router(predict_router)

@app.get("/", response_model=RootResponse, tags=["System"], summary="Root Endpoint")
def read_root():
    return RootResponse(
        application=settings.API_TITLE,
        model=settings.MODEL_NAME,
        version=settings.API_VERSION,
        status="Running"
    )
