import time
import logging
from fastapi import Request

logger = logging.getLogger(__name__)

async def request_timing_and_logging_middleware(request: Request, call_next):
    start_time = time.time()
    
    try:
        response = await call_next(request)
    except Exception as e:
        logger.error(f"Middleware caught exception: {e}")
        raise e
    finally:
        process_time_ms = (time.time() - start_time) * 1000
        status_code = response.status_code if 'response' in locals() else 500
        logger.info(
            f"Method: {request.method} Path: {request.url.path} "
            f"Status: {status_code} "
            f"Latency: {process_time_ms:.2f}ms"
        )
        if 'response' in locals():
            response.headers["X-Process-Time"] = str(process_time_ms)
            
    return response

async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
