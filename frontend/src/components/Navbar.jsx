import React from 'react';
import { Shield, Radio, Activity, Server, Cpu } from 'lucide-react';

export default function Navbar({ connected, agentCount, activeIncidents }) {
  return (
    <header className="glass-panel" style={{ margin: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
        }}>
          <Shield size={24} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AEGIS COMMAND
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Multi-Agent Autonomous Disaster Response Orchestrator
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <Cpu size={16} color="var(--accent-cyan)" />
          <span style={{ color: 'var(--text-muted)' }}>Active Fleet:</span>
          <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{agentCount} Agents</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <Activity size={16} color="var(--accent-red)" />
          <span style={{ color: 'var(--text-muted)' }}>Active Emergencies:</span>
          <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{activeIncidents}</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <span className="pulse-dot" style={{ backgroundColor: connected ? 'var(--accent-emerald)' : 'var(--accent-red)' }}></span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: connected ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
            {connected ? 'BACKEND ONLINE' : 'DISCONNECTED'}
          </span>
        </div>
      </div>
    </header>
  );
}
