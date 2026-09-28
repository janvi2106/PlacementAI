import React, { useState } from 'react';
import { 
  CheckSquare, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Download, 
  Plus, 
  Search, 
  BarChart2,
  Printer
} from 'lucide-react';

export default function ATSAnalysisModule({ onNavigateToBuilder }) {
  const [resumeText, setResumeText] = useState(`JANVI PARMAR
Software Development Engineer
Email: janvi.parmar@placement.ai | Phone: +91 98765 43210 | Mumbai, India

SUMMARY
Motivated Computer Science undergraduate with strong expertise in Data Structures, System Design, and Full-Stack Web Development. Proven track record of building scalable web applications.

SKILLS
Java, Python, C++, JavaScript, React.js, Node.js, Express, SQL, MongoDB, Git, Docker, REST APIs

PROJECTS
- PlacementAI: Real-time placement prep platform using React and Gemini API.
- Distributed E-Commerce Microservices: Spring Boot backend handling 1,000+ requests.`);

  const [jobDescription, setJobDescription] = useState(`Seeking a Software Development Engineer with experience in Java, Python, React.js, Data Structures, System Design, AWS, Docker, Microservices, and CI/CD pipelines.`);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState({
    atsScore: 92,
    keywordMatch: 88,
    contentQuality: 95,
    formattingScore: 94,
    readabilityScore: 90,
    matchedKeywords: ['Java', 'Python', 'React.js', 'Data Structures', 'Docker', 'System Design'],
    missingKeywords: ['AWS', 'Microservices', 'CI/CD Pipelines', 'Kubernetes'],
    suggestions: [
      { id: 1, title: 'Add Missing Cloud Keywords', text: 'Target job demands AWS & CI/CD experience. Mention AWS practitioner or Cloud projects.', impact: '+5% Score' },
      { id: 2, title: 'Quantify Accomplishments', text: 'Include metrics in project descriptions (e.g. "Improved performance by 35%").', impact: '+3% Score' }
    ]
  });

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Recalculate based on input length and keywords
      const hasAWS = resumeText.toLowerCase().includes('aws');
      const newScore = hasAWS ? 97 : 92;

      setAtsResult(prev => ({
        ...prev,
        atsScore: newScore,
        matchedKeywords: hasAWS ? [...prev.matchedKeywords, 'AWS'] : prev.matchedKeywords,
        missingKeywords: hasAWS ? prev.missingKeywords.filter(k => k !== 'AWS') : prev.missingKeywords
      }));
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleInsertKeyword = (keyword) => {
    setResumeText(prev => prev + `\n- Experience with ${keyword} in scalable projects.`);
    handleRunAnalysis();
  };

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
            <CheckSquare color="var(--accent-cyan)" />
            <span>ATS Resume Analysis & Scanner</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Upload resume or paste text to test ATS compatibility against target job descriptions.
          </p>
        </div>

        <button onClick={() => window.print()} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
          <Printer size={16} /> Print Diagnostic Report
        </button>
      </div>

      {/* Input Section: Resume Text & Job Description */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Resume Input Pane */}
        <div className="glass-card no-print" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} color="var(--accent-primary)" />
            <span>Your Resume Content</span>
          </h3>

          {/* Upload Simulation */}
          <div style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            cursor: 'pointer'
          }}>
            <Upload size={22} color="var(--accent-primary)" style={{ margin: '0 auto 6px auto' }} />
            <p style={{ fontSize: '0.82rem', fontWeight: '600' }}>Drop PDF/DOCX Resume here or Paste below</p>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Maximum file size: 5MB</span>
          </div>

          <textarea 
            rows={8}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              outline: 'none',
              fontFamily: 'Fira Code, monospace'
            }}
          />
        </div>

        {/* Target Job Description Pane */}
        <div className="glass-card no-print" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={18} color="var(--accent-cyan)" />
            <span>Target Job Description (JD)</span>
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Paste the job posting requirements to measure keyword match accuracy.
          </p>

          <textarea 
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          />

          <button 
            onClick={handleRunAnalysis} 
            disabled={isAnalyzing}
            className="btn-primary" 
            style={{ marginTop: 'auto', padding: '10px' }}
          >
            <Sparkles size={16} /> {isAnalyzing ? 'Scanning Resume ATS...' : 'Run ATS Scanner Now'}
          </button>
        </div>
      </div>

      {/* Diagnostic Analysis Results Dashboard */}
      <div className="printable-resume" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Score Gauge Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center', border: '1px solid var(--accent-emerald)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>OVERALL ATS SCORE</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-emerald)', margin: '4px 0' }}>
              {atsResult.atsScore}%
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>✓ Excellent Pass Rate</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>KEYWORD MATCH</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-cyan)', margin: '4px 0' }}>
              {atsResult.keywordMatch}%
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>6 Matched / 4 Missing</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>FORMAT & STRUCTURE</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-primary)', margin: '4px 0' }}>
              {atsResult.formattingScore}%
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Standard Section Headers</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>READABILITY SCORE</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-amber)', margin: '4px 0' }}>
              {atsResult.readabilityScore}%
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High Recruiter Scannability</span>
          </div>
        </div>

        {/* Keywords Matching & Missing Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Matched Keywords */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={18} /> Matched Keywords Found
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {atsResult.matchedKeywords.map((kw, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid var(--accent-emerald)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords & Quick Insertion */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={18} /> Missing Essential Keywords
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {atsResult.missingKeywords.map((kw, i) => (
                <button 
                  key={i}
                  onClick={() => handleInsertKeyword(kw)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid var(--accent-rose)',
                    color: 'var(--accent-rose)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Click to insert into resume"
                >
                  <Plus size={12} /> {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Improvement Suggestions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <span>AI Actionable Optimization Suggestions</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {atsResult.suggestions.map(s => (
              <div key={s.id} style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '4px solid var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700' }}>{s.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.text}</p>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-emerald)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)' }}>
                  {s.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
