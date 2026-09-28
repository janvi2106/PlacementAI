import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  BrainCircuit, 
  Code2, 
  Mic, 
  Users, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_PREP_DATA } from '../data/mockData';

export default function CompanyPrepModule({ onStartMock }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState('tcs');

  const selectedCompany = COMPANY_PREP_DATA.find(c => c.id === selectedCompanyId) || COMPANY_PREP_DATA[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 color="var(--accent-secondary)" />
            <span>Company-Specific Placement Preparation</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Target company blueprints, exam patterns, past interview questions, and candidate reviews.
          </p>
        </div>
      </div>

      {/* Company Selector Cards Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {COMPANY_PREP_DATA.map(comp => (
          <div
            key={comp.id}
            onClick={() => setSelectedCompanyId(comp.id)}
            className="glass-card"
            style={{
              padding: '16px',
              cursor: 'pointer',
              border: `1px solid ${selectedCompanyId === comp.id ? 'var(--accent-secondary)' : 'var(--border-color)'}`,
              background: selectedCompanyId === comp.id ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '1.8rem' }}>{comp.logo}</span>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>{comp.name}</h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{comp.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company Detailed Blueprint Dashboard */}
      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '2.5rem' }}>{selectedCompany.logo}</span>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{selectedCompany.name}</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-secondary)', fontWeight: '600' }}>{selectedCompany.tagline}</p>
            </div>
          </div>

          <button onClick={() => onStartMock('aptitude')} className="btn-primary" style={{ padding: '10px 20px' }}>
            <Sparkles size={16} /> Start {selectedCompany.name} Mock Test
          </button>
        </div>

        {/* 3 Pillars: Aptitude, Technical, HR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Aptitude Pattern */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={18} /> Aptitude Exam Pattern
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {selectedCompany.aptitudePattern}
            </p>
          </div>

          {/* Technical Pattern */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} /> Technical & Coding Round
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {selectedCompany.technicalPattern}
            </p>
          </div>

          {/* HR Questions */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-rose)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mic size={18} /> HR Round Key Questions
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {selectedCompany.hrQuestions.map((hr, idx) => (
                <li key={idx}>{hr}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Candidate Experiences */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--accent-cyan)" />
            <span>Recent Candidate Interview Experiences</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {selectedCompany.experiences.map((exp, idx) => (
              <div key={idx} style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700' }}>{exp.student}</h4>
                  <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-emerald)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)' }}>
                    {exp.package}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)', fontWeight: '600', marginBottom: '8px' }}>
                  Role: {exp.role}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{exp.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
