import torch
import os

print("Loading original model...")
state_dict = torch.load('backend/models/distilbert_model.pt', map_location='cpu')

if "model_state_dict" in state_dict:
    print("Extracting model_state_dict...")
    state_dict = state_dict["model_state_dict"]
elif hasattr(state_dict, 'state_dict'):
    print("Extracting state_dict() from full model object...")
    state_dict = state_dict.state_dict()

print("Saving compressed model...")
torch.save(state_dict, 'backend/models/distilbert_model_compressed.pt')
print(f"Original size: {os.path.getsize('backend/models/distilbert_model.pt') / (1024*1024):.2f} MB")
print(f"Compressed size: {os.path.getsize('backend/models/distilbert_model_compressed.pt') / (1024*1024):.2f} MB")
