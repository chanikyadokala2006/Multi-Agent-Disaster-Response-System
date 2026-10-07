import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IncidentMap from './components/IncidentMap';
import AgentStatusGrid from './components/AgentStatusGrid';
import LogFeed from './components/LogFeed';
import SimulationControls from './components/SimulationControls';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [agents, setAgents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isAutoSim, setIsAutoSim] = useState(true);

  // Fetch initial data & state
  const fetchData = async () => {
    try {
      const [resInc, resAgt, resLogs] = await Promise.all([
        fetch(`${API_BASE}/api/incidents`),
        fetch(`${API_BASE}/api/agents`),
        fetch(`${API_BASE}/api/logs`)
      ]);

      if (resInc.ok && resAgt.ok && resLogs.ok) {
        const dataInc = await resInc.json();
        const dataAgt = await resAgt.json();
        const dataLogs = await resLogs.json();

        setIncidents(dataInc);
        setAgents(dataAgt);
        setLogs(dataLogs);
        setConnected(true);
      }
    } catch (err) {
      setConnected(false);
    }
  };

  const stepSimulation = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/simulations/step`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setAgents(data.agents);
        setIncidents(data.incidents);
        setLogs(data.logs);
        setConnected(true);
      }
    } catch (err) {
      console.error("Step error:", err);
    }
  };

  const triggerDisaster = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/simulations/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Trigger error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, 3000);
    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (!isAutoSim) return;
    const simInterval = setInterval(() => {
      stepSimulation();
    }, 4000);
    return () => clearInterval(simInterval);
  }, [isAutoSim]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        connected={connected} 
        agentCount={agents.length} 
        activeIncidents={incidents.length} 
      />

      <main style={{ flex: 1, padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SimulationControls 
          onTriggerDisaster={triggerDisaster}
          onStepSimulation={stepSimulation}
          isAutoSim={isAutoSim}
          setIsAutoSim={setIsAutoSim}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <IncidentMap 
              incidents={incidents}
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
            />
            <LogFeed logs={logs} />
          </div>

          <div>
            <AgentStatusGrid 
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
