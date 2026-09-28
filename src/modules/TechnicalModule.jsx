import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  RotateCcw,
  Check
} from 'lucide-react';
import { TECHNICAL_QUESTIONS } from '../data/mockData';

export default function TechnicalModule() {
  const [selectedTech, setSelectedTech] = useState('Java');
  const [selectedStage, setSelectedStage] = useState('Stage 1: Fundamentals');
  const [mode, setMode] = useState('coding'); // 'mcq' | 'coding'

  const activeQuestion = TECHNICAL_QUESTIONS.find(q => q.tech === selectedTech) || TECHNICAL_QUESTIONS[1];
  const [userCode, setUserCode] = useState(activeQuestion.initialCode || '');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMcqOption, setSelectedMcqOption] = useState(null);

  const handleTechChange = (tech) => {
    setSelectedTech(tech);
    const newQ = TECHNICAL_QUESTIONS.find(q => q.tech === tech) || TECHNICAL_QUESTIONS[0];
    setUserCode(newQ.initialCode || '');
    setTestResults(null);
    setSelectedMcqOption(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResults({
        passed: true,
        executionTime: '42 ms',
        memory: '14.2 MB',
        logs: [
          '✓ Test Case 1: Input nums = [2,7,11,15], target = 9 -> Output: [0, 1] (Passed)',
          '✓ Test Case 2: Input nums = [3,2,4], target = 6 -> Output: [1, 2] (Passed)'
        ]
      });
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Tech Selector */}
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
            <Code2 color="var(--accent-amber)" />
            <span>Technical Preparation & Live Compiler</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Practice Java, Python, C++, SQL, React, and Flutter with live test execution.
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {['Java', 'Python', 'C++', 'SQL', 'React', 'Flutter'].map(t => (
            <button
              key={t}
              onClick={() => handleTechChange(t)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                background: selectedTech === t ? 'var(--accent-amber)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedTech === t ? '#000000' : 'var(--text-muted)',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Selector & Mode Switch */}
      <div className="glass-card" style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Stage 1: Fundamentals', 'Stage 2: Intermediate', 'Stage 3: Advanced', 'Mock Technical'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: selectedStage === st ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: selectedStage === st ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: `1px solid ${selectedStage === st ? 'var(--accent-primary)' : 'transparent'}`,
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '2px' }}>
          <button
            onClick={() => setMode('coding')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'coding' ? 'var(--accent-primary)' : 'transparent',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            💻 Code Compiler
          </button>
          <button
            onClick={() => setMode('mcq')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'mcq' ? 'var(--accent-primary)' : 'transparent',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ❓ MCQs Mode
          </button>
        </div>
      </div>

      {/* Compiler View vs MCQ View */}
      {mode === 'coding' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Left Column: Problem Description */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-amber)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', width: 'fit-content' }}>
              {activeQuestion.tech} &bull; {selectedStage}
            </span>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              {activeQuestion.title || 'Technical Problem Challenge'}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {activeQuestion.problem || 'Write an efficient solution handling all test cases.'}
            </p>

            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '10px' }}>Example Test Cases:</h4>
            {activeQuestion.testCases?.map((tc, idx) => (
              <div key={idx} style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                fontFamily: 'Fira Code, monospace'
              }}>
                <p style={{ color: 'var(--text-muted)' }}>Input: {tc.input}</p>
                <p style={{ color: 'var(--accent-emerald)' }}>Expected: {tc.expected}</p>
              </div>
            ))}

            {/* AI Solution Explanation Box */}
            <div style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid var(--accent-primary)',
              marginTop: 'auto'
            }}>
              <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> AI Solution Key
              </h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {activeQuestion.solution || 'Optimize time complexity using Hash Table lookup.'}
              </p>
            </div>
          </div>

          {/* Right Column: Code Editor & Console Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Code Editor Window */}
            <div className="code-editor-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                padding: '10px 16px',
                background: '#161b22',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#8b949e', fontFamily: 'Fira Code, monospace' }}>
                  Solution.{selectedTech === 'Java' ? 'java' : selectedTech === 'Python' ? 'py' : 'cpp'}
                </span>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn-success"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <Play size={14} fill="white" /> {isRunning ? 'Running...' : 'Run Tests'}
                </button>
              </div>

              <textarea
                rows={12}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="code-textarea"
                spellCheck="false"
              />
            </div>

            {/* Terminal Console Output */}
            <div className="glass-card" style={{ padding: '16px', background: '#090d16', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={15} color="var(--accent-cyan)" />
                <span>Execution Console & Output Logs</span>
              </h4>

              {testResults ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', fontFamily: 'Fira Code, monospace' }}>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                    <span>STATUS: ALL TESTS PASSED ✓</span>
                    <span>TIME: {testResults.executionTime}</span>
                    <span>MEM: {testResults.memory}</span>
                  </div>
                  {testResults.logs.map((log, i) => (
                    <p key={i} style={{ color: '#8b949e', margin: 0 }}>{log}</p>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Click "Run Tests" to execute your solution against test suite.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* MCQ Practice Mode */
        <div className="glass-card" style={{ padding: '28px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
            {selectedTech} MCQs &bull; {selectedStage}
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '12px 0 20px 0' }}>
            {TECHNICAL_QUESTIONS[0].question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TECHNICAL_QUESTIONS[0].options.map((opt, i) => {
              const isSelected = selectedMcqOption === i;
              const isCorrect = TECHNICAL_QUESTIONS[0].correct === i;
              let bg = 'rgba(255,255,255,0.03)';
              let border = 'var(--border-color)';

              if (selectedMcqOption !== null) {
                if (isCorrect) { bg = 'rgba(16, 185, 129, 0.15)'; border = 'var(--accent-emerald)'; }
                else if (isSelected) { bg = 'rgba(244, 63, 94, 0.15)'; border = 'var(--accent-rose)'; }
              }

              return (
                <div
                  key={i}
                  onClick={() => setSelectedMcqOption(i)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: bg,
                    border: `1px solid ${border}`,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <strong>{String.fromCharCode(65 + i)}.</strong> {opt}
                </div>
              );
            })}
          </div>

          {selectedMcqOption !== null && (
            <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <strong>Explanation:</strong> {TECHNICAL_QUESTIONS[0].explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
