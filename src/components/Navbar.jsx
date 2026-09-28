import React, { useState } from 'react';
import { 
  Sparkles, 
  Bell, 
  Sun, 
  Moon, 
  Monitor, 
  Download, 
  User, 
  Search,
  CheckCircle,
  Menu,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  userProfile, 
  theme, 
  setTheme, 
  onOpenAuth, 
  isLoggedIn,
  onInstallPWA,
  deferredPrompt,
  toggleSidebar
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Resume ATS Score Ready', text: 'Your resume achieved 92% ATS compatibility!', time: '10m ago' },
    { id: 2, title: 'Upcoming Mock Test', text: 'TCS Technical Assessment scheduled for tomorrow.', time: '2h ago' },
    { id: 3, title: 'Streak Milestone', text: '🔥 14-day study streak unlocked! Keep it up!', time: '1d ago' }
  ];

  return (
    <header style={{
      height: '70px',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={toggleSidebar} 
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'capitalize', color: 'var(--text-main)' }}>
            {currentTab.replace('_', ' ')}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            PlacementAI Platform &bull; Next-Gen Preparation
          </p>
        </div>
      </div>

      {/* Center: Search & Quick Prompt */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '6px 14px',
        width: '320px',
        gap: '8px'
      }}>
        <Search size={16} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search topics, questions, templates..." 
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            width: '100%'
          }}
        />
      </div>

      {/* Right: Actions, Theme, PWA & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* PWA Install Button */}
        {deferredPrompt && (
          <button 
            onClick={onInstallPWA}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Download size={15} /> Install App
          </button>
        )}

        {/* Theme Switcher */}
        <button 
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'tech' : 'dark';
            setTheme(nextTheme);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title={`Switch Theme (Current: ${theme})`}
        >
          {theme === 'dark' && <Moon size={18} color="#8b5cf6" />}
          {theme === 'light' && <Sun size={18} color="#f59e0b" />}
          {theme === 'tech' && <Monitor size={18} color="#06b6d4" />}
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-rose)'
            }} />
          </button>

          {showNotifications && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '300px',
              padding: '16px',
              zIndex: 50,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', cursor: 'pointer' }}>Mark all read</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderLeft: '3px solid var(--accent-primary)'
                  }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{n.title}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.text}</p>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Auth & Profile Pill */}
        {isLoggedIn ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: '9999px',
            padding: '4px 12px 4px 4px'
          }}>
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: 1 }}>{userProfile.name}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <ShieldCheck size={11} /> Readiness {userProfile.readinessScore}%
              </p>
            </div>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <User size={16} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
}
