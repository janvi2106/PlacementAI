import React, { useState, useEffect } from 'react';
import { Download, WifiOff, X, Smartphone, CheckCircle } from 'lucide-react';

export default function PWABanner({ deferredPrompt, onInstallPWA }) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <div style={{
        background: 'var(--accent-amber)',
        color: '#000000',
        padding: '8px 16px',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <WifiOff size={16} />
        <span>You are currently offline. Running cached pages via PlacementAI PWA Service Worker.</span>
      </div>
    );
  }

  if (deferredPrompt && !dismissed) {
    return (
      <div className="glass-card" style={{
        margin: '16px 24px 0 24px',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
        border: '1px solid var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary)',
            color: 'white'
          }}>
            <Smartphone size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Install PlacementAI Desktop & Mobile App</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Add to your home screen for fast offline access, native push alerts, and instant practice.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onInstallPWA} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Download size={15} /> Add to Home Screen
          </button>
          <button 
            onClick={() => setDismissed(true)} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
