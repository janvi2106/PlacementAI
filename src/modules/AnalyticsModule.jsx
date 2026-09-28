import React from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  BrainCircuit,
  Code2,
  Mic
} from 'lucide-react';

export default function AnalyticsModule({ userProfile }) {
  const metrics = [
    { title: 'Resume Quality & ATS', score: 92, label: 'Top 3% Tier', color: '#6366f1', icon: FileText },
    { title: 'Aptitude Mastery', score: 85, label: 'Quant & Logical Ready', color: '#10b981', icon: BrainCircuit },
    { title: 'Technical & Coding', score: 78, label: 'Passed 14 Compiler Suite Tests', color: '#f59e0b', icon: Code2 },
    { title: 'HR & Communication', score: 88, label: 'High Confidence Speech Rate', color: '#f43f5e', icon: Mic }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card no-print" style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 color="var(--accent-primary)" />
            <span>Placement Readiness Analytics & Reports</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Comprehensive diagnostic analysis report for campus placement officers & mentors.
          </p>
        </div>

        <button onClick={() => window.print()} className="btn-primary" style={{ padding: '10px 20px' }}>
          <Printer size={16} /> Print Full Readiness Report
        </button>
      </div>

      {/* Printable Readiness Summary Report */}
      <div className="printable-resume" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Candidate Banner */}
        <div className="glass-card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
          border: '1px solid var(--accent-emerald)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
              OFFICIAL PLACEMENT READINESS REPORT
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0' }}>{userProfile.name}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {userProfile.degree} &bull; {userProfile.college}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>OVERALL READINESS INDEX</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>
              {userProfile.readinessScore}%
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
              Grade A Candidate
            </span>
          </div>
        </div>

        {/* 4 Pillars Analytics Bar Charts */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '20px' }}>Pillar Performance Breakdown</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={18} color={m.color} /> {m.title}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '800', color: m.color }}>
                      {m.score}% ({m.label})
                    </span>
                  </div>

                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${m.score}%`, background: m.color, borderRadius: '5px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mentor & Training Recommendations */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            Placement Mentor Diagnostic Evaluation
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            The candidate demonstrates exceptional technical and resume readiness for Tier-1 software roles (SDE/Full Stack). Aptitude scores in Quantitative and Logical reasoning meet standards for TCS NQT, Infosys, and Accenture drives. Continued focus on advanced Dynamic Programming coding questions and AI Voice HR response speed will ensure 100% placement success.
          </p>
        </div>
      </div>
    </div>
  );
}
