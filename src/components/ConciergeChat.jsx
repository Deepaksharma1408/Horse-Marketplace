import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Check, Phone } from 'lucide-react';

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'concierge',
      text: "Hello! I'm Pierre from the Equivalia European scouting desk. Looking for a specific sport horse or planning a European trial tour?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: 'user', text: inputText, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Automated smart concierge response simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: "Thank you for the details. I am cross-referencing our active catalog and the 3,200+ private network listings in Lanaken, Warendorf, and Zagreb. What is your preferred budget range or timeframe for a trial ride?",
          time: 'Just now'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="concierge-float-widget">
      {isOpen ? (
        <div className="concierge-chat-window">
          {/* Header */}
          <div style={{
            background: 'var(--color-obsidian)',
            color: '#ffffff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.85rem'
              }}>
                EQ
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>Equivalia Concierge</strong>
                <span style={{ fontSize: '0.72rem', color: '#a2a7be', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2dd4bf' }} />
                  Senior Scout Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--color-obsidian)' : 'var(--color-cream)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--color-obsidian)',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  borderTopRightRadius: m.sender === 'user' ? '4px' : '16px',
                  borderTopLeftRadius: m.sender === 'concierge' ? '4px' : '16px',
                  fontSize: '0.86rem',
                  lineHeight: '1.45',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input field */}
          <form onSubmit={handleSend} style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px', background: '#ffffff' }}>
            <input
              type="text"
              placeholder="Ask about horses, vetting, or scouting..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 14px',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--color-gold)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--color-obsidian)',
            color: '#ffffff',
            border: '2px solid var(--color-gold)',
            borderRadius: 'var(--radius-pill)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-float)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.88rem',
            fontWeight: '600'
          }}
        >
          <div style={{ position: 'relative' }}>
            <MessageSquare size={18} color="var(--color-gold)" />
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '7px', height: '7px', borderRadius: '50%', background: '#2dd4bf' }} />
          </div>
          <span>Talk to Scout</span>
        </button>
      )}
    </div>
  );
}
