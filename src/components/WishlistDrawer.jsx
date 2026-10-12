import React from 'react';
import { X, Heart, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { CURRENCIES } from '../data/horsesData';

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedHorses,
  onRemoveSave,
  onSelectHorse,
  currency,
  onInquireAll
}) {
  if (!isOpen) return null;

  const formatPrice = (h) => {
    if (h.priceType === 'demand' || !h.priceEur) return "On demand";
    const curr = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = Math.round(h.priceEur * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose} style={{ padding: 0, justifyContent: 'flex-end' }}>
      <div className="slide-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="var(--color-rose)" fill="var(--color-rose)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: 0 }}>
              Saved Horses ({savedHorses.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-obsidian)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* List of saved horses */}
        <div className="drawer-content">
          {savedHorses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)' }}>
              <Heart size={36} style={{ strokeWidth: 1.5, margin: '0 auto 12px' }} />
              <p style={{ fontSize: '1rem' }}>No horses in your wishlist yet.</p>
              <span style={{ fontSize: '0.82rem', display: 'block', marginTop: '4px' }}>
                Tap the heart on any horse card to save horses for later review.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {savedHorses.map((h) => (
                <div
                  key={h.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-cream)',
                    position: 'relative'
                  }}
                >
                  <img
                    src={h.images[0]}
                    alt={h.name}
                    style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => { onClose(); onSelectHorse(h); }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-gold-hover)' }}>
                        {h.discipline}
                      </span>
                      <button
                        onClick={() => onRemoveSave(h.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h4
                      style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: '2px 0', cursor: 'pointer' }}
                      onClick={() => { onClose(); onSelectHorse(h); }}
                    >
                      {h.name}
                    </h4>

                    <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', display: 'block' }}>
                      {h.age} YRS · {h.gender} · {h.flag} {h.country}
                    </span>

                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-obsidian)', display: 'block', marginTop: '4px' }}>
                      {formatPrice(h)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedHorses.length > 0 && (
          <div className="drawer-footer">
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '8px' }}
              onClick={() => onInquireAll(savedHorses)}
            >
              <MessageCircle size={16} />
              <span>Inquire for All ({savedHorses.length}) Horses</span>
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center', display: 'block' }}>
              Our concierge scout will combine radiographs and details into a single portfolio.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
