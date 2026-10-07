import React from 'react';
import { Cpu, BatteryCharging, CheckCircle, Clock, Zap, UserCheck } from 'lucide-react';

export default function AgentStatusGrid({ agents, selectedAgent, onSelectAgent }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'idle':
        return <span className="badge" style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.3)' }}>IDLE</span>;
      case 'dispatched':
        return <span className="badge badge-high">DISPATCHED</span>;
      case 'on_site':
        return <span className="badge badge-critical">ON SITE</span>;
      default:
        return <span className="badge badge-active">{status.toUpperCase()}</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={20} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Autonomous Fleet Telemetry</h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {agents.length} Units Synchronized
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '420px', paddingRight: '4px' }}>
        {agents.map((agent) => {
          const isSelected = selectedAgent?.id === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{agent.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>({agent.id})</span>
                </div>
                {getStatusBadge(agent.status)}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.3' }}>
                {agent.task_description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={14} color={agent.battery_level > 50 ? 'var(--accent-emerald)' : 'var(--accent-amber)'} />
                  <span style={{ fontFamily: 'var(--font-mono)' }}>PWR: {agent.battery_level}%</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)' }}>
                  TYPE: {agent.type.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
