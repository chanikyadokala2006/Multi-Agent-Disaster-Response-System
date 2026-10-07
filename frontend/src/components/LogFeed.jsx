import React from 'react';
import { Terminal, ShieldAlert, Radio } from 'lucide-react';

export default function LogFeed({ logs }) {
  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '220px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Multi-Agent Live Decision & Event Stream</h2>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>LIVE TELEMETRY LOGS</span>
      </div>

      <div style={{ 
        flex: 1, 
        background: '#05070c', 
        borderRadius: '6px', 
        border: '1px solid var(--border-color)', 
        padding: '12px', 
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.78rem',
        overflowY: 'auto',
        maxHeight: '200px'
      }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '20px' }}>Awaiting system events...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '6px', lineHeight: '1.4', display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--text-dim)' }}>[{log.timestamp}]</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>[{log.source}]:</span>
              <span style={{ color: 'var(--text-main)' }}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
