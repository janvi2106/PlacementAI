import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Eye, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Code2,
  Printer
} from 'lucide-react';
import { TARGET_ROLES, RESUME_TEMPLATES, INITIAL_RESUME_DATA } from '../data/mockData';

export default function ResumeBuilderModule() {
  const [targetRole, setTargetRole] = useState('swe');
  const [selectedTemplate, setSelectedTemplate] = useState('modern_pro');
  const [resume, setResume] = useState(INITIAL_RESUME_DATA);
  const [activeStep, setActiveStep] = useState('personal'); // personal | education | skills | projects | experience | certs
  const [isAIWriting, setIsAIWriting] = useState(false);

  // AI Auto Generator functions
  const handleAIGenerateSummary = () => {
    setIsAIWriting(true);
    setTimeout(() => {
      const selectedRoleObj = TARGET_ROLES.find(r => r.id === targetRole);
      const generated = `High-performing ${selectedRoleObj ? selectedRoleObj.name : 'Software Engineer'} with strong expertise in software development, algorithm design, and modern framework architectures. Experienced in building end-to-end applications and delivering clean, maintainable code. Highly adept at technical problem-solving and cross-functional team collaboration.`;
      setResume(prev => ({ ...prev, summary: generated }));
      setIsAIWriting(false);
    }, 800);
  };

  const handleAIGenerateObjective = () => {
    setIsAIWriting(true);
    setTimeout(() => {
      const generated = `To leverage strong technical proficiency and problem-solving skills in an impactful Software Engineering role, driving the development of scalable digital products while contributing to organizational growth.`;
      setResume(prev => ({ ...prev, objective: generated }));
      setIsAIWriting(false);
    }, 800);
  };

  // Add handlers
  const handleAddProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: 'New Full Stack Web App',
          description: 'Developed an interactive web application featuring real-time state management and REST API integration.',
          techStack: 'React, Node.js, Express, MongoDB',
          githubLink: 'https://github.com/user/project',
          liveLink: ''
        }
      ]
    }));
  };

  const handleRemoveProject = (index) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Action Bar */}
      <div className="glass-card no-print" style={{
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText color="var(--accent-primary)" />
            <span>AI Resume Builder & Generator</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Select target job role, choose template, edit fields, and generate AI enhanced summary.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={handleExportJSON} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <Upload size={15} /> Export JSON
          </button>
          <button onClick={handlePrintPDF} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            <Printer size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Target Role & Template Selector Bar */}
      <div className="glass-card no-print" style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', display: 'block', color: 'var(--accent-cyan)' }}>
            🎯 Target Job Role
          </label>
          <select 
            value={targetRole} 
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            {TARGET_ROLES.map(role => (
              <option key={role.id} value={role.id} style={{ background: '#111827' }}>
                {role.name} ({role.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', display: 'block', color: 'var(--accent-primary)' }}>
            📄 ATS Resume Template
          </label>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {RESUME_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedTemplate === tpl.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${selectedTemplate === tpl.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  color: selectedTemplate === tpl.id ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Builder Main: Split View (Form Editor + Live Resume Preview) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Left Column: Multi-Step Editor */}
        <div className="glass-card no-print" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section Navigation Tabs */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Code2 },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'certs', label: 'Certs', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStep(tab.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: activeStep === tab.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    border: `1px solid ${activeStep === tab.id ? 'var(--accent-primary)' : 'transparent'}`,
                    color: activeStep === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={14} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Step 1: Personal Info & Summary */}
          {activeStep === 'personal' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Personal Details</h4>
                <button 
                  onClick={handleAIGenerateSummary}
                  disabled={isAIWriting}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
                >
                  <Sparkles size={13} /> {isAIWriting ? 'Writing AI Summary...' : 'AI Auto-Write Summary'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={resume.personalInfo.fullName} 
                    onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, fullName: e.target.value } })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Headline / Title</label>
                  <input 
                    type="text" 
                    value={resume.personalInfo.title} 
                    onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, title: e.target.value } })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</label>
                  <input 
                    type="email" 
                    value={resume.personalInfo.email} 
                    onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, email: e.target.value } })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</label>
                  <input 
                    type="text" 
                    value={resume.personalInfo.phone} 
                    onChange={(e) => setResume({ ...resume, personalInfo: { ...resume.personalInfo, phone: e.target.value } })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Professional Summary</label>
                <textarea 
                  rows={4}
                  value={resume.summary}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {activeStep === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Education & Academics</h4>
              {resume.education.map((edu, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[i].degree = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>College / University</label>
                    <input 
                      type="text" 
                      value={edu.college}
                      onChange={(e) => {
                        const updated = [...resume.education];
                        updated[i].college = e.target.value;
                        setResume({ ...resume, education: updated });
                      }}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CGPA / Score</label>
                      <input 
                        type="text" 
                        value={edu.cgpa}
                        onChange={(e) => {
                          const updated = [...resume.education];
                          updated[i].cgpa = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Passing Year</label>
                      <input 
                        type="text" 
                        value={edu.passingYear}
                        onChange={(e) => {
                          const updated = [...resume.education];
                          updated[i].passingYear = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Skills */}
          {activeStep === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Skills & Competencies</h4>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technical Skills (Comma Separated)</label>
                <textarea 
                  rows={3}
                  value={resume.skills.technical.join(', ')}
                  onChange={(e) => setResume({
                    ...resume,
                    skills: { ...resume.skills, technical: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                  })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Soft Skills (Comma Separated)</label>
                <textarea 
                  rows={2}
                  value={resume.skills.soft.join(', ')}
                  onChange={(e) => setResume({
                    ...resume,
                    skills: { ...resume.skills, soft: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                  })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          )}

          {/* Step 4: Projects */}
          {activeStep === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Key Projects</h4>
                <button onClick={handleAddProject} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  <Plus size={14} /> Add Project
                </button>
              </div>

              {resume.projects.map((proj, i) => (
                <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)' }}>Project #{i + 1}</span>
                    <button onClick={() => handleRemoveProject(i)} style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Project Title</label>
                    <input 
                      type="text" 
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[i].title = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tech Stack</label>
                    <input 
                      type="text" 
                      value={proj.techStack}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[i].techStack = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Description</label>
                    <textarea 
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[i].description = e.target.value;
                        setResume({ ...resume, projects: updated });
                      }}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Experience */}
          {activeStep === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Work Experience / Internships</h4>
              {resume.experience.map((exp, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Role Title</label>
                      <input 
                        type="text" 
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...resume.experience];
                          updated[i].role = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Company Name</label>
                      <input 
                        type="text" 
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...resume.experience];
                          updated[i].company = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 6: Certifications */}
          {activeStep === 'certs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>Certifications & Credentials</h4>
              {resume.certifications.map((cert, i) => (
                <div key={i} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <input 
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...resume.certifications];
                      updated[i].name = e.target.value;
                      setResume({ ...resume, certifications: updated });
                    }}
                    style={{ width: '100%', padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.82rem' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Live Printable Resume Preview */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div className="printable-resume" style={{
            background: '#ffffff',
            color: '#111827',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            fontFamily: 'Inter, sans-serif',
            minHeight: '680px'
          }}>
            {/* Header */}
            <div style={{ borderBottom: `3px solid ${RESUME_TEMPLATES.find(t => t.id === selectedTemplate)?.accentColor || '#6366f1'}`, paddingBottom: '16px', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                {resume.personalInfo.fullName}
              </h1>
              <p style={{ fontSize: '0.95rem', fontWeight: '600', color: RESUME_TEMPLATES.find(t => t.id === selectedTemplate)?.accentColor || '#6366f1', margin: '4px 0 10px 0' }}>
                {resume.personalInfo.title}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '0.78rem', color: '#4b5563' }}>
                <span>📧 {resume.personalInfo.email}</span>
                <span>📞 {resume.personalInfo.phone}</span>
                <span>📍 {resume.personalInfo.location}</span>
                {resume.personalInfo.github && <span>💻 {resume.personalInfo.github}</span>}
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#374151', marginBottom: '6px' }}>
                Professional Summary
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#1f2937' }}>
                {resume.summary}
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#374151', marginBottom: '8px' }}>
                Education
              </h3>
              {resume.education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: '700', margin: 0, color: '#111827' }}>{edu.degree}</p>
                    <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: 0 }}>{edu.college}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: '700', color: '#111827', margin: 0 }}>CGPA: {edu.cgpa}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0 }}>Grad: {edu.passingYear}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#374151', marginBottom: '6px' }}>
                Technical Skills
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#1f2937' }}>
                <strong>Technologies & Tools:</strong> {resume.skills.technical.join(' • ')}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#1f2937', marginTop: '4px' }}>
                <strong>Soft Skills:</strong> {resume.skills.soft.join(' • ')}
              </p>
            </div>

            {/* Projects */}
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#374151', marginBottom: '8px' }}>
                Key Projects
              </h3>
              {resume.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827', margin: 0 }}>{proj.title}</p>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{proj.techStack}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#374151', margin: '3px 0 0 0', lineHeight: 1.4 }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
