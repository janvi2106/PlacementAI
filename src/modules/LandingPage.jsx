import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Zap, 
  FileText, 
  CheckSquare, 
  BrainCircuit, 
  Code2, 
  Mic, 
  Building2,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

export default function LandingPage({ onExplore, onOpenAuth }) {
  const stats = [
    { label: 'Students Prepared', value: '15,000+', icon: Users, color: '#6366f1' },
    { label: 'Resumes Created', value: '42,000+', icon: FileText, color: '#06b6d4' },
    { label: 'ATS Success Rate', value: '94.8%', icon: ShieldCheck, color: '#10b981' },
    { label: 'Avg Salary Hikes', value: '4.8 LPA', icon: TrendingUp, color: '#f59e0b' }
  ];

  const features = [
    {
      title: 'AI Resume Builder & Generator',
      desc: 'Build ATS-compliant resumes with AI-written professional summaries, target role customization, and 1-click PDF download.',
      icon: FileText,
      badge: 'Popular',
      color: 'var(--accent-primary)',
      tab: 'resume_builder'
    },
    {
      title: 'Real-Time ATS Checker',
      desc: 'Instant keyword matching, formatting score, missing keyword detection, and detailed diagnostic optimization report.',
      icon: CheckSquare,
      badge: 'High Impact',
      color: 'var(--accent-cyan)',
      tab: 'ats_checker'
    },
    {
      title: 'Stage-Wise Aptitude Practice',
      desc: 'Master Quantitative, Logical Reasoning, and English across Beginner, Intermediate, and Full Timed Mock Exams.',
      icon: BrainCircuit,
      badge: 'Practice',
      color: 'var(--accent-emerald)',
      tab: 'aptitude'
    },
    {
      title: 'Technical Practice & Code Editor',
      desc: 'Interactive online compiler with test case validation for Java, Python, C++, SQL, React, and Flutter.',
      icon: Code2,
      badge: 'Compiler',
      color: 'var(--accent-amber)',
      tab: 'technical'
    },
    {
      title: 'AI HR Mock Interview Simulator',
      desc: 'Voice & Text interactive interview rounds with instant AI feedback on confidence, fluency, and communication scores.',
      icon: Mic,
      badge: 'Voice AI',
      color: 'var(--accent-rose)',
      tab: 'hr_interview'
    },
    {
      title: 'Company-Specific Placement Guides',
      desc: 'Target TCS, Infosys, Wipro, Accenture, Capgemini, and Amazon with company-tailored question banks and blueprints.',
      icon: Building2,
      badge: 'Company Pack',
      color: 'var(--accent-secondary)',
      tab: 'company_prep'
    }
  ];

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      college: 'VJT Institute, Mumbai',
      role: 'Placed at TCS Digital (7.2 LPA)',
      quote: 'The AI Resume Builder boost my ATS score from 62% to 94%. Got shortlisted in 4 campus drives in one week!',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Ananya Sharma',
      college: 'VIT, Vellore',
      role: 'Placed at Accenture (6.5 LPA)',
      quote: 'The AI HR interview simulator gave me the confidence to handle tough situational questions easily during campus interviews.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{
        padding: '60px 24px 40px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="glass-pill" style={{ marginBottom: '20px', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'var(--accent-primary)' }}>
          <Sparkles size={16} color="var(--accent-primary)" />
          <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Next-Gen AI Placement Preparation System</span>
        </div>

        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: '900',
          lineHeight: 1.15,
          maxWidth: '900px',
          margin: '0 auto 20px auto'
        }}>
          Ace Campus Placements with <span className="gradient-text">AI Resume Builder & Mock Interviews</span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto 32px auto',
          lineHeight: 1.6
        }}>
          Build high-scoring ATS resumes, solve stage-wise aptitude & coding tests, practice AI voice HR interviews, and unlock company-specific placement blueprints.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => onExplore('dashboard')} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </button>
          <button onClick={() => onExplore('resume_builder')} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <FileText size={18} />
            <span>Build Resume Now</span>
          </button>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section style={{ padding: '20px 24px 40px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: `${st.color}20`,
                  color: st.color
                }}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }}>{st.value}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{st.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Everything You Need To Get Placed</h2>
          <p style={{ color: 'var(--text-muted)' }}>All-in-one platform engineered for modern campus placements and off-campus drives.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ padding: '28px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                onClick={() => onExplore(feat.tab)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: `${feat.color}20`,
                      color: feat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: feat.color
                    }}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '10px' }}>{feat.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{feat.desc}</p>
                </div>

                <div style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: feat.color,
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}>
                  <span>Explore Feature</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Showcase */}
      <section style={{ padding: '40px 24px' }}>
        <div className="glass-card" style={{ padding: '36px', background: 'var(--gradient-dark)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '28px' }}>
            Trusted by 15,000+ Engineering Students
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, s) => <Star key={s} size={15} color="#f59e0b" fill="#f59e0b" />)}
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '16px', color: 'var(--text-main)' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>{t.role}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
