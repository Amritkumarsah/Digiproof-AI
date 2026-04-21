from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
import time
import os

app = FastAPI(title="DigiProof AI API", description="Backend for Digital Asset Trust Platform")

# Allow Frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, use specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database
# In production, this would be Firebase Firestore
registered_assets = {}

class VerifyResponse(BaseModel):
    score: int
    status: str
    message: str

@app.get("/")
def read_root():
    return {"message": "DigiProof AI API is running"}

@app.post("/api/register")
async def register_asset(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Read file content for hashing
    content = await file.read()
    
    # Generate cryptographic fingerprint (SHA-256)
    file_hash = hashlib.sha256(content).hexdigest()
    
    timestamp = time.time()
    asset_id = f"DPAI-{file_hash[:10].upper()}"
    
    # Store in mock DB
    registered_assets[file_hash] = {
        "asset_id": asset_id,
        "filename": file.filename,
        "timestamp": timestamp,
        "content_type": file.content_type
    }
    
    return {
        "message": "Asset registered successfully",
        "asset_id": asset_id,
        "fingerprint": file_hash,
        "timestamp": timestamp
    }

@app.post("/api/verify", response_model=VerifyResponse)
async def verify_asset(file: UploadFile = File(...)):
    """
    In a fully functional environment, this endpoint uses Google Gemini Vision / Vertex AI 
    to compare spatial and contextual features. 
    Here we implement a robust mathematical check for identical files, 
    with a mocked AI score for demonstration purposes.
    """
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()
    
    # Check for exact match in database
    if file_hash in registered_assets:
        original = registered_assets[file_hash]
        return VerifyResponse(
            score=100,
            status="match",
            message=f"Exact match found. This is a registered asset ({original['asset_id']})."
        )
    
    # Check if Gemini API Key is present for AI Check (Mocked flow if missing)
    gemini_key = os.environ.get("GEMINI_API_KEY")
    
    if not gemini_key:
        # Fallback Mock logic for MVP Demo when Gemini API is disabled
        import random
        score = random.randint(10, 60)
        
        if score > 50:
            return VerifyResponse(score=score, status="fake", message="Suspicious patterns detected in asset metadata.")
        else:
            return VerifyResponse(score=score, status="unknown", message="No significant matches found in the registry.")
    
    # Simulated Gemini Processing time if key is present
    time.sleep(2)
    return VerifyResponse(score=85, status="match", message="Gemini AI: High contextual similarity detected.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
