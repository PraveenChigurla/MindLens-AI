import re
import html
import unicodedata
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
