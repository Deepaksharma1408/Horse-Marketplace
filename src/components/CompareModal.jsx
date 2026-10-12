import React from 'react';
import { X, Scale, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CURRENCIES } from '../data/horsesData';

export default function CompareModal({
  horses,
  comparedIds,
  onRemoveCompare,
  onClearCompare,
  onSelectHorse,
  currency,
  onClose
}) {
  const comparedHorses = horses.filter((h) => comparedIds.includes(h.id));

  const formatPrice = (h) => {
    if (h.priceType === 'demand' || !h.priceEur) return "On demand";
    const curr = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = Math.round(h.priceEur * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '1000px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-hero" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-gold)" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', margin: 0 }}>
                Compare Selected Sport Horses
              </h2>
            </div>

            {comparedHorses.length > 0 && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={onClearCompare}
                style={{ color: 'var(--color-rose-hover)' }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="modal-body-padding" style={{ paddingTop: '24px' }}>
          {comparedHorses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                No horses currently selected for comparison. Use the scale icon on any horse card to compare up to 3 horses.
              </p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '16px' }}>
                Browse Catalog
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px', borderBottom: '2px solid var(--color-border)', width: '22%' }}>Specification</th>
                    {comparedHorses.map((h) => (
                      <th key={h.id} style={{ padding: '12px', borderBottom: '2px solid var(--color-border)', width: `${78 / comparedHorses.length}%` }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => onRemoveCompare(h.id)}
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--color-muted)',
                              cursor: 'pointer'
                            }}
                            title="Remove from comparison"
                          >
                            <Trash2 size={16} />
                          </button>
                          <img
                            src={h.images[0]}
                            alt={h.name}
                            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                          />
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '4px 0' }}>{h.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{h.flag} {h.location}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Asking Price', render: (h) => <strong style={{ color: 'var(--color-obsidian)', fontSize: '1.1rem' }}>{formatPrice(h)}</strong> },
                    { label: 'Discipline', render: (h) => h.discipline },
                    { label: 'Level / Class', render: (h) => h.level },
                    { label: 'Age / DOB', render: (h) => `${h.age} Years (${h.dob})` },
                    { label: 'Gender', render: (h) => h.gender },
                    { label: 'Height', render: (h) => h.height },
                    { label: 'Breed / Studbook', render: (h) => h.breed },
                    { label: 'Sire x Dam', render: (h) => `${h.pedigree.sire} x ${h.pedigree.damSire}` },
                    { label: 'X-Rays & Vetting', render: (h) => (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--color-success)' }}>
                        <ShieldCheck size={14} /> Grade 1 on file
                      </span>
                    )},
                    { label: 'Amateur Suitability', render: (h) => `${h.suitability.amateurSafe}%` }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--color-cream)' : 'transparent', borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px', fontWeight: '600', fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--color-slate)' }}>
                        {row.label}
                      </td>
                      {comparedHorses.map((h) => (
                        <td key={h.id} style={{ padding: '12px', fontSize: '0.88rem' }}>
                          {row.render(h)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '16px 12px' }} />
                    {comparedHorses.map((h) => (
                      <td key={h.id} style={{ padding: '16px 12px' }}>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%' }}
                          onClick={() => {
                            onClose();
                            onSelectHorse(h);
                          }}
                        >
                          <span>Full Dossier</span>
                          <ArrowRight size={13} />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
