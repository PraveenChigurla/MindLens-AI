import torch
import joblib
import logging
from transformers import AutoTokenizer, DistilBertForSequenceClassification
from app.config import settings

logger = logging.getLogger(__name__)

class ModelLoader:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
            
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"Using device: {self.device}")
        
        self.model = None
        self.tokenizer = None
        self.label_encoder = None
        self.num_classes = 7

        self._initialized = True

    def load_label_encoder(self):
        if self.label_encoder is None:
            logger.info("Loading label encoder...")
            try:
                self.label_encoder = joblib.load(settings.LABEL_ENCODER_PATH)
                self.num_classes = len(self.label_encoder.classes_)
                logger.info(f"Label encoder loaded. {self.num_classes} classes found.")
            except Exception as e:
                logger.error(f"Error loading label encoder: {e}")
                raise e
        return self.label_encoder

    def load_model(self):
        if self.model is None:
            logger.info("Loading DistilBERT model...")
            try:
                from transformers import DistilBertConfig
                
                if self.label_encoder is None:
                    self.load_label_encoder()
                
                config = DistilBertConfig.from_pretrained(
                    "distilbert-base-uncased",
                    num_labels=self.num_classes
                )
                self.model = DistilBertForSequenceClassification(config)
                state_dict = torch.load(settings.MODEL_PATH, map_location=self.device)
                
                if "model_state_dict" in state_dict:
                    self.model.load_state_dict(state_dict["model_state_dict"])
                else:
                    self.model.load_state_dict(state_dict)
                    
                self.model.to(self.device)
                self.model.eval()
                
                for param in self.model.parameters():
                    param.requires_grad = False
                    
                logger.info("Model loaded and set to evaluation mode.")
            except Exception as e:
                logger.error(f"Error loading model: {e}")
                raise e
        return self.model

    def load_tokenizer(self):
        if self.tokenizer is None:
            logger.info("Loading tokenizer...")
            try:
                self.tokenizer = AutoTokenizer.from_pretrained(settings.TOKENIZER_PATH)
                logger.info("Tokenizer loaded successfully.")
            except Exception as e:
                logger.error(f"Error loading tokenizer: {e}")
                raise e
        return self.tokenizer

model_loader_instance = ModelLoader()

def get_model():
    return model_loader_instance.load_model()

def get_tokenizer():
    return model_loader_instance.load_tokenizer()

def get_label_encoder():
    return model_loader_instance.load_label_encoder()

def get_device():
    return model_loader_instance.device
