import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  User, 
  Bot, 
  Send,
  Play
} from 'lucide-react';
import { HR_QUESTIONS_BANK } from '../data/mockData';

export default function HRInterviewModule({ userProfile }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const currentQ = HR_QUESTIONS_BANK[currentQIndex] || HR_QUESTIONS_BANK[0];

  // Web Speech API Text-to-Speech
  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQ.question);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Voice Recording
  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate speech recognition
      setTimeout(() => {
        setUserAnswer("I am a dedicated Computer Science student with a strong passion for software engineering. I have built full-stack web applications using React and Node.js, and solved over 300 DSA problems. My strength is analytical problem solving.");
        setIsRecording(false);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  // Submit Answer for AI Evaluation
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setEvaluation({
        communicationScore: 88,
        confidenceScore: 92,
        fluencyScore: 85,
        professionalismScore: 90,
        feedback: "Excellent structure using Present-Past-Future flow! Strong technical keywords included. To reach 95%+, quantify your project results with metrics.",
        improvedAnswer: `I am a Computer Science candidate with expertise in full-stack web applications and DSA. Recently, I built PlacementAI using React, improving user preparation scores by 35%. My key strengths are analytical problem solving and collaborative code review. I am eager to bring these engineering skills to your team.`
      });
      setIsEvaluating(false);
    }, 1200);
  };

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
            <Mic color="var(--accent-rose)" />
            <span>AI Voice & Text HR Interview Simulator</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Practice Round 1 HR & Advanced role-based questions with real-time AI speech evaluation.
          </p>
        </div>

        {/* Question Switcher */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {HR_QUESTIONS_BANK.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQIndex(idx);
                setUserAnswer('');
                setEvaluation(null);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: currentQIndex === idx ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.05)',
                color: currentQIndex === idx ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: AI Interviewer Card + Candidate Response Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Left Column: AI HR Avatar & Question Prompt */}
        <div className="glass-card" style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
            position: 'relative'
          }}>
            <Bot size={44} color="white" />
            <span style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              border: '2px solid var(--bg-primary)'
            }} />
          </div>

          <div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '9999px',
              background: 'rgba(244, 63, 94, 0.15)',
              color: 'var(--accent-rose)'
            }}>
              {currentQ.category}
            </span>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '12px 0 8px 0', lineHeight: 1.4 }}>
              "{currentQ.question}"
            </h3>
          </div>

          {/* Voice AI Audio Player */}
          <button 
            onClick={handleSpeakQuestion}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
          >
            <Volume2 size={16} /> Listen to Question Aloud
          </button>

          {/* AI Tip Box */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            marginTop: 'auto',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <strong style={{ color: 'var(--accent-amber)', display: 'block', marginBottom: '4px' }}>
              💡 Expert HR Answering Tip:
            </strong>
            {currentQ.tips}
          </div>
        </div>

        {/* Right Column: Response Input & Live Metrics Evaluation */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--accent-primary)" />
            <span>Your Response (Voice or Typed)</span>
          </h4>

          {/* Voice Microphone Controller */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleToggleRecord}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isRecording ? 'var(--accent-rose)' : 'var(--accent-primary)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isRecording ? '0 0 20px rgba(244, 63, 94, 0.6)' : 'none'
                }}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                  {isRecording ? 'Listening & Transcribing Speech...' : 'Click Mic to Speak Answer'}
                </p>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Web Speech API Active
                </span>
              </div>
            </div>

            {/* Audio Wave animation when recording */}
            {isRecording && (
              <div className="voice-wave">
                <div className="voice-bar" />
                <div className="voice-bar" />
                <div className="voice-bar" />
                <div className="voice-bar" />
                <div className="voice-bar" />
              </div>
            )}
          </div>

          <textarea
            rows={5}
            placeholder="Type or speak your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none',
              lineHeight: 1.5
            }}
          />

          <button
            onClick={handleSubmitAnswer}
            disabled={isEvaluating || !userAnswer.trim()}
            className="btn-primary"
            style={{ padding: '12px' }}
          >
            <Sparkles size={16} /> {isEvaluating ? 'Evaluating Voice Metrics...' : 'Evaluate Answer with AI'}
          </button>
        </div>
      </div>

      {/* Evaluation Results Card */}
      {evaluation && (
        <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--accent-emerald)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={24} /> AI Voice & Communication Diagnostic Breakdown
          </h3>

          {/* Sub-score Gauges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Communication', score: evaluation.communicationScore, color: '#6366f1' },
              { label: 'Confidence', score: evaluation.confidenceScore, color: '#06b6d4' },
              { label: 'Fluency', score: evaluation.fluencyScore, color: '#10b981' },
              { label: 'Professionalism', score: evaluation.professionalismScore, color: '#f59e0b' }
            ].map((sc, idx) => (
              <div key={idx} style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0,0,0,0.3)',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sc.label}</span>
                <h4 style={{ fontSize: '1.8rem', fontWeight: '800', color: sc.color, margin: '4px 0' }}>{sc.score}%</h4>
              </div>
            ))}
          </div>

          {/* AI Feedback */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>AI Feedback Summary:</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {evaluation.feedback}
            </p>
          </div>

          {/* Suggested Revised Answer */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid var(--accent-emerald)'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '6px' }}>
              ✨ Recommended Revised Answer:
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{evaluation.improvedAnswer}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
