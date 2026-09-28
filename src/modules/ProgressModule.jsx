import React from 'react';
import { 
  LineChart, 
  Flame, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  BarChart3,
  Calendar
} from 'lucide-react';

export default function ProgressModule({ userProfile }) {
  const history = [
    { id: 1, name: 'TCS Quantitative Aptitude Stage 2', module: 'Aptitude', date: 'Aug 18, 2026', score: '88%', time: '14 min' },
    { id: 2, name: 'Java Two Sum HashMap Compiler Test', module: 'Technical', date: 'Aug 17, 2026', score: '100%', time: '8 min' },
    { id: 3, name: 'AI Voice HR Interview Round 1', module: 'HR Interview', date: 'Aug 16, 2026', score: '85%', time: '12 min' },
    { id: 4, name: 'SDE Resume ATS Scan v3', module: 'ATS Checker', date: 'Aug 15, 2026', score: '92%', time: '2 min' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LineChart color="var(--accent-primary)" />
          <span>My Progress & Test History</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Track daily study streak, average test scores, weekly preparation graph, and test history.
        </p>
      </div>

      {/* Top 4 Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL ATTEMPTS</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--accent-primary)', margin: '4px 0' }}>28</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Across All Modules</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>AVERAGE SCORE</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--accent-cyan)', margin: '4px 0' }}>86.4%</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>↑ +4.2% This Week</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>BEST SCORE</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--accent-emerald)', margin: '4px 0' }}>100%</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Java Compiler Test</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center', border: '1px solid #f59e0b' }}>
          <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Flame size={16} /> ACTIVE STREAK
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#f59e0b', margin: '4px 0' }}>{userProfile.streakDays} Days</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Daily Practice Goal Met</span>
        </div>
      </div>

      {/* Weekly Progress Trend SVG Graph */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="var(--accent-cyan)" />
          <span>Weekly Preparation Score Graph</span>
        </h3>

        {/* Visual Line Chart SVG */}
        <div style={{ width: '100%', height: '220px', position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

            {/* Gradient Fill */}
            <path
              d="M 0 140 Q 80 110, 160 80 T 320 60 T 500 30 L 500 180 L 0 180 Z"
              fill="url(#chartGrad)"
            />

            {/* Line Path */}
            <path
              d="M 0 140 Q 80 110, 160 80 T 320 60 T 500 30"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="4"
            />

            {/* Plot Points */}
            <circle cx="0" cy="140" r="5" fill="#6366f1" />
            <circle cx="125" cy="95" r="5" fill="#06b6d4" />
            <circle cx="250" cy="70" r="5" fill="#10b981" />
            <circle cx="375" cy="50" r="5" fill="#f59e0b" />
            <circle cx="500" cy="30" r="5" fill="#6366f1" />
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun (Today)</span>
        </div>
      </div>

      {/* Recent Test History Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="var(--accent-emerald)" />
          <span>Recent Test History</span>
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Test Name</th>
                <th style={{ padding: '12px' }}>Module</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Time Taken</th>
                <th style={{ padding: '12px' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '14px 12px', fontWeight: '600' }}>{row.name}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--accent-primary)' }}>{row.module}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{row.date}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{row.time}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--accent-emerald)',
                      fontWeight: '700',
                      fontSize: '0.8rem'
                    }}>
                      {row.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
