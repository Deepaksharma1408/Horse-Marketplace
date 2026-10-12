import React, { useState } from 'react';
import { MapPin, X, ArrowRight, ShieldCheck, Sparkles, Navigation } from 'lucide-react';

export default function HorseMap({
  horses,
  onSelectHorse,
  currency,
  onCloseMap
}) {
  const [activePinHorse, setActivePinHorse] = useState(horses[0] || null);
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <div className="interactive-map-container">
      {/* Map Header */}
      <div className="map-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff' }}>
              <Sparkles size={12} />
              Geographic Stable Directory
            </span>
            <span style={{ fontSize: '0.85rem', color: '#9da2b8' }}>
              European & Global Training Facilities
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '600' }}>
            Explore Sport Horses by Stable Location
          </h2>
        </div>

        {/* Region Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Stables' },
            { id: 'Croatia', label: '🇭🇷 Adriatic (Zagreb/Split)' },
            { id: 'Belgium', label: '🇧🇪 Belgium (Lanaken/Lier)' },
            { id: 'Germany', label: '🇩🇪 Germany (Warendorf)' },
            { id: 'Netherlands', label: '🇳🇱 Netherlands' },
            { id: 'France', label: '🇫🇷 France (Normandy)' }
          ].map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              style={{
                background: selectedRegion === region.id ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.08)',
                color: selectedRegion === region.id ? '#ffffff' : '#c3c7d9',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas Viewport */}
      <div className="map-viewport">
        {/* SVG stylized map outline */}
        <svg className="map-svg-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Subtle grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Stylized European coastline geometry path */}
          <path
            d="M 15 25 Q 22 18, 32 20 T 45 28 T 60 22 T 75 35 T 85 45 T 78 68 T 62 78 T 48 85 T 32 78 T 20 62 Z"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(200, 169, 126, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Major equestrian route connectors */}
          <line x1="38" y1="44" x2="48" y2="35" stroke="rgba(200, 169, 126, 0.25)" strokeWidth="0.6" strokeDasharray="1 1" />
          <line x1="38" y1="44" x2="62" y2="64" stroke="rgba(200, 169, 126, 0.25)" strokeWidth="0.6" strokeDasharray="1 1" />
          <line x1="42" y1="39" x2="30" y2="52" stroke="rgba(200, 169, 126, 0.25)" strokeWidth="0.6" strokeDasharray="1 1" />
        </svg>

        {/* Stable Map Pins */}
        {horses
          .filter((h) => selectedRegion === 'all' || h.country === selectedRegion)
          .map((horse) => {
            const coords = horse.mapCoords || { x: 50, y: 50 };
            const isSelected = activePinHorse?.id === horse.id;

            return (
              <div
                key={horse.id}
                className="stable-pin-marker"
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`
                }}
                onClick={() => setActivePinHorse(horse)}
                onMouseEnter={() => setActivePinHorse(horse)}
              >
                <div
                  className="pin-pulse"
                  style={{
                    backgroundColor: isSelected ? 'var(--color-rose)' : 'var(--color-gold)',
                    transform: isSelected ? 'scale(1.4)' : 'scale(1)'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    background: 'rgba(18, 19, 28, 0.85)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {horse.flag} {horse.name}
                </span>
              </div>
            );
          })}

        {/* Hover / Active Pin Card Popup */}
        {activePinHorse && (
          <div className="map-horse-popup-card">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
              <img
                src={activePinHorse.images[0]}
                alt={activePinHorse.name}
                style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-gold-hover)' }}>
                  {activePinHorse.discipline}
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '2px 0', lineHeight: 1.1 }}>
                  {activePinHorse.name}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  {activePinHorse.flag} {activePinHorse.location}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-muted)', display: 'block' }}>
                  Asking Price
                </span>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
                  {activePinHorse.priceDisplay}
                </strong>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => onSelectHorse(activePinHorse)}
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                <span>View Dossier</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
