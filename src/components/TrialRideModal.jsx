import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Plane, Clock, ShieldCheck, Send } from 'lucide-react';

export default function TrialRideModal({ horse, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [riderName, setRiderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [trialDate, setTrialDate] = useState('2026-10-25');
  const [needTransfer, setNeedTransfer] = useState(true);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-hero" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-featured">
              <Calendar size={13} />
              Concierge Itinerary
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
              VIP Stable Visit
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginTop: '4px' }}>
            Schedule a Trial Ride: {horse?.name}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>
            Stable Location: <strong>{horse?.flag} {horse?.location}</strong>
          </p>
        </div>

        <div className="modal-body-padding" style={{ paddingTop: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
                Trial Itinerary Requested!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-slate)', maxWidth: '440px', margin: '8px auto 20px' }}>
                We have contacted the trainer at <strong>{horse?.location}</strong> for <strong>{trialDate}</strong>. Our European logistics coordinator will confirm the schedule and transfer details with <strong>{email}</strong> shortly.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Rider / Trainer Name *</label>
                    <input
                      type="text"
                      required
                      className="filter-select-styled"
                      placeholder="e.g. Charlotte Dujardin"
                      value={riderName}
                      onChange={(e) => setRiderName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      className="filter-select-styled"
                      placeholder="e.g. charlotte@equine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      className="filter-select-styled"
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Preferred Trial Date *</label>
                    <input
                      type="date"
                      required
                      className="filter-select-styled"
                      value={trialDate}
                      onChange={(e) => setTrialDate(e.target.value)}
                    />
                  </div>
                </div>

                <label className="filter-checkbox-row" style={{ background: 'var(--color-cream)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                  <input
                    type="checkbox"
                    checked={needTransfer}
                    onChange={(e) => setNeedTransfer(e.target.checked)}
                    style={{ accentColor: 'var(--color-gold)' }}
                  />
                  <span>Include airport pickup & European stable chauffeur assistance</span>
                </label>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Riding Experience / Specific Questions</label>
                  <textarea
                    rows={3}
                    className="filter-select-styled"
                    placeholder="Tell us about the rider (e.g. junior transition, amateur jumper, jumping height) or request to trial multiple horses on the same day..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                  <Send size={16} />
                  <span>Confirm Trial Ride Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
