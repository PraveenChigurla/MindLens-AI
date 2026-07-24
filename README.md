# MindLens AI

MindLens AI is a comprehensive Natural Language Processing (NLP) pipeline and full-stack application designed to classify mental health-related text into 7 distinct psychological states using a fine-tuned DistilBERT model. 

The project features a highly optimized PyTorch/FastAPI backend and a sleek, interactive Next.js Dashboard for live predictions and model analysis.

## Live Application

- **Frontend Dashboard:** [https://mindlens-frontend.onrender.com](https://mindlens-frontend.onrender.com)
- **Backend API:** [https://mindlens-backend-3a8f.onrender.com](https://mindlens-backend-3a8f.onrender.com)

## 👥 Developers
**Praveen Chigurla**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat&logo=github)](https://github.com/PraveenChigurla)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/praveen-chigurla/)

**Khushi Kore**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat&logo=github)](https://github.com/khushikore)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/khushi-kore/)

---

## 📊 Dataset & Exploratory Data Analysis (EDA)

The model is trained on a curated mental health dataset consisting of **51,093** text samples.

**Classes Detected (7):**
- **Normal**: 30.83%
- **Depression**: 29.04%
- **Suicidal**: 20.08%
- **Anxiety**: 7.33%
- **Bipolar**: 5.42%
- **Stress**: 5.03%
- **Personality disorder**: 2.26%

### EDA Highlights:
- **Class Distribution:** The dataset contains a diverse spread across all 7 classes, ensuring the model does not become overly biased towards one specific mental state.
- **Text Preprocessing:** Stop-words removal, lowercasing, and special character stripping were applied during the EDA phase.
- **Tokenization:** Text is tokenized using the Hugging Face `AutoTokenizer` mapped to `distilbert-base-uncased`, padding and truncating sequences to a maximum length of 256 tokens.

*(Full EDA can be found in the Jupyter Notebook included in the repository).*

---

## 🧠 Model Architecture & Training

We opted for **DistilBERT** (`distilbert-base-uncased`) because it retains 97% of BERT's language understanding capabilities while being 60% faster and 40% smaller—making it ideal for real-time web inference.

**Training Configuration:**
- **Epochs:** 5
- **Optimizer:** AdamW
- **Max Sequence Length:** 256
- **Hardware:** Trained on GPU, inferred on CPU using memory-mapped `.safetensors`.

### Model Performance Metrics:
- **Test Accuracy:** 82.80%
- **Macro Precision:** 85.18%
- **Macro Recall:** 81.43%
- **Macro F1-Score:** 82.87%
- **ROC AUC:** 93.12%

---

## ⚙️ Technology Stack

### Backend (API)
- **Framework:** FastAPI (Python 3.10)
- **ML Framework:** PyTorch & Hugging Face Transformers
- **Server:** Uvicorn
- **Deployment Strategy:** Hugging Face `.safetensors` memory mapping to avoid RAM exhaustion on Render's free tier (512MB limit).

### Frontend (Dashboard)
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS & Glassmorphism UI
- **Icons:** Lucide React
- **Features:** Real-time health checks, latency monitoring, single & batch predictions, mobile-responsive sliding drawer navigation.

---

## 🚀 Step-by-Step Execution Guide (Local Setup)

Follow these steps to run the entire stack locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/PraveenChigurla/MindLens-AI.git
cd MindLens-AI
```

### 2. Set up the Backend
```bash
cd backend
python -m venv .venv
# Activate the virtual environment:
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate

pip install -r requirements.txt
```

*Note: Ensure your model `.safetensors` and `label_encoder.pkl` files are present in `backend/models/hf_model` and `backend/models/` respectively. (They are tracked via Git LFS).*

**Run the Backend Server:**
```bash
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
```
The backend will be available at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

### 3. Set up the Frontend
Open a **new terminal window** and navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Run the Frontend Development Server:**
```bash
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

---

## 📈 Deployment Notes

The application is deployed on **Render** using the Free Tier.
- **Backend:** Deployed as a Web Service. We specifically converted the PyTorch `.pt` model into Hugging Face's `.safetensors` format. This allows the backend to utilize *memory-mapping*, preventing Out-Of-Memory (OOM) crashes on servers with limited RAM.
- **Frontend:** Deployed as a Next.js Node Web Service, communicating with the backend via a dynamic `API_BASE_URL` environment variable.