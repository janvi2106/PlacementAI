import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 33;
    if (password.length < 10) return 66;
    return 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');
    setLoading(true);

    try {
      if (tab === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset link sent to your registered email!');
        setLoading(false);
        return;
      }

      if (tab === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          fullName: fullName || 'Placement User',
          email: email,
          createdAt: new Date().toISOString()
        });
        onLoginSuccess({
          name: fullName || user.email.split('@')[0],
          email: user.email,
          uid: user.uid
        });
        onClose();
      } else if (tab === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        onLoginSuccess({
          name: user.displayName || fullName || user.email.split('@')[0],
          email: user.email,
          uid: user.uid
        });
        onClose();
      }
    } catch (err) {
      console.error("Firebase Auth Error:", err);
      let text = err.message || 'Authentication failed';
      if (text.includes('auth/invalid-credential') || text.includes('auth/wrong-password')) {
        text = 'Invalid email or password.';
      } else if (text.includes('auth/email-already-in-use')) {
        text = 'An account with this email already exists.';
      } else if (text.includes('auth/weak-password')) {
        text = 'Password should be at least 6 characters.';
      }
      setErrorMessage(text);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName) => {
    setErrorMessage('');
    setMessage('');
    if (providerName === 'Google') {
      try {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString()
        }, { merge: true });
        onLoginSuccess({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL
        });
        onClose();
      } catch (err) {
        console.error("Google Auth Error:", err);
        setErrorMessage(err.message || 'Google sign-in failed');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage(`${providerName} login is not configured yet.`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '32px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        border: '1px solid var(--border-glow)'
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
            {tab === 'login' && 'Welcome Back'}
            {tab === 'register' && 'Create Account'}
            {tab === 'forgot' && 'Reset Password'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {tab === 'login' && 'Sign in to access your resumes & prep tests.'}
            {tab === 'register' && 'Start your PlacementAI preparation journey.'}
            {tab === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Tab Switcher */}
        {tab !== 'forgot' && (
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setTab('login')}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                background: tab === 'login' ? 'var(--accent-primary)' : 'transparent',
                color: tab === 'login' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                background: tab === 'register' ? 'var(--accent-primary)' : 'transparent',
                color: tab === 'register' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        )}

        {errorMessage && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid var(--accent-rose)',
            color: 'var(--accent-rose)',
            fontSize: '0.82rem',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {errorMessage}
            {tab === 'register' && errorMessage.includes('already exists') && (
              <div style={{ marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMessage('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.82rem'
                  }}
                >
                  Click here to Sign In &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {message && (
          <div style={{
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid var(--accent-emerald)',
            color: 'var(--accent-emerald)',
            fontSize: '0.82rem',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tab === 'register' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  placeholder="Janvi Parmar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                required
                placeholder="janvi@placement.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password</label>
                {tab === 'login' && (
                  <span 
                    onClick={() => setTab('forgot')} 
                    style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Password Strength Indicator */}
              {tab === 'register' && password.length > 0 && (
                <div style={{ marginTop: '6px' }}>
                  <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${getPasswordStrength()}%`,
                      background: getPasswordStrength() < 50 ? 'var(--accent-rose)' : getPasswordStrength() < 80 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Password Strength: {getPasswordStrength() < 50 ? 'Weak' : getPasswordStrength() < 80 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '6px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {tab === 'login' && (loading ? 'Signing In...' : 'Sign In')}
            {tab === 'register' && (loading ? 'Creating Account...' : 'Create Account')}
            {tab === 'forgot' && (loading ? 'Sending Email...' : 'Send Recovery Email')}
          </button>
        </form>

        {/* Social Auth Buttons */}
        {tab !== 'forgot' && (
          <div style={{ marginTop: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '16px 0',
              color: 'var(--text-dim)',
              fontSize: '0.75rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              <span style={{ padding: '0 8px' }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleSocialLogin('Google')}
                className="btn-secondary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
              >
                🌐 Google
              </button>
              <button 
                onClick={() => handleSocialLogin('Microsoft')}
                className="btn-secondary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
              >
                💻 Microsoft
              </button>
            </div>
          </div>
        )}

        {tab === 'forgot' && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span 
              onClick={() => setTab('login')} 
              style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', cursor: 'pointer' }}
            >
              &larr; Back to Sign In
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
