import React from 'react';
import { Search, Sparkles, ShieldCheck, ArrowRight, Award, Compass, Play } from 'lucide-react';
import { DISCIPLINES } from '../data/horsesData';
import AnimatedCounter from './AnimatedCounter';

export default function Hero({
  searchTerm,
  setSearchTerm,
  selectedDiscipline,
  setSelectedDiscipline,
  onOpenPrivateNetwork,
  onOpenVideoAsk
}) {
  return (
    <section className="hero-section">
      <div className="site-container">
        {/* Eyebrow badge */}
        <div className="hero-badge-pill">
          <span className="badge badge-exclusive" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
            Curated 2026 Collection
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-slate)' }}>
            Transparent Vetting · Independent PPE · Concierge Logistics
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          The Global Marketplace for <em>Elite Sport Horses.</em>
        </h1>

        {/* Hero Subtitle */}
        <p className="hero-subtitle">
          Discover vetted show jumpers, dressage prodigies, and hunters from Europe's top breeding stations. Standardized radiographs, direct owner pricing, and bespoke trial tours.
        </p>

        {/* Floating Search Bar */}
        <div className="search-box-card">
          <div className="search-input-group">
            <Search size={20} color="var(--color-slate)" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search by horse name, sire (e.g. Emerald, Chacco-Blue), studbook or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-divider" />

          <select
            className="search-select-dropdown"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            className="btn btn-gold"
            onClick={() => {
              const el = document.getElementById('marketplace-listings');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Explore Catalog</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)' }}>
            Popular searches:
          </span>
          {["Show Jumping 1.40m+", "Amateur Friendly", "Zangersheide Youngster", "KWPN Dressage", "Selle Français"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag.split(' ')[0])}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 12px',
                fontSize: '0.75rem',
                color: 'var(--color-slate)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-obsidian)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-slate)'; }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="hero-stats-strip">
          <div className="hero-stat-card">
            <span className="stat-metric">
              <AnimatedCounter end={3200} suffix="+" />
            </span>
            <span className="stat-label">Private Network Horses</span>
            <span className="stat-sub">Unlisted premier sport horses</span>
          </div>

          <div className="hero-stat-card">
            <span className="stat-metric">
              <AnimatedCounter end={40} prefix="Up to " suffix="%" />
            </span>
            <span className="stat-label">Lower Commission</span>
            <span className="stat-sub">Transparent direct-from-seller deals</span>
          </div>

          <div className="hero-stat-card">
            <span className="stat-metric">
              <AnimatedCounter end={3} suffix="x" separator={false} />
            </span>
            <span className="stat-label">Faster Matchmaking</span>
            <span className="stat-sub">Concierge vetting & test rides</span>
          </div>

          <div className="hero-stat-card">
            <span className="stat-metric">
              <AnimatedCounter end={100} suffix="%" />
            </span>
            <span className="stat-label">Verified Radiographs</span>
            <span className="stat-sub">Standardized 24+ digital X-rays</span>
          </div>
        </div>
      </div>
    </section>
  );
}
