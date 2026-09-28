import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  Check,
  AlertCircle
} from 'lucide-react';
import { APTITUDE_QUESTIONS } from '../data/mockData';

export default function AptitudeModule() {
  const [stage, setStage] = useState('all'); // all | beginner | intermediate | advanced | mock
  const [category, setCategory] = useState('all'); // all | Quant | Logical | English

  // Filtered Questions
  const filteredQuestions = APTITUDE_QUESTIONS.filter(q => {
    const stageMatch = stage === 'all' || stage === 'mock' || q.stage === stage;
    const catMatch = category === 'all' || q.category === category;
    return stageMatch && catMatch;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionIndex
    });
  };

  const toggleReviewMark = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentIndex]: !markedForReview[currentIndex]
    });
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setTimeLeft(600);
  };

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Filter & Stage Selector */}
      <div className="glass-card" style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit color="var(--accent-emerald)" />
            <span>Aptitude Preparation Suite</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Practice stage-wise Quantitative, Logical, and English test sets.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Stage Dropdown */}
          <select 
            value={stage} 
            onChange={(e) => { setStage(e.target.value); handleRestart(); }}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all" style={{ background: '#111827' }}>All Stages</option>
            <option value="beginner" style={{ background: '#111827' }}>Stage 1: Beginner</option>
            <option value="intermediate" style={{ background: '#111827' }}>Stage 2: Intermediate</option>
            <option value="advanced" style={{ background: '#111827' }}>Stage 3: Advanced</option>
            <option value="mock" style={{ background: '#111827' }}>Full Mock Exam</option>
          </select>

          {/* Category Dropdown */}
          <select 
            value={category} 
            onChange={(e) => { setCategory(e.target.value); handleRestart(); }}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all" style={{ background: '#111827' }}>All Topics</option>
            <option value="Quant" style={{ background: '#111827' }}>Quantitative Aptitude</option>
            <option value="Logical" style={{ background: '#111827' }}>Logical Reasoning</option>
            <option value="English" style={{ background: '#111827' }}>Verbal English</option>
          </select>
        </div>
      </div>

      {/* Test Control Bar */}
      <div className="glass-card" style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>
            Question {currentIndex + 1} of {filteredQuestions.length}
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--accent-primary)',
            fontWeight: '600'
          }}>
            {currentQ?.category} &bull; {currentQ?.stage}
          </span>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: timeLeft < 120 ? 'var(--accent-rose)' : 'var(--accent-amber)',
            fontWeight: '700',
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.05)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>

          {!isSubmitted ? (
            <button onClick={() => setIsSubmitted(true)} className="btn-success" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
              Submit Exam
            </button>
          ) : (
            <button onClick={handleRestart} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
              <RotateCcw size={14} /> Retake Test
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Question Pane & Navigation Palette */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Question & Options Area */}
        <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', lineHeight: 1.5 }}>
              {currentQ?.question}
            </h3>
            <button
              onClick={toggleReviewMark}
              style={{
                background: markedForReview[currentIndex] ? 'rgba(245, 158, 11, 0.2)' : 'none',
                border: `1px solid ${markedForReview[currentIndex] ? 'var(--accent-amber)' : 'var(--border-color)'}`,
                color: markedForReview[currentIndex] ? 'var(--accent-amber)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px',
                cursor: 'pointer'
              }}
              title="Mark for Review"
            >
              <Bookmark size={16} />
            </button>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQ?.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const isCorrect = currentQ.correct === optIdx;
              let bg = 'rgba(255, 255, 255, 0.03)';
              let borderColor = 'var(--border-color)';

              if (isSubmitted) {
                if (isCorrect) {
                  bg = 'rgba(16, 185, 129, 0.15)';
                  borderColor = 'var(--accent-emerald)';
                } else if (isSelected && !isCorrect) {
                  bg = 'rgba(244, 63, 94, 0.15)';
                  borderColor = 'var(--accent-rose)';
                }
              } else if (isSelected) {
                bg = 'rgba(99, 102, 241, 0.15)';
                borderColor = 'var(--accent-primary)';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                  </span>
                  {isSubmitted && isCorrect && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle size={18} color="var(--accent-rose)" />}
                </div>
              );
            })}
          </div>

          {/* Detailed Solution Explanation (When Submitted) */}
          {isSubmitted && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid var(--accent-primary)',
              marginTop: '10px'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '6px' }}>
                💡 Step-by-Step Explanation
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {currentQ?.explanation}
              </p>
            </div>
          )}

          {/* Controls: Prev / Next */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="btn-secondary"
              style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(filteredQuestions.length - 1, currentIndex + 1))}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="btn-primary"
              style={{ opacity: currentIndex === filteredQuestions.length - 1 ? 0.5 : 1 }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Question Palette Grid */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Question Palette</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {filteredQuestions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isReview = markedForReview[idx];
              const isCurrent = currentIndex === idx;

              let bg = 'rgba(255, 255, 255, 0.05)';
              if (isReview) bg = 'var(--accent-amber)';
              else if (isAnswered) bg = 'var(--accent-emerald)';

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    background: bg,
                    border: isCurrent ? '2px solid white' : 'none',
                    color: isAnswered || isReview ? 'white' : 'var(--text-muted)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-emerald)' }} />
              <span>Answered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-amber)' }} />
              <span>Marked for Review</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)' }} />
              <span>Unanswered</span>
            </div>
          </div>

          {/* Result Score Banner when Submitted */}
          {isSubmitted && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-primary)',
              textAlign: 'center',
              color: 'white'
            }}>
              <Award size={28} style={{ margin: '0 auto 6px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Score: {calculateScore()} / {filteredQuestions.length}</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {calculateScore() / filteredQuestions.length >= 0.7 ? '🎉 Great Job! Aptitude Ready' : '💪 Keep Practicing'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
