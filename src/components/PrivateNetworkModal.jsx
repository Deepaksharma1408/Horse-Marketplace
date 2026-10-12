import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Shield, Sparkles, Send, Clock, UserCheck } from 'lucide-react';

export default function PrivateNetworkModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('€100,000 – €200,000');
  const [discipline, setDiscipline] = useState('Show Jumping');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ background: 'linear-gradient(135deg, #12131f 0%, #1c1d2e 100%)', color: '#ffffff', padding: '40px 36px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff' }}>
              <Lock size={12} />
              CONFIDENTIAL VAULT
            </span>
            <span style={{ fontSize: '0.82rem', color: '#b9bdd0' }}>
              3,200+ Unlisted Sport Horses
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', lineHeight: 1.15, margin: '4px 0 12px' }}>
            Access Our Private Off-Market Network
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#a2a7be', lineHeight: 1.5 }}>
            Many of Europe's most renowned Olympic stables and private syndicates keep their highest-potential horses off public websites to protect competition strategy and owner discretion.
          </p>
        </div>

        <div className="modal-body-padding" style={{ paddingTop: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
                VIP Access Request Received
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-slate)', maxWidth: '440px', margin: '8px auto 20px' }}>
                Our Senior Equestrian Scout will review your parameters and send a tailored private portfolio to <strong>{email}</strong> within 24 hours.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                Return to Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <Shield size={18} color="var(--color-gold)" />
                  <span>100% Confidentiality Guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <UserCheck size={18} color="var(--color-gold)" />
                  <span>Personal Equestrian Matchmaker</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <Clock size={18} color="var(--color-gold)" />
                  <span>Curated Dossiers within 24h</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <Sparkles size={18} color="var(--color-gold)" />
                  <span>Direct Video & Radiograph Links</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      className="filter-select-styled"
                      placeholder="e.g. Victoria Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      className="filter-select-styled"
                      placeholder="e.g. victoria@equine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Target Discipline</label>
                    <select
                      className="filter-select-styled"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                    >
                      <option value="Show Jumping">Show Jumping</option>
                      <option value="Dressage">Dressage</option>
                      <option value="Hunter">Hunter / Equitation</option>
                      <option value="Eventing">Eventing</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Estimated Budget</label>
                    <select
                      className="filter-select-styled"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="€50,000 – €100,000">€50,000 – €100,000</option>
                      <option value="€100,000 – €200,000">€100,000 – €200,000</option>
                      <option value="€200,000 – €400,000">€200,000 – €400,000</option>
                      <option value="€400,000+">€400,000+ (Grand Prix / Olympic)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  <Send size={16} />
                  <span>Request VIP Private Network Access</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
