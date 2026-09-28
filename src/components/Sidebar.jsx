import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  BrainCircuit, 
  Code2, 
  Mic, 
  Building2, 
  LineChart, 
  BarChart3, 
  User, 
  Settings, 
  Sparkles, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed,
  userProfile,
  isLoggedIn,
  onLogout,
  onOpenAuth
}) {
  const navItems = [
    { id: 'landing', label: 'Landing Page', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Main' },
    { id: 'resume_builder', label: 'AI Resume Builder', icon: FileText, badge: 'AI' },
    { id: 'ats_checker', label: 'ATS Analysis', icon: CheckSquare, badge: 'Hot' },
    { id: 'aptitude', label: 'Aptitude Prep', icon: BrainCircuit },
    { id: 'technical', label: 'Technical Prep', icon: Code2, badge: 'Editor' },
    { id: 'hr_interview', label: 'AI HR Interview', icon: Mic, badge: 'Voice' },
    { id: 'company_prep', label: 'Company Prep', icon: Building2 },
    { id: 'progress', label: 'My Progress', icon: LineChart },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside style={{
      width: collapsed ? '80px' : '260px',
      height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 50,
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: collapsed ? '0' : '0 20px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            flexShrink: 0
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          {!collapsed && (
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }} className="gradient-text">
                PlacementAI
              </h1>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Pro Preparation System</p>
            </div>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: collapsed ? 'none' : 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Daily Streak Highlight */}
      {!collapsed && (
        <div style={{ padding: '14px 16px 4px 16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="#f59e0b" className="animate-pulse" />
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#f59e0b' }}>
                  {userProfile.streakDays} Days Streak!
                </p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Daily Practice Active</p>
              </div>
            </div>
            <Award size={18} color="#f59e0b" />
          </div>
        </div>
      )}

      {/* Nav Links */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: collapsed ? '12px 0' : '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--gradient-primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '600' : '400',
                boxShadow: isActive ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none'
              }}
              title={collapsed ? item.label : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={19} color={isActive ? '#ffffff' : 'currentColor'} />
                {!collapsed && <span style={{ fontSize: '0.88rem' }}>{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(99, 102, 241, 0.15)',
                  color: isActive ? '#ffffff' : 'var(--accent-primary)',
                  textTransform: 'uppercase'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer User Info / Logout */}
      <div style={{
        padding: '14px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {isLoggedIn ? (
          <button 
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '10px',
              padding: '8px 12px',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-rose)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '0.82rem'
            }}
          >
            {!collapsed ? 'Sign In / Register' : 'In'}
          </button>
        )}
      </div>
    </aside>
  );
}
