# Digiproof-AI - MVP 🛡️

**Digiproof-AI** is an AI-powered Digital Asset Trust Platform that enables creators to instantly prove ownership, detect stolen content, verify suspicious copies, and generate legal proof certificates using Google Gemini AI!

## Project Structure
This MVP consists of two completely decoupled applications:
* **Frontend**: React, TypeScript, Vite, Tailwind CSS + Framer Motion.
* **Backend**: FastAPI (Python) Server with Uvicorn.

## How to Run It Locally

### 1. Backend Server
Navigate to the `backend/` directory, create a Python virtual environment, and install dependencies.
```bash
cd backend
python -m venv venv
# Activate the venv (Windows)
.\venv\Scripts\Activate.ps1
# Install requirements
pip install fastapi uvicorn google-generativeai pydantic fpdf pydantic-settings python-multipart
# Run server
uvicorn main:app --reload
```
API runs on `localhost:8000`.

### 2. Frontend Development Server
Navigate to the `frontend/` directory and install NPM packages.
```bash
cd frontend
npm install
npm run dev
```
App runs on `localhost:5173`.

## Features Built
- [x] **Premium User Interface**: Animated micro-interactions mimicking Silicon Valley SaaS dashboards.
- [x] **Asset Fingerprint Generation**: Upload files to generate mocked cryptographic SHA-256 hashes.
- [x] **Gemini Verification Flow**: Real AI integration using Google Generative AI SDK to evaluate assets and detect contextual plagiarism.
- [x] **DMCA Auto-Takedown Automation**: Generate dynamic `jsPDF` documents complete with stolen asset log data.
- [x] **Real-time Live Alerts**: Integrated notifications dropdown tracking stolen assets natively on dashboard load.
- [x] **Admin Analytics Pane**: Beautiful tables and statistics dashboards representing cloud database limits and hits.
- [x] **Role-Based Access Control (RBAC)**: Secure admin dashboard with dynamic UI rendering based on 4 specific organizational roles (Super Admin, Moderator, Analyst, and Support).
