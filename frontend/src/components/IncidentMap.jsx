import React, { useState } from 'react';
import { MapPin, Navigation, Compass, AlertTriangle, ShieldAlert, Crosshair } from 'lucide-react';

export default function IncidentMap({ incidents, agents, selectedAgent, onSelectAgent }) {
  const [zoom, setZoom] = useState(1);

  // Convert GPS coordinate bounding box to tactical grid offsets
  const baseLat = 37.7749;
  const baseLng = -122.4194;

  const getPos = (lat, lng) => {
    const x = 50 + (lng - baseLng) * 4000;
    const y = 50 - (lat - baseLat) * 4000;
    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    };
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '440px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={20} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Tactical Operations Grid Map</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-red)' }}></span> Epicenter
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span> Active Unit
          </span>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        position: 'relative', 
        borderRadius: '8px', 
        background: '#070a10', 
        border: '1px solid rgba(56, 189, 248, 0.2)',
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}>
        {/* Grid Overlay Effects */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent-cyan)',
          opacity: 0.6
        }}>
          GRID SECTOR: 37.77N / 122.41W <br />
          RADAR SCAN: ACTIVE
        </div>

        {/* Incidents Rendering */}
        {incidents.map((inc) => {
          const pos = getPos(inc.location_lat, inc.location_lng);
          return (
            <div
              key={inc.id}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.2)',
                border: '2px dashed var(--accent-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite'
              }}>
                <AlertTriangle size={20} color="var(--accent-red)" />
              </div>
              <div style={{
                background: 'rgba(15, 21, 34, 0.9)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: '#fff',
                whiteSpace: 'nowrap',
                marginTop: '4px',
                border: '1px solid rgba(244, 63, 94, 0.4)'
              }}>
                {inc.title}
              </div>
            </div>
          );
        })}

        {/* Agents Rendering */}
        {agents.map((agent) => {
          const pos = getPos(agent.current_lat, agent.current_lng);
          const isSelected = selectedAgent?.id === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isSelected ? 25 : 20,
                cursor: 'pointer',
                transition: 'all 0.4s ease-out'
              }}
            >
              <div style={{
                width: isSelected ? '34px' : '26px',
                height: isSelected ? '34px' : '26px',
                borderRadius: '50%',
                background: isSelected ? 'var(--accent-cyan)' : 'rgba(56, 189, 248, 0.8)',
                border: isSelected ? '2px solid #fff' : '2px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isSelected ? '0 0 16px var(--accent-cyan)' : '0 0 8px rgba(56, 189, 248, 0.5)'
              }}>
                <Navigation size={isSelected ? 18 : 14} color="#080b11" />
              </div>
              <div style={{
                background: 'rgba(8, 11, 17, 0.9)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                color: isSelected ? 'var(--accent-cyan)' : 'var(--text-main)',
                whiteSpace: 'nowrap',
                marginTop: '4px',
                border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                fontFamily: 'var(--font-mono)'
              }}>
                {agent.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
