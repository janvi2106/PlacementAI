import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  BrainCircuit, 
  Code2, 
  Mic, 
  Building2, 
  ArrowRight, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  Zap,
  TrendingUp
} from 'lucide-react';

export default function DashboardModule({ userProfile, onNavigate }) {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete TCS Aptitude Mock Test', done: true },
    { id: 2, text: 'Optimize Resume for SDE Keyword Match > 90%', done: false },
    { id: 3, text: 'Practice AI Voice HR Interview Round 1', done: false },
    { id: 4, text: 'Solve 5 Java Coding Questions in Technical Compiler', done: true }
  ]);

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const scoreCards = [
    { label: 'Resume Score', score: 88, color: '#6366f1', icon: FileText, tab: 'resume_builder' },
    { label: 'ATS Score', score: 92, color: '#06b6d4', icon: CheckSquare, tab: 'ats_checker' },
    { label: 'Aptitude Score', score: 85, color: '#10b981', icon: BrainCircuit, tab: 'aptitude' },
    { label: 'Technical Score', score: 78, color: '#f59e0b', icon: Code2, tab: 'technical' }
  ];

  const recentActivities = [
    { type: 'Aptitude', title: 'Quantitative Mock Test Stage 2', score: '88%', time: '2 hours ago' },
    { type: 'ATS Scan', title: 'Resume v3 Scanned for SDE Role', score: '92% Match', time: 'Yesterday' },
    { type: 'Interview', title: 'AI HR Mock Round 1 Completed', score: '85% Fluency', time: '2 days ago' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
        border: '1px solid var(--accent-primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '2px 8px', borderRadius: '9999px', background: 'var(--accent-primary)', color: 'white' }}>
              🎯 TARGET ROLE
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{userProfile.role}</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>
            Welcome back, {userProfile.name}! 👋
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Your overall placement readiness is on track for upcoming campus hiring drives.
          </p>
        </div>

        {/* Readiness Score Gauge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(0,0,0,0.3)',
          padding: '16px 24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="70" height="70" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--accent-emerald)"
                strokeWidth="3.5"
                strokeDasharray={`${userProfile.readinessScore}, 100`}
              />
            </svg>
            <span style={{ position: 'absolute', fontWeight: '800', fontSize: '1.1rem' }}>
              {userProfile.readinessScore}%
            </span>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>Placement Ready</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top 5% Candidate Tier</p>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '600', cursor: 'pointer' }} onClick={() => onNavigate('analytics')}>
              View Diagnostic Report &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Score Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {scoreCards.map((sc, i) => {
          const Icon = sc.icon;
          return (
            <div 
              key={i} 
              className="glass-card" 
              style={{ padding: '20px', cursor: 'pointer' }}
              onClick={() => onNavigate(sc.tab)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: `${sc.color}20`, color: sc.color }}>
                  <Icon size={22} />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: sc.color }}>{sc.score}%</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>{sc.label}</h4>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${sc.score}%`, background: sc.color, borderRadius: '3px' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Activity & Goals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Recent Activities */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--accent-cyan)" />
            <span>Recent Placement Activities</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.map((act, i) => (
              <div key={i} style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '700' }}>{act.type}</span>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '600' }}>{act.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{act.time}</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-emerald)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)' }}>
                  {act.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Placement Goals */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="var(--accent-amber)" />
            <span>Upcoming Readiness Goals</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {goals.map(g => (
              <div 
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: g.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${g.done ? 'var(--accent-emerald)' : 'var(--border-color)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${g.done ? 'var(--accent-emerald)' : 'var(--text-muted)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: g.done ? 'var(--accent-emerald)' : 'transparent'
                }}>
                  {g.done && <CheckCircle2 size={14} color="white" />}
                </div>
                <span style={{
                  fontSize: '0.88rem',
                  textDecoration: g.done ? 'line-through' : 'none',
                  color: g.done ? 'var(--text-muted)' : 'var(--text-main)'
                }}>
                  {g.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px' }}>Quick Launch Prep Modules</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Resume Builder', tab: 'resume_builder', icon: FileText, color: '#6366f1' },
            { name: 'ATS Scanner', tab: 'ats_checker', icon: CheckSquare, color: '#06b6d4' },
            { name: 'Aptitude Tests', tab: 'aptitude', icon: BrainCircuit, color: '#10b981' },
            { name: 'Code Editor', tab: 'technical', icon: Code2, color: '#f59e0b' },
            { name: 'AI HR Voice', tab: 'hr_interview', icon: Mic, color: '#f43f5e' },
            { name: 'Company Pack', tab: 'company_prep', icon: Building2, color: '#8b5cf6' }
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(m.tab)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ padding: '10px', borderRadius: '50%', background: `${m.color}20`, color: m.color }}>
                  <Icon size={22} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{m.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
