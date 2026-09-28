import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Code2, 
  ExternalLink,
  Edit,
  Check
} from 'lucide-react';

export default function ProfileModule({ userProfile, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  ];

  const handleSave = () => {
    setIsEditing(false);
    onUpdateProfile(profile);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profile Header Banner */}
      <div className="glass-card" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 186, 212, 0.1) 100%)',
        border: '1px solid var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Avatar Selector */}
          <div style={{ position: 'relative' }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-primary)',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)'
              }}
            />
            {isEditing && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                {avatars.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    onClick={() => setProfile({ ...profile, avatar: av })}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', border: profile.avatar === av ? '2px solid white' : 'none' }}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{profile.name}</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '3px 10px', borderRadius: '9999px', background: 'var(--accent-primary)', color: 'white' }}>
                {profile.level}
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: '600', marginTop: '2px' }}>
              Target Role: {profile.role}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {profile.college} &bull; Graduating {profile.gradYear}
            </p>
          </div>
        </div>

        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)} 
          className={isEditing ? "btn-success" : "btn-secondary"}
        >
          {isEditing ? <Check size={16} /> : <Edit size={16} />}
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Grid: Details & Achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Personal Details & Academic Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--accent-primary)" />
            <span>Personal & Academic Details</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Email Address</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                />
              ) : (
                <p style={{ fontWeight: '600' }}>{profile.email}</p>
              )}
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Phone Number</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                />
              ) : (
                <p style={{ fontWeight: '600' }}>{profile.phone}</p>
              )}
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Degree & Branch</span>
              <p style={{ fontWeight: '600' }}>{profile.degree}</p>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Current Academic CGPA</span>
              <p style={{ fontWeight: '600', color: 'var(--accent-emerald)' }}>{profile.cgpa}</p>
            </div>
          </div>
        </div>

        {/* Technical & Soft Skills Cloud */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 size={18} color="var(--accent-amber)" />
            <span>Verified Skills & Competencies</span>
          </h3>

          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              TECHNICAL SKILLS
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.skills.map((sk, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid var(--accent-amber)',
                  color: 'var(--accent-amber)',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              SOFT SKILLS & LEADERSHIP
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.softSkills.map((sk, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Achievements & Earned Certificates */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="var(--accent-emerald)" />
          <span>Verified Achievements & Placement Certificates</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {profile.achievements.map((ach, i) => (
            <div key={i} style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '700' }}>{ach.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issued: {ach.date}</p>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
                {ach.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
