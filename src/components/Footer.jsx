import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onOpenPrivateNetwork, onOpenListHorse }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="site-container">
        {/* Top 4-Column Grid */}
        <div className="footer-top-grid">
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div className="brand-symbol" style={{ width: '36px', height: '36px' }}>
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                  <defs>
                    <linearGradient id="footerStallionGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBF0DE" />
                      <stop offset="45%" stopColor="#C8A97E" />
                      <stop offset="100%" stopColor="#916E3F" />
                    </linearGradient>
                  </defs>
                  <path d="M 28 8 C 29 6.5, 30.5 6, 31 7 C 31.5 8, 30.5 11, 29.5 12.5 C 33 13.5, 37 16.5, 39 20 C 40 22, 39 24, 37 25 C 34.5 26, 33 24, 30 25 C 28 25.5, 27 27.5, 26 31 C 25 35, 23 40, 20 42 C 17 40, 16 35, 17 29 C 18 22, 22 14, 28 8 Z" fill="url(#footerStallionGold)" />
                  <path d="M 23 16 C 19 20, 17 26, 17 32" stroke="url(#footerStallionGold)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M 26 12 C 22 17, 20 23, 20 28" stroke="url(#footerStallionGold)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <polygon points="14,14 15,16 17,16 15.5,17.5 16,19.5 14,18 12,19.5 12.5,17.5 11,16 13,16" fill="url(#footerStallionGold)" />
                </svg>
              </div>
              <span className="brand-name" style={{ color: '#ffffff', fontSize: '1.5rem' }}>EliteHorse</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#9da2b8', lineHeight: 1.6, maxWidth: '320px', marginBottom: '24px' }}>
              The international digital marketplace for vetted sport horses. Direct seller transparency, standardized radiographs, and VIP European scouting.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-gold btn-sm" onClick={onOpenPrivateNetwork}>
                VIP Network
              </button>
              <button className="btn btn-outline btn-sm" style={{ borderColor: '#35384e', color: '#ffffff' }} onClick={onOpenListHorse}>
                List a Horse
              </button>
            </div>
          </div>

          {/* Column 2: Marketplace */}
          <div>
            <h4 className="footer-col-title">Marketplace</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item" onClick={() => onNavigate('marketplace')}>All Sport Horses</li>
              <li className="footer-link-item" onClick={() => onNavigate('adriatic')}>Adriatic Collection</li>
              <li className="footer-link-item" onClick={() => onNavigate('marketplace')}>Show Jumpers (1.40m+)</li>
              <li className="footer-link-item" onClick={() => onNavigate('marketplace')}>Dressage Prospects</li>
              <li className="footer-link-item" onClick={() => onNavigate('marketplace')}>Amateur Friendly</li>
              <li className="footer-link-item" onClick={onOpenPrivateNetwork}>Private Network (3,200+)</li>
            </ul>
          </div>

          {/* Column 3: Services & Vetting */}
          <div>
            <h4 className="footer-col-title">Concierge</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item" onClick={() => onNavigate('services')}>Pre-Purchase Exam (PPE)</li>
              <li className="footer-link-item" onClick={() => onNavigate('services')}>Trial Itinerary Booking</li>
              <li className="footer-link-item" onClick={() => onNavigate('services')}>Escrow & Contracts</li>
              <li className="footer-link-item" onClick={() => onNavigate('services')}>Air Freight & Quarantine</li>
              <li className="footer-link-item" onClick={() => onNavigate('searches')}>Client Searches</li>
              <li className="footer-link-item" onClick={onOpenListHorse}>Become a Seller</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="footer-col-title">The Equine Insider</h4>
            <p style={{ fontSize: '0.85rem', color: '#9da2b8', lineHeight: 1.5, marginBottom: '16px' }}>
              Receive exclusive off-market listings, pedigree analysis, and European trial opportunities every Thursday.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2dd4bf', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#1d1f2e',
                    border: '1px solid #33364f',
                    borderRadius: 'var(--radius-pill)',
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--color-gold)',
                    border: 'none',
                    borderRadius: 'var(--radius-pill)',
                    padding: '8px 16px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom-row">
          <div>
            © 2026 EliteHorse Sport Horses Ltd. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Veterinary Disclaimer</span>
            <span style={{ cursor: 'pointer' }}>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
