from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime

class DisasterType(str, Enum):
    EARTHQUAKE = "earthquake"
    FLOOD = "flood"
    WILDFIRE = "wildfire"
    CYCLONE = "cyclone"

class SeverityLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class AgentType(str, Enum):
    COMMANDER = "commander"
    RESCUE = "rescue"
    LOGISTICS = "logistics"
    MEDICAL = "medical"
    DRONE_SURVEILLANCE = "drone_surveillance"

class AgentStatus(str, Enum):
    IDLE = "idle"
    DISPATCHED = "dispatched"
    ON_SITE = "on_site"
    RETURNING = "returning"
    CHARGING = "charging"

class Incident(BaseModel):
    id: str
    title: str
    type: DisasterType
    severity: SeverityLevel
    location_lat: float
    location_lng: float
    location_name: str
    affected_population: int
    created_at: str
    status: str = "active"

class Agent(BaseModel):
    id: str
    name: str
    type: AgentType
    status: AgentStatus
    battery_level: int
    current_lat: float
    current_lng: float
    assigned_incident_id: Optional[str] = None
    task_description: str

class DisasterSimulationRequest(BaseModel):
    type: DisasterType
    severity: SeverityLevel
    location_name: str
    location_lat: float
    location_lng: float
    affected_population: int
