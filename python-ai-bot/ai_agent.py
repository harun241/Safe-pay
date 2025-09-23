import re
from datetime import datetime

# Path to your dataset
dataset_path = "data/conversations.txt"

# Load dataset
conversations = {}
with open(dataset_path, "r", encoding="utf-8") as f:
    for line in f:
        if "|" in line:
            question, answer = line.strip().split("|", 1)
            question_norm = re.sub(r'[^\w\s]', '', question.lower())
            conversations[question_norm] = answer

# Function to normalize user input
def normalize_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = text.strip()
    return text


# Main function for FastAPI
def run_agent(user_input: str) -> str:
    normalized_input = normalize_text(user_input)

    # Check for date/time questions first
    if "date" in normalized_input:
        return f"Today's date is {datetime.now().strftime('%Y-%m-%d')}"
    if "time" in normalized_input:
        return f"Current time is {datetime.now().strftime('%H:%M:%S')}"

    # Exact match
    if normalized_input in conversations:
        return conversations[normalized_input]

    # Fuzzy / partial match
    for question, answer in conversations.items():
        question_words = set(question.split())
        input_words = set(normalized_input.split())
        if len(input_words & question_words) / max(1, len(input_words)) > 0.5:
            return answer

    return "I don't understand that. You can teach me new things by typing 'teach'."


# Optional: function to add new Q&A (for teach mode)
def add_conversation(question: str, answer: str):
    question_norm = normalize_text(question)
    conversations[question_norm] = answer
    with open(dataset_path, "a", encoding="utf-8") as f:
        f.write(f"\n{question}|{answer}")
