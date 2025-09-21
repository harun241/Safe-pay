from fastapi import FastAPI
from pydantic import BaseModel
from ai_agent import run_agent, add_conversation

app = FastAPI(title="AI Chat Bot API")

class ChatRequest(BaseModel):
    user_input: str

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Chat Bot API"}

@app.post("/chat")
def chat(request: ChatRequest):
    response = run_agent(request.user_input)
    return {"response": response}

@app.post("/teach")
def teach(request: ChatRequest):
    # Example: teach mode (for testing)
    question = request.user_input
    answer = f"Answer for '{question}'"  # Replace with real answer input if needed
    add_conversation(question, answer)
    return {"message": "New Q&A added!"}
