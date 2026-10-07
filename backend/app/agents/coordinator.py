import random
from datetime import datetime
from typing import List, Dict
from app.models.disaster import Incident, Agent, DisasterType, SeverityLevel, AgentType, AgentStatus, DisasterSimulationRequest

class MultiAgentCoordinator:
    def __init__(self):
        self.incidents: Dict[str, Incident] = {}
        self.agents: Dict[str, Agent] = {}
        self.logs: List[Dict] = []
        self._init_default_data()

    def _init_default_data(self):
        # Initial default agents
        initial_agents = [
            Agent(
                id="AGT-001",
                name="Commander Alpha",
                type=AgentType.COMMANDER,
                status=AgentStatus.IDLE,
                battery_level=100,
                current_lat=37.7749,
                current_lng=-122.4194,
                task_description="Monitoring high-risk zones and orchestrating fleet dispatch"
            ),
            Agent(
                id="AGT-002",
                name="Aerial Recon Drone-1",
                type=AgentType.DRONE_SURVEILLANCE,
                status=AgentStatus.IDLE,
                battery_level=95,
                current_lat=37.7750,
                current_lng=-122.4180,
                task_description="Thermal imaging & damage assessment mapping"
            ),
            Agent(
                id="AGT-003",
                name="Search & Rescue Unit-A",
                type=AgentType.RESCUE,
                status=AgentStatus.IDLE,
                battery_level=88,
                current_lat=37.7730,
                current_lng=-122.4210,
                task_description="Rapid entry search & survivor extraction"
            ),
            Agent(
                id="AGT-004",
                name="Logistics Supply Truck-X",
                type=AgentType.LOGISTICS,
                status=AgentStatus.IDLE,
                battery_level=100,
                current_lat=37.7710,
                current_lng=-122.4150,
                task_description="Emergency food, water, and shelter deployment"
            ),
            Agent(
                id="AGT-005",
                name="Mobile Triage Unit-1",
                type=AgentType.MEDICAL,
                status=AgentStatus.IDLE,
                battery_level=92,
                current_lat=37.7760,
                current_lng=-122.4250,
                task_description="Field medical support & trauma stabilization"
            ),
        ]

        for agent in initial_agents:
            self.agents[agent.id] = agent

        # Initial active incident
        init_incident = Incident(
            id="INC-1001",
            title="Urban Flash Flood Warning",
            type=DisasterType.FLOOD,
            severity=SeverityLevel.HIGH,
            location_lat=37.7780,
            location_lng=-122.4120,
            location_name="Downtown Bay Sector",
            affected_population=1250,
            created_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            status="active"
        )
        self.incidents[init_incident.id] = init_incident
        self._add_log("SYSTEM", f"Coordinator initialized. Active incident detected: {init_incident.title}")

    def _add_log(self, source: str, message: str):
        self.logs.insert(0, {
            "timestamp": datetime.utcnow().strftime("%H:%M:%S"),
            "source": source,
            "message": message
        })
        if len(self.logs) > 100:
            self.logs = self.logs[:100]

    def get_incidents(self) -> List[Incident]:
        return list(self.incidents.values())

    def get_agents(self) -> List[Agent]:
        return list(self.agents.values())

    def get_logs(self) -> List[Dict]:
        return self.logs

    def trigger_disaster(self, req: DisasterSimulationRequest) -> Incident:
        inc_id = f"INC-{random.randint(2000, 9999)}"
        incident = Incident(
            id=inc_id,
            title=f"{req.severity.value.upper()} {req.type.value.upper()} at {req.location_name}",
            type=req.type,
            severity=req.severity,
            location_lat=req.location_lat,
            location_lng=req.location_lng,
            location_name=req.location_name,
            affected_population=req.affected_population,
            created_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            status="active"
        )
        self.incidents[inc_id] = incident
        self._add_log("COMMANDER", f"NEW INCIDENT DETECTED: {incident.title} (Est. {req.affected_population} affected)")

        # Auto-dispatch available agents
        self._dispatch_agents_for_incident(incident)
        return incident

    def _dispatch_agents_for_incident(self, incident: Incident):
        dispatched_count = 0
        for agent in self.agents.values():
            if agent.status == AgentStatus.IDLE:
                agent.status = AgentStatus.DISPATCHED
                agent.assigned_incident_id = incident.id
                agent.task_description = f"Responding to {incident.title} at {incident.location_name}"
                dispatched_count += 1
                self._add_log(agent.name, f"Dispatched to incident {incident.id} ({incident.location_name})")
        
        if dispatched_count == 0:
            self._add_log("COMMANDER WARNING", f"All units busy! Re-prioritizing tasks for incident {incident.id}")

    def step_simulation(self):
        """Simulate autonomous agent movements and status updates."""
        for agent in self.agents.values():
            if agent.status == AgentStatus.DISPATCHED and agent.assigned_incident_id in self.incidents:
                target_inc = self.incidents[agent.assigned_incident_id]
                # Move slightly towards incident
                lat_diff = target_inc.location_lat - agent.current_lat
                lng_diff = target_inc.location_lng - agent.current_lng
                
                if abs(lat_diff) < 0.001 and abs(lng_diff) < 0.001:
                    agent.status = AgentStatus.ON_SITE
                    agent.task_description = f"Operating on-site at {target_inc.location_name}"
                    self._add_log(agent.name, f"Arrived on-site at {target_inc.location_name}. Commencing operations.")
                else:
                    agent.current_lat += lat_diff * 0.3
                    agent.current_lng += lng_diff * 0.3
                    agent.battery_level = max(10, agent.battery_level - 1)
            elif agent.status == AgentStatus.ON_SITE:
                # Random operational log
                if random.random() < 0.3:
                    actions = [
                        "Established perimeter security and communications link.",
                        "Deployed search sensors into collapsed structure.",
                        "Stabilized 3 victims and requested emergency medical transport.",
                        "Surveillance feed confirming route clear for supply vehicles.",
                        "Distributing survival rations and water purification kits."
                    ]
                    self._add_log(agent.name, random.choice(actions))

coordinator = MultiAgentCoordinator()
