import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Play, Scale } from 'lucide-react';
import { CURRENCIES } from '../data/horsesData';

export default function HorseCard({
  horse,
  index = 0,
  currency = 'EUR',
  isSaved = false,
  onToggleSave,
  isCompared = false,
  onToggleCompare,
  onSelectHorse
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isPopping, setIsPopping] = useState(false);

  const images = horse.images && horse.images.length > 0
    ? horse.images
    : ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80"];

  const handleToggleHeart = (e) => {
    e.stopPropagation();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 500);
    onToggleSave(horse.id);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Format currency conversion
  const formatPrice = () => {
    if (horse.priceType === 'demand' || !horse.priceEur) {
      return "On demand";
    }
    const curr = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = Math.round(horse.priceEur * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  return (
    <div
      className="horse-card"
      style={{ animationDelay: `${Math.min(index * 55, 450)}ms` }}
    >
      {/* Media & Carousel Wrapper */}
      <div className="card-media-wrapper" onClick={() => onSelectHorse(horse)}>
        <img
          src={images[currentImgIndex]}
          alt={horse.name}
          className="card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80";
          }}
        />

        {/* Top Overlay: Badges and Favorite Button */}
        <div className="card-overlay-top">
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {horse.motivated && (
              <span className="badge badge-motivated">
                MOTIVATED
              </span>
            )}
            {horse.badge && !horse.motivated && (
              <span className={`badge ${horse.badge === 'EXCLUSIVE' ? 'badge-exclusive' : 'badge-featured'}`}>
                {horse.badge}
              </span>
            )}
          </div>

          <button
            className={`card-save-btn ${isSaved ? 'saved' : ''} ${isPopping ? 'heart-pop' : ''}`}
            onClick={handleToggleHeart}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Carousel arrows if multiple images */}
        {images.length > 1 && (
          <>
            <button className="card-media-nav-btn card-media-nav-prev" onClick={handlePrevImg}>
              <ChevronLeft size={18} />
            </button>
            <button className="card-media-nav-btn card-media-nav-next" onClick={handleNextImg}>
              <ChevronRight size={18} />
            </button>

            {/* Media dots */}
            <div className="card-media-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`media-dot ${idx === currentImgIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Details */}
      <div className="card-content">
        {/* Discipline & Location */}
        <div className="card-discipline-row">
          <span className="card-discipline-tag">
            {horse.discipline}
          </span>
          <span className="card-location-tag">
            <span>{horse.flag}</span>
            <span>{horse.location.split(',')[1]?.trim() || horse.country}</span>
          </span>
        </div>

        {/* Horse Title */}
        <h3 className="card-horse-name" onClick={() => onSelectHorse(horse)}>
          {horse.name}
        </h3>

        {/* Pedigree callout */}
        <p className="card-sire-line">
          <strong>{horse.pedigree.sire}</strong> x {horse.pedigree.damSire}
        </p>

        {/* Specs Grid */}
        <div className="card-specs-row">
          <div className="card-spec-item">
            <span className="spec-title">Age</span>
            <span className="spec-val">{horse.age} YRS</span>
          </div>
          <div className="card-spec-item">
            <span className="spec-title">Gender</span>
            <span className="spec-val">{horse.gender.toUpperCase()}</span>
          </div>
          <div className="card-spec-item">
            <span className="spec-title">Height</span>
            <span className="spec-val">{horse.heightCm} cm</span>
          </div>
        </div>

        {/* Level badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.78rem' }}>
          <span style={{ color: 'var(--color-slate)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="var(--color-success)" />
            Grade 1 X-Rays
          </span>
          <span style={{ fontWeight: '600', color: 'var(--color-obsidian)' }}>
            {horse.level.split(' ')[0]} {horse.level.split(' ')[1] || ''}
          </span>
        </div>

        {/* Footer: Price & CTA */}
        <div className="card-footer-row">
          <div className="card-price-block">
            <span className="price-sub">Asking Price</span>
            <span className="price-main">{formatPrice()}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Compare toggle button */}
            <button
              onClick={() => onToggleCompare(horse.id)}
              style={{
                background: isCompared ? 'var(--color-obsidian)' : 'var(--color-cream)',
                color: isCompared ? '#ffffff' : 'var(--color-slate)',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              <Scale size={15} />
            </button>

            {/* View Horse Dossier */}
            <button
              className="card-view-btn"
              onClick={() => onSelectHorse(horse)}
            >
              <span>Dossier</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
