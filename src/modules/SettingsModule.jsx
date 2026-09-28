import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Monitor, 
  Globe, 
  CheckCircle,
  Moon,
  Sun
} from 'lucide-react';
import { TARGET_ROLES } from '../data/mockData';

export default function SettingsModule({ userProfile, onUpdateProfile, theme, setTheme }) {
  const [savedMsg, setSavedMsg] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    role: userProfile.role,
    gradYear: userProfile.gradYear
  });

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    emailReports: true,
    mockAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    shareStats: false
  });

  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'hinglish'

  const handleSaveSettings = () => {
    onUpdateProfile(profileForm);
    setSavedMsg('Settings saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings color="var(--accent-primary)" />
            <span>Account & Application Settings</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage account preferences, password security, appearance, notifications, and language.
          </p>
        </div>

        <button onClick={handleSaveSettings} className="btn-primary" style={{ padding: '8px 20px' }}>
          Save All Settings
        </button>
      </div>

      {savedMsg && (
        <div style={{
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--accent-emerald)',
          color: 'var(--accent-emerald)',
          fontSize: '0.88rem',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          ✓ {savedMsg}
        </div>
      )}

      {/* Grid: Settings Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Account Details */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--accent-primary)" />
            <span>Account Settings</span>
          </h3>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Display Name</label>
            <input 
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email Address</label>
            <input 
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target Placement Job Role</label>
            <select
              value={profileForm.role}
              onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            >
              {TARGET_ROLES.map(r => (
                <option key={r.id} value={r.name} style={{ background: '#111827' }}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Security & Password */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="var(--accent-rose)" />
            <span>Change Password</span>
          </h3>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Current Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>New Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            />
          </div>

          <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem', marginTop: 'auto' }}>
            Update Password
          </button>
        </div>

        {/* Appearance & Themes */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Monitor size={18} color="var(--accent-cyan)" />
            <span>Appearance & Theme</span>
          </h3>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { id: 'dark', label: 'Dark Glass', icon: Moon },
              { id: 'light', label: 'Clean Light', icon: Sun },
              { id: 'tech', label: 'Tech Cyber', icon: Monitor }
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  style={{
                    flex: 1,
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-md)',
                    background: theme === t.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${theme === t.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    color: theme === t.id ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Icon size={18} /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Language Selection */}
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
              Preparation Notes Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.88rem' }}
            >
              <option value="en" style={{ background: '#111827' }}>English (Standard)</option>
              <option value="hi" style={{ background: '#111827' }}>Hindi (हिंदी)</option>
              <option value="hinglish" style={{ background: '#111827' }}>Hinglish (Simplified Notes)</option>
            </select>
          </div>
        </div>

        {/* Notifications & Toggles */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="var(--accent-amber)" />
            <span>Notification & Privacy Toggles</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', cursor: 'pointer' }}>
              <span>Daily Practice Reminders</span>
              <input 
                type="checkbox"
                checked={notifications.dailyReminders}
                onChange={(e) => setNotifications({ ...notifications, dailyReminders: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', cursor: 'pointer' }}>
              <span>Weekly Performance Digest Email</span>
              <input 
                type="checkbox"
                checked={notifications.emailReports}
                onChange={(e) => setNotifications({ ...notifications, emailReports: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', cursor: 'pointer' }}>
              <span>Public Candidate Profile</span>
              <input 
                type="checkbox"
                checked={privacy.publicProfile}
                onChange={(e) => setPrivacy({ ...privacy, publicProfile: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
