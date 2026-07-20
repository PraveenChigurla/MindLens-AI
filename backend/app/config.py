import os

class Settings:
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models/distilbert_model.pt")
    TOKENIZER_PATH: str = os.getenv("TOKENIZER_PATH", "models/tokenizer")
    LABEL_ENCODER_PATH: str = os.getenv("LABEL_ENCODER_PATH", "models/label_encoder.pkl")
    API_TITLE: str = "Mental Health Text Classification API"
    API_VERSION: str = "1.0.0"
    
    # Metrics
    TRAIN_ACC: float = float(os.getenv("TRAIN_ACC", "0.9167"))
    VAL_ACC: float = float(os.getenv("VAL_ACC", "0.8423"))
    TEST_ACC: float = float(os.getenv("TEST_ACC", "0.8280"))
    MACRO_PRECISION: float = float(os.getenv("MACRO_PRECISION", "0.8518"))
    MACRO_RECALL: float = float(os.getenv("MACRO_RECALL", "0.8143"))
    MACRO_F1: float = float(os.getenv("MACRO_F1", "0.8287"))
    ROC_AUC: float = float(os.getenv("ROC_AUC", "0.9312"))
    EPOCHS: int = int(os.getenv("EPOCHS", "5"))
    MAX_SEQ_LENGTH: int = int(os.getenv("MAX_SEQ_LENGTH", "256"))
    MODEL_NAME: str = os.getenv("MODEL_NAME", "DistilBERT")
    
    TRAINING_DATE: str = os.getenv("TRAINING_DATE", "2023-10-25")
    DATASET_VERSION: str = os.getenv("DATASET_VERSION", "v1.0")
    FASTAPI_VER: str = os.getenv("FASTAPI_VER", "0.104.0")
    TORCH_VER: str = os.getenv("TORCH_VER", "2.1.0")
    TRANSFORMERS_VER: str = os.getenv("TRANSFORMERS_VER", "4.34.0")
    GIT_COMMIT: str = os.getenv("GIT_COMMIT", "abc123def456")

settings = Settings()
