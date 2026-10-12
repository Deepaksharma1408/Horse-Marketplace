import React, { useState } from 'react';
import { Search, PlusCircle, ArrowRight, Clock, MapPin, CheckCircle2, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { CLIENT_SEARCHES } from '../data/clientSearchesData';

export default function ClientSearchesView({ onOpenPostSearch, onSubmitMatch }) {
  const [filterDiscipline, setFilterDiscipline] = useState('All');
  const [activeSearches, setActiveSearches] = useState(CLIENT_SEARCHES);

  const filtered = activeSearches.filter(
    (s) => filterDiscipline === 'All' || s.discipline === filterDiscipline
  );

  return (
    <section className="client-searches-section">
      <div className="site-container">
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #181926 0%, #10111a 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 40px',
          color: '#ffffff',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff' }}>
                <Sparkles size={13} />
                Verified Buyer Demands
              </span>
              <span style={{ fontSize: '0.85rem', color: '#c3c7d9' }}>
                Global Concierge Scouting Board
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.15, marginBottom: '16px' }}>
              Connect Directly with <em>Active Pre-Approved Buyers.</em>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#a2a7be', lineHeight: 1.6, marginBottom: '28px' }}>
              Browse live acquisition briefs from Olympic trainers, adult amateurs, and international equestrian syndicates. Have a horse that meets their criteria? Submit it directly for immediate review.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold"
                onClick={onOpenPostSearch}
              >
                <PlusCircle size={16} />
                <span>Post a Buyer Search</span>
              </button>
              <button
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff' }}
                onClick={() => alert("Scout matchmaking team will contact you within 24 hours.")}
              >
                <span>Speak with Head Scout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {['All', 'Show Jumping', 'Dressage', 'Hunter', 'Eventing'].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDiscipline(d)}
                style={{
                  background: filterDiscipline === d ? 'var(--color-obsidian)' : 'var(--color-cream)',
                  color: filterDiscipline === d ? '#ffffff' : 'var(--color-slate)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '8px 18px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {d}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
            Showing <strong>{filtered.length}</strong> active buyer searches
          </div>
        </div>

        {/* Searches Grid */}
        <div className="searches-grid">
          {filtered.map((item) => (
            <div key={item.id} className="search-item-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-featured">
                  {item.discipline}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  {item.postedDate}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', lineHeight: 1.25, margin: '4px 0 8px' }}>
                {item.title}
              </h3>

              <div style={{ fontSize: '0.82rem', color: 'var(--color-slate)', marginBottom: '14px' }}>
                <strong>Client:</strong> {item.clientType} · {item.locationTarget}
              </div>

              {/* Budget highlight */}
              <div style={{ background: 'var(--color-cream)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--color-muted)', display: 'block' }}>
                  Allocated Budget
                </span>
                <div className="search-budget-highlight">
                  {item.budgetRange}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-slate)' }}>
                  Age: {item.ageRange} · Height: {item.heightRange} · {item.gender}
                </div>
              </div>

              <p className="search-req-text">
                "{item.requirements}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-sand)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  {item.matchCount} candidate horses submitted
                </span>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onSubmitMatch(item)}
                >
                  <span>Submit Horse</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
