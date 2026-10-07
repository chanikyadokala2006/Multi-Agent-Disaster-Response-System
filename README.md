# Multi-Agent Disaster Response System 🛡️⚡

A full-stack, real-time autonomous multi-agent disaster response platform built for emergency simulation, resource distribution, and tactical coordination.

---

## 📥 1. Cloning & Repository Setup

### Clone the Repository
```bash
git clone https://github.com/YOUR_ORGANIZATION/YOUR_REPO_NAME.git
cd "Multi Agent Disaster Response System"
```

### Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

---

## 🐳 2. Running with Docker (Recommended for Group Setup)

Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.

### Start All Services (Database + Backend + Frontend)
```bash
docker compose up --build
```

### Run in Background (Detached Mode)
```bash
docker compose up -d --build
```

### Stop All Services
```bash
docker compose down
```

### View Live Container Logs
```bash
docker compose logs -f
```

---

## 💻 3. Running Services Locally (Individual Development)

### 🐍 Backend (Python FastAPI)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Create & activate virtual environment**:
   - **Linux/macOS**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows (PowerShell)**:
     ```bash
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run FastAPI Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   - API Server: `http://localhost:8000`
   - Interactive Docs: `http://localhost:8000/docs`

---

### ⚛️ Frontend (React / Vite)

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   - Dashboard: `http://localhost:3000`

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📦 4. Tech Stack Overview

- **Backend**: FastAPI, Uvicorn, LangGraph / LangChain, Celery, Redis, SQLAlchemy, GeoPy, Shapely
- **Frontend**: React, Vite, TailwindCSS / Shadcn UI
- **Database**: PostgreSQL (with PostGIS support)
- **Containerization**: Docker & Docker Compose
