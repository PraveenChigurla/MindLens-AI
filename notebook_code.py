import warnings
warnings.filterwarnings("ignore")

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

# import re
# import string

# from collections import Counter

df=pd.read_csv("/content/Combined Data.csv")
df.head()

df.shape

df.info()

df.drop(columns='Unnamed: 0',inplace=True)

df.isnull().sum()

df.dropna(inplace=True)

df.isnull().sum()

df.duplicated().sum()

df.drop_duplicates(inplace=True)

df.duplicated().sum()

df.reset_index(drop=True, inplace=True)
df.shape

df['status'].value_counts()

plt.figure(figsize=(10,5))

ax=sns.countplot(
    data=df,
    x='status',
    order=df['status'].value_counts().index,
    palette="bright"
)
for i in ax.containers:
  ax.bar_label(i)

plt.title("Mental Health Class Distribution")
plt.xticks(rotation=45)
plt.show()

counts = df['status'].value_counts()
labels = counts.index

plt.pie(counts, labels=labels, autopct='%1.2f%%')
plt.show()

df['sentence_length'] = df['statement'].apply(len)
df.head()

# df['sentence_length'].describe()

# plt.figure(figsize=(10,5))

# sns.histplot(df['char_length'], bins=50)

# plt.title("Character Length Distribution")

# plt.show()

# plt.figure(figsize=(25, 6))  # Slightly wider figure so the numbers don't overlap

# # Define the sequence from 5 up to 100 (inclusive of 100) with a step of 5
# custom_bins = list(range(5, 1000, 5))

# # Pass the sequence to the bins parameter
# sns.histplot(df["word_count"], bins=custom_bins, kde=True)

# # Zoom in on the 0 to 105 range so the last bin fits nicely
# plt.xlim(0, 105)

# # Set the x-axis tick marks exactly at your bin intervals
# plt.xticks(list(range(5, 350, 5)))

# plt.title("Distribution of Statement Length")
# plt.xlabel("Number of Words")
# plt.show()

df['word_count'] = df['statement'].apply(lambda x: len(str(x).split()))
df.head()

# df['word_count'].describe()

# plt.figure(figsize=(10,5))

# sns.histplot(df['word_count'], bins=50)

# plt.title("Word Count Distribution")

# plt.show()

# df['avg_word_length'] = (df['sentence_length'] / df['word_count'])
# df.head()

df['vocabulary_size'] = df['statement'].apply(lambda x: len(set(str(x).split())))
df.head()

from collections import Counter

all_words = " ".join(df['statement']).split()

word_freq = Counter(all_words)

word_freq.most_common(20)

# from wordcloud import WordCloud

# text = " ".join(df['statement'])

# wordcloud = WordCloud(
#     width=1200,
#     height=600,
#     background_color='white'
# ).generate(text)

# plt.figure(figsize=(15,8))

# plt.imshow(wordcloud)

# plt.axis("off")

# plt.show()

df['statement'].sample(5,random_state=10).values

# Install required libraries
!pip install emoji

# Standard Libraries
import re
import html
import unicodedata

# Third-party Libraries
import emoji


def normalize_unicode(text):
    """Normalize Unicode characters."""
    return unicodedata.normalize("NFKC", text)


def remove_urls(text):
    """Remove URLs."""
    return re.sub(r"http\S+|www\S+", "", text)


def remove_html(text):
    """Remove HTML tags and decode HTML entities."""
    text = html.unescape(text)
    return re.sub(r"<.*?>", "", text)


def remove_emails(text):
    """Remove email addresses."""
    return re.sub(r"\S+@\S+", "", text)


def remove_mentions(text):
    """Remove social media mentions."""
    return re.sub(r"@\w+", "", text)


def convert_emojis(text):
    """Convert emojis into text descriptions."""
    return emoji.demojize(text, delimiters=(" ", " "))


def remove_extra_spaces(text):
    """Normalize multiple spaces."""
    return re.sub(r"\s+", " ", text).strip()

def preprocess_text(text):
    """
    Minimal preprocessing for DistilBERT.
    Preserve natural language as much as possible.
    """

    text = str(text)

    text = normalize_unicode(text)
    text = remove_html(text)
    text = remove_urls(text)
    text = remove_emails(text)
    text = remove_mentions(text)
    text = convert_emojis(text)
    text = remove_extra_spaces(text)

    return text

df["bert_text"] = df["statement"].apply(preprocess_text)

comparison = pd.DataFrame({
    "Original": df["statement"],
    "BERT Text": df["bert_text"]
})

comparison.head(10)

df['bert_text'].sample(5,random_state=10).values

from sklearn.preprocessing import LabelEncoder

label_encoder = LabelEncoder()

df["label"] = label_encoder.fit_transform(df["status"])

num_classes = len(label_encoder.classes_)

print(label_encoder.classes_)
print(f"Number of classes: {num_classes}")

# print(y[49200:49300])

label_mapping = dict(zip(label_encoder.classes_,
                         label_encoder.transform(label_encoder.classes_)))

print(label_mapping)

from sklearn.model_selection import train_test_split

X = df["bert_text"]
y = df["label"]

# 80% Train, 20% Temporary
X_train, X_temp, y_train, y_temp = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Split the remaining 20% into Validation (10%) and Test (10%)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp,
    y_temp,
    test_size=0.50,
    random_state=42,
    stratify=y_temp
)

print(f"Training Samples   : {len(X_train)}")
print(f"Validation Samples : {len(X_val)}")
print(f"Testing Samples    : {len(X_test)}")

print("Train Distribution")
print(y_train.value_counts(normalize=True).sort_index())

print("\nValidation Distribution")
print(y_val.value_counts(normalize=True).sort_index())

print("\nTest Distribution")
print(y_test.value_counts(normalize=True).sort_index())

# Sentence
#       ↓
# DistilBERT Tokenizer
#       ↓
# Input IDs
#       ↓
# Pretrained DistilBERT Embeddings

!pip install -q transformers datasets accelerate tqdm

from transformers import AutoTokenizer

MODEL_NAME = "distilbert-base-uncased"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

print("Vocabulary Size :", tokenizer.vocab_size)
print("Model Max Length:", tokenizer.model_max_length)
print("Padding Token   :", tokenizer.pad_token)
print("CLS Token       :", tokenizer.cls_token)
print("SEP Token       :", tokenizer.sep_token)
print("UNK Token       :", tokenizer.unk_token)

sample_text = X_train.iloc[0]

print(sample_text)

encoded = tokenizer(sample_text)

encoded

print("Input IDs:")
print(encoded["input_ids"])

print("\nAttention Mask:")
print(encoded["attention_mask"])

tokens = tokenizer.convert_ids_to_tokens(encoded["input_ids"])

print(tokens)

for token, token_id in zip(tokens, encoded["input_ids"]):
    print(f"{token:<15} -> {token_id}")

sample = "I am feeling unbelievably depressed today."

encoded = tokenizer(sample)

tokens = tokenizer.convert_ids_to_tokens(encoded["input_ids"])

print(tokens)

token_lengths = X_train.apply(
    lambda x: len(tokenizer.encode(x, add_special_tokens=True))
)

print(token_lengths.describe())

print("90th percentile :", token_lengths.quantile(0.90))
print("95th percentile :", token_lengths.quantile(0.95))
print("99th percentile :", token_lengths.quantile(0.99))
print("Maximum :", token_lengths.max())

# import matplotlib.pyplot as plt

# plt.figure(figsize=(10, 5))
# plt.hist(token_lengths, bins=50)
# plt.xlabel("Token Length")
# plt.ylabel("Number of Samples")
# plt.title("Distribution of Token Lengths")
# plt.show()

MAX_LENGTH = 384 #512

train_encodings = tokenizer(
    X_train.tolist(),
    truncation=True,
    padding=True,
    max_length=MAX_LENGTH
)

val_encodings = tokenizer(
    X_val.tolist(),
    truncation=True,
    padding=True,
    max_length=MAX_LENGTH
)

test_encodings = tokenizer(
    X_test.tolist(),
    truncation=True,
    padding=True,
    max_length=MAX_LENGTH
)

import torch
from torch.utils.data import Dataset

class MentalHealthDataset(Dataset):

    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels.tolist()

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):

        item = {
            key: torch.tensor(val[idx])
            for key, val in self.encodings.items()
        }

        item["labels"] = torch.tensor(self.labels[idx])

        return item

train_dataset = MentalHealthDataset(
    train_encodings,
    y_train
)

val_dataset = MentalHealthDataset(
    val_encodings,
    y_val
)

test_dataset = MentalHealthDataset(
    test_encodings,
    y_test
)

sample = train_dataset[0]

print(sample.keys())

print(sample["input_ids"].shape)
print(sample["attention_mask"].shape)
print(sample["labels"])

print(sample["input_ids"].dtype)
print(sample["attention_mask"].dtype)
print(sample["labels"].dtype)

from torch.utils.data import DataLoader

BATCH_SIZE = 16

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

batch = next(iter(train_loader))

print(batch["input_ids"].shape)
print(batch["attention_mask"].shape)
print(batch["labels"].shape)

# Embedding Layer
#         ↓
# BiLSTM
#         ↓
# Attention
#         ↓
# Dense
#         ↓
# Softmax

# DistilBERT Encoder
#         ↓
# Transformer Layer 1
#         ↓
# Transformer Layer 2
#         ↓
# Transformer Layer 3
#         ↓
# Transformer Layer 4
#         ↓
# Transformer Layer 5
#         ↓
# Transformer Layer 6

# Input IDs
#       ↓
# Embedding Layer
#       ↓
# Transformer Block × 6
#       ↓
# CLS Representation
#       ↓
# Dropout
#       ↓
# Linear Classifier
#       ↓
# 7 Class Probabilities

from transformers import DistilBertForSequenceClassification

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased",
    num_labels=num_classes
)
model.to(device)

print(model)

total_params = sum(p.numel() for p in model.parameters())
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)

print(f"Total Parameters: {total_params:,}")
print(f"Trainable Parameters: {trainable_params:,}")

batch = next(iter(train_loader))

input_ids = batch["input_ids"].to(device)
attention_mask = batch["attention_mask"].to(device)
labels = batch["labels"].to(device)

outputs = model(
    input_ids=input_ids,
    attention_mask=attention_mask,
    labels=labels
)

import torch

print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else "No GPU")

print(type(outputs))
print(outputs.keys())

print("Loss:", outputs.loss)

print("Logits Shape:", outputs.logits.shape)

print(outputs.logits)

import torch

probabilities = torch.softmax(outputs.logits, dim=1)

print(probabilities.shape)
print(probabilities[0])
print(probabilities[0].sum())

predictions = torch.argmax(outputs.logits, dim=1)

print(predictions)

# Forward Pass
#       ↓
# Compute Loss
#       ↓
# Backpropagation
#       ↓
# Optimizer updates weights

from torch.optim import AdamW
from transformers import get_linear_schedule_with_warmup
from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

optimizer = AdamW(
    model.parameters(),
    lr=2e-5,
    weight_decay=0.01
)

EPOCHS = 3 #5 #3
total_training_steps = len(train_loader) * EPOCHS

print("Training Steps:", total_training_steps)

scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=0,
    num_training_steps=total_training_steps
)

# For every epoch
#     For every batch
#         1. Move data to device
#         2. Forward Pass
#         3. Compute Loss
#         4. Backpropagation
#         5. Optimizer Step
#         6. Scheduler Step
#         7. Record Metrics

# ============================
# Training History
# ============================

train_losses = []
train_accuracies = []

val_losses = []
val_accuracies = []

val_precisions = []
val_recalls = []
val_f1_scores = []

def train_one_epoch(
        model,
        dataloader,
        optimizer,
        scheduler,
        device
):
    model.train()

    running_loss = 0
    correct = 0
    total = 0

    progress_bar = tqdm(
        dataloader,
        desc="Training"
    )

    for batch in progress_bar:
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        labels = batch["labels"].to(device)

        optimizer.zero_grad()

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )

        loss = outputs.loss

        predictions = torch.argmax(
            outputs.logits,
            dim=1
        )

        correct += (predictions == labels).sum().item()
        total += labels.size(0)

        loss.backward()

        optimizer.step()
        scheduler.step()

        running_loss += loss.item()

        progress_bar.set_postfix(
            loss=f"{loss.item():.4f}",
            acc=f"{100 * correct / total:.2f}%"
        )

    epoch_loss = running_loss / len(dataloader)
    epoch_accuracy = 100 * correct / total

    # Removed history appends from here, handled in main loop

    return epoch_loss, epoch_accuracy

def validate_one_epoch(
        model,
        dataloader,
        device
):
    model.eval()

    running_loss = 0
    correct = 0
    total = 0

    all_predictions = []
    all_labels = []

    with torch.no_grad():
        for batch in dataloader:
            input_ids = batch["input_ids"].to(device)
            attention_mask = batch["attention_mask"].to(device)
            labels = batch["labels"].to(device)

            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )

            loss = outputs.loss

            predictions = torch.argmax(
                outputs.logits,
                dim=1
            )

            correct += (predictions == labels).sum().item()
            total += labels.size(0)

            running_loss += loss.item()

            all_predictions.extend(
                predictions.cpu().numpy()
            )

            all_labels.extend(
                labels.cpu().numpy()
            )

    # Step 10 — Compute Epoch Metrics
    epoch_loss = running_loss / len(dataloader)
    epoch_accuracy = 100 * correct / total

    # Step 11 — Compute Precision, Recall and F1
    precision, recall, f1, _ = precision_recall_fscore_support(
        all_labels,
        all_predictions,
        average="macro",
        zero_division=0
    )

    # Removed: Step 12 — Save Validation History

    # Step 13 — Return the Results
    return (
        epoch_loss,
        epoch_accuracy,
        precision,
        recall,
        f1
    )

# ============================
# Best Model Tracking
# ============================

best_val_accuracy = 0

best_epoch = 0

patience = 3 # Increased patience as suggested
patience_counter = 0

import time

start_time = time.time() # Added time tracking

for epoch in range(EPOCHS):

    print("=" * 70)

    print(f"Epoch {epoch+1}/{EPOCHS}")

    print("=" * 70)

    # Step 3 — Train
    train_loss, train_accuracy = train_one_epoch(
        model,
        train_loader,
        optimizer,
        scheduler,
        device
    )

    # Step 4 — Validate
    (
        val_loss,
        val_accuracy,
        val_precision,
        val_recall,
        val_f1
    ) = validate_one_epoch(
        model,
        val_loader,
        device
    )

    # Append to history lists in the main loop
    train_losses.append(train_loss)
    train_accuracies.append(train_accuracy)

    val_losses.append(val_loss)
    val_accuracies.append(val_accuracy)
    val_precisions.append(val_precision)
    val_recalls.append(val_recall)
    val_f1_scores.append(val_f1)

    # Step 5 — Print Metrics
    print(f"\nTraining Loss      : {train_loss:.4f}")
    print(f"Training Accuracy  : {train_accuracy:.2f}%")

    print(f"\nValidation Loss    : {val_loss:.4f}")
    print(f"Validation Accuracy: {val_accuracy:.2f}%")
    print(f"Validation Precision: {val_precision:.4f}")
    print(f"Validation Recall   : {val_recall:.4f}")
    print(f"Validation F1-Score : {val_f1:.4f}")

    # Step 6 — Save the Best Model
    if val_accuracy > best_val_accuracy:

        best_val_accuracy = val_accuracy

        best_epoch = epoch + 1

        patience_counter = 0

        torch.save(
            {
                "epoch": epoch,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "best_val_accuracy": best_val_accuracy,
            },
            "best_distilbert.pt"
        )

        print("✅ Best model saved!")

    else:

        patience_counter += 1

    # Step 7 — Early Stopping
    if patience_counter >= patience:

        print("\nEarly stopping triggered!")

        break

end_time = time.time() # Added time tracking

print(f"\nTotal Training Time : {(end_time - start_time)/60:.2f} minutes") # Print total training time

# Step 8 — Final Summary
print("=" * 70)

print(f"Best Validation Accuracy : {best_val_accuracy:.2f}%")

print(f"Best Epoch               : {best_epoch}") # Adjusted spacing
print(f"Model Saved As           : best_distilbert.pt") # Added model save name

print("=" * 70)

model.load_state_dict(torch.load("best_distilbert.pt")["model_state_dict"])

model.eval()

test_predictions = []
test_labels = []

with torch.no_grad():
    for batch in test_loader:
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        labels = batch["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )

        predictions = torch.argmax(
            outputs.logits,
            dim=1
        )

        test_predictions.extend(
            predictions.cpu().numpy()
        )

        test_labels.extend(
            labels.cpu().numpy()
        )

test_accuracy = accuracy_score(test_labels, test_predictions)
test_precision, test_recall, test_f1, _ = precision_recall_fscore_support(test_labels, test_predictions, average='macro', zero_division=0)

print(f"Test Accuracy   : {test_accuracy:.4f}")
print(f"Test Precision  : {test_precision:.4f}")
print(f"Test Recall     : {test_recall:.4f}")
print(f"Test F1-Score   : {test_f1:.4f}")

print(classification_report(test_labels, test_predictions, target_names=label_encoder.classes_))

cm = confusion_matrix(test_labels, test_predictions)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
plt.title('Confusion Matrix')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.show()

from sklearn.preprocessing import LabelBinarizer

# Binarize the labels for ROC AUC calculation
label_binarizer = LabelBinarizer()
y_test_binarized = label_binarizer.fit_transform(test_labels)

# Get predicted probabilities for ROC AUC
model.eval()
all_probs = []
with torch.no_grad():
    for batch in test_loader:
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        probabilities = torch.softmax(outputs.logits, dim=1)
        all_probs.extend(probabilities.cpu().numpy())

roc_auc = roc_auc_score(y_test_binarized, all_probs, average='macro')
print(f"Macro-averaged ROC AUC: {roc_auc:.4f}")

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(train_losses, label='Training Loss')
plt.plot(val_losses, label='Validation Loss')
plt.title('Loss over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(train_accuracies, label='Training Accuracy')
plt.plot(val_accuracies, label='Validation Accuracy')
plt.title('Accuracy over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

plt.tight_layout()
plt.show()

unseen_df = pd.read_excel('/content/updated_70_samples.xlsx')     #df.sample(100)#pd.read_csv('/content/synthetic_unseen_dataset_300_balanced.csv')
unseen_df.head()

all_probs = []

model.eval()

with torch.no_grad():
    for batch in unseen_loader:

        outputs = model(
            input_ids=batch["input_ids"].to(device),
            attention_mask=batch["attention_mask"].to(device)
        )

        probs = torch.softmax(outputs.logits, dim=1)

        all_probs.append(probs.cpu())

all_probs = torch.cat(all_probs)

print(all_probs.mean(dim=0))

# unseen_df.drop(columns='Unnamed: 0')

unseen_df["bert_text"] = unseen_df["rewritten"].apply(preprocess_text)
# Correct the specific casing issue for 'Personality Disorder'
unseen_df['true_label'] = unseen_df['status'].replace('Personality Disorder', 'Personality disorder')

# Drop rows with NaN values in 'true_label' before encoding
unseen_df.dropna(subset=['true_label'], inplace=True)

unseen_df["label"] = label_encoder.transform(unseen_df["true_label"])

unseen_encodings = tokenizer(
    unseen_df["bert_text"].tolist(),
    truncation=True,
    padding=True,
    max_length=MAX_LENGTH
)

unseen_dataset = MentalHealthDataset(
    unseen_encodings,
    unseen_df["label"]
)

unseen_loader = DataLoader(
    unseen_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

model.eval()

unseen_predictions = []
unseen_labels = []

with torch.no_grad():
    for batch in unseen_loader:
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        labels = batch["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )

        predictions = torch.argmax(
            outputs.logits,
            dim=1
        )

        unseen_predictions.extend(
            predictions.cpu().numpy()
        )

        unseen_labels.extend(
            labels.cpu().numpy()
        )

unseen_accuracy = accuracy_score(unseen_labels, unseen_predictions)
unseen_precision, unseen_recall, unseen_f1, _ = precision_recall_fscore_support(unseen_labels, unseen_predictions, average='macro', zero_division=0)

print(f"Unseen Accuracy   : {unseen_accuracy:.4f}")
print(f"Unseen Precision  : {unseen_precision:.4f}")
print(f"Unseen Recall     : {unseen_recall:.4f}")
print(f"Unseen F1-Score   : {unseen_f1:.4f}")

print(classification_report(unseen_labels, unseen_predictions, target_names=label_encoder.classes_))

cm_unseen = confusion_matrix(unseen_labels, unseen_predictions)
plt.figure(figsize=(10, 8))
sns.heatmap(cm_unseen, annot=True, fmt='d', cmap='Blues', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
plt.title('Confusion Matrix (Unseen Data)')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.show()

errors = unseen_df.copy()

errors["true"] = unseen_labels
errors["pred"] = unseen_predictions

errors = errors[errors["true"] != errors["pred"]]

errors[["rewritten", "true_label", "pred"]].head(20)

model.eval()
all_probs_unseen = []

with torch.no_grad():
    for batch in unseen_loader:
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        probabilities = torch.softmax(outputs.logits, dim=1)
        all_probs_unseen.extend(probabilities.cpu().numpy())

# Convert list of arrays to a single NumPy array
all_probs_unseen = np.array(all_probs_unseen)

confidences, pred_labels_tensor = torch.max(torch.tensor(all_probs_unseen), dim=1)

results = unseen_df.copy()
results["true_label_encoded"] = unseen_labels
results["predicted_label_encoded"] = pred_labels_tensor.numpy()
results["true_label"] = label_encoder.inverse_transform(unseen_labels)
results["predicted_label"] = label_encoder.inverse_transform(pred_labels_tensor.numpy())
results["confidence"] = confidences.numpy()

display(results.head())