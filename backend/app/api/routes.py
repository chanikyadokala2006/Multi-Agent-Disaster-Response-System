from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.models.disaster import Incident, Agent, DisasterSimulationRequest
from app.agents.coordinator import coordinator

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "service": "disaster-response-backend", "database": "connected"}

@router.get("/incidents", response_model=List[Incident])
def get_incidents():
    return coordinator.get_incidents()

@router.get("/agents", response_model=List[Agent])
def get_agents():
    return coordinator.get_agents()

@router.get("/logs")
def get_logs():
    return coordinator.get_logs()

@router.post("/simulations/trigger", response_model=Incident)
def trigger_simulation(request: DisasterSimulationRequest):
    return coordinator.trigger_disaster(request)

@router.post("/simulations/step")
def step_simulation():
    coordinator.step_simulation()
    return {
        "status": "stepped",
        "agents": coordinator.get_agents(),
        "incidents": coordinator.get_incidents(),
        "logs": coordinator.get_logs()
    }
