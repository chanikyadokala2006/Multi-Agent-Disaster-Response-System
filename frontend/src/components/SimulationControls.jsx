import React, { useState } from 'react';
import { Play, Pause, AlertOctagon, Flame, Waves, Wind, Activity } from 'lucide-react';

export default function SimulationControls({ onTriggerDisaster, onStepSimulation, isAutoSim, setIsAutoSim }) {
  const [type, setType] = useState('earthquake');
  const [severity, setSeverity] = useState('high');
  const [locationName, setLocationName] = useState('Sector 7 Urban Corridor');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTriggerDisaster({
      type,
      severity,
      location_name: locationName,
      location_lat: 37.7749 + (Math.random() - 0.5) * 0.02,
      location_lng: -122.4194 + (Math.random() - 0.5) * 0.02,
      affected_population: Math.floor(Math.random() * 2500) + 500
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertOctagon size={20} color="var(--accent-red)" />
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Emergency Simulation Control</h2>
        </div>

        <button 
          onClick={() => setIsAutoSim(!isAutoSim)}
          className={isAutoSim ? "btn-primary" : "btn-secondary"}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          {isAutoSim ? <Pause size={14} /> : <Play size={14} />}
          {isAutoSim ? 'Pause Auto Simulation' : 'Start Auto Simulation'}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Disaster Category</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem'
            }}
          >
            <option value="earthquake" style={{ background: '#0f1522' }}>Earthquake</option>
            <option value="flood" style={{ background: '#0f1522' }}>Flash Flood</option>
            <option value="wildfire" style={{ background: '#0f1522' }}>Wildfire</option>
            <option value="cyclone" style={{ background: '#0f1522' }}>Cyclone / Severe Storm</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Severity Index</label>
          <select 
            value={severity} 
            onChange={(e) => setSeverity(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem'
            }}
          >
            <option value="low" style={{ background: '#0f1522' }}>Low</option>
            <option value="medium" style={{ background: '#0f1522' }}>Medium</option>
            <option value="high" style={{ background: '#0f1522' }}>High</option>
            <option value="critical" style={{ background: '#0f1522' }}>Critical Level 5</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Location Sector</label>
          <input 
            type="text" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}>
            <Activity size={16} /> Trigger Emergency
          </button>

          <button type="button" onClick={onStepSimulation} className="btn-secondary">
            Step Fleet
          </button>
        </div>
      </form>
    </div>
  );
}
