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

          {/* Animated Equestrian Flight & Transport Route Corridors */}
          <path
            d="M 38 44 Q 44 38, 48 35"
            className="map-route-line"
            fill="none"
          />
          <path
            d="M 38 44 Q 52 52, 62 64"
            className="map-route-line"
            fill="none"
          />
          <path
            d="M 38 44 Q 34 47, 30 52"
            className="map-route-line"
            fill="none"
          />
          <path
            d="M 48 35 Q 56 48, 62 64"
            className="map-route-line-accent"
            fill="none"
          />
          <path
            d="M 30 52 Q 44 58, 62 64"
            className="map-route-line"
            fill="none"
          />
        </svg>

        {/* Stable Map Pins with Dual-Wave Sonar Radar */}
        {horses
          .filter((h) => selectedRegion === 'all' || h.country === selectedRegion)
          .map((horse) => {
            const coords = horse.mapCoords || { x: 50, y: 50 };
            const isSelected = activePinHorse?.id === horse.id;

            return (
              <div
                key={horse.id}
                className={`stable-pin-marker ${isSelected ? 'active' : ''}`}
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`
                }}
                onClick={() => setActivePinHorse(horse)}
                onMouseEnter={() => setActivePinHorse(horse)}
              >
                <div className="pin-radar-container">
                  <div className="pin-pulse" />
                </div>
                <span
                  style={{
                    position: 'absolute',
                    top: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    background: isSelected ? 'var(--color-rose)' : 'rgba(18, 19, 28, 0.88)',
                    color: '#ffffff',
                    padding: '3px 9px',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease'
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
