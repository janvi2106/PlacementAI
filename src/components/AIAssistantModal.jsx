import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Copy, Check, Lightbulb } from 'lucide-react';

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Hello Janvi! 👋 I am your PlacementAI Assistant. Ask me anything about resume writing, ATS optimization, technical interview questions, or HR prep tips!'
    }
  ]);

  const quickPrompts = [
    '✨ How to write a strong ATS Resume summary?',
    '🎯 Give 3 TCS Technical interview tips',
    '🎤 How to answer "Tell me about yourself"?',
    '💻 Explain Difference between Process & Thread'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    // Add user message
    const updatedHistory = [...chatHistory, { sender: 'user', text: query }];
    setChatHistory(updatedHistory);
    setInputMessage('');
    setIsTyping(true);

    // Simulate intelligent AI response
    setTimeout(() => {
      let aiReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('ats') || lower.includes('summary')) {
        aiReply = `💡 **ATS Resume Tip:**\n1. Use standard headings (Work Experience, Education, Skills).\n2. Include strong action verbs: "Architected", "Engineered", "Optimized".\n3. Match target keywords like Java, React, SQL, Microservices.\n\n*Sample Professional Summary:* "Results-driven Software Engineer with expertise in full-stack web applications and DSA. Proven track record in optimizing backend performance and building responsive UI interfaces."`;
      } else if (lower.includes('tcs') || lower.includes('technical')) {
        aiReply = `🏢 **TCS Placement Prep Focus:**\n1. **Aptitude:** Master Speed & Distance, Time & Work, and Syllogisms.\n2. **Pseudo-code:** Practice pointer loops and bitwise operations.\n3. **Coding:** Focus on HashMap count, String palindrome, and Array manipulation.\n\nBe prepared to explain your final year project architecture in detail!`;
      } else if (lower.includes('tell me about yourself') || lower.includes('hr')) {
        aiReply = `🎤 **Structure your response with the Present-Past-Future Formula:**\n1. **Present:** Your current degree, college, and core technical stack.\n2. **Past:** Key projects, internships, or competitive programming achievements.\n3. **Future:** Why you are eager to join this company and grow as a software engineer.`;
      } else {
        aiReply = `🚀 **Placement Insight:**\nFor optimal placement readiness, maintain a balance of 60% DSA/Technical problem solving, 20% ATS resume keyword matching, and 20% Mock HR communication practice. Practice daily test modules in PlacementAI!`;
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary animate-pulse-glow"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          borderRadius: '9999px',
          padding: '12px 20px',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5)',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Sparkles size={20} />
        <span>AI Copilot</span>
      </button>

      {/* Expandable Chat Modal */}
      {isOpen && (
        <div className="glass-card" style={{
          position: 'fixed',
          bottom: '84px',
          right: '24px',
          width: '380px',
          height: '520px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          border: '1px solid var(--accent-primary)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={22} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>Placement AI Assistant</h3>
                <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>Online &bull; Powered by Gemini AI</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'rgba(11, 15, 25, 0.7)'
          }}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '8px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}>
                {msg.sender === 'ai' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={16} color="white" />
                  </div>
                )}

                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: msg.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                  position: 'relative'
                }}>
                  {msg.text}

                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(msg.text, i)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px'
                      }}
                      title="Copy response"
                    >
                      {copiedIndex === i ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <Bot size={16} /> AI is thinking...
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div style={{
            padding: '8px 12px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            background: 'rgba(0,0,0,0.2)',
            borderTop: '1px solid var(--border-color)'
          }}>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div style={{
            padding: '12px',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Ask AI placement copilot..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 12px',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              className="btn-primary"
              style={{ padding: '8px', borderRadius: 'var(--radius-md)' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
