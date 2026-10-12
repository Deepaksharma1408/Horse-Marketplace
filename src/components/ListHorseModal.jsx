import React, { useState } from 'react';
import { X, Upload, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { DISCIPLINES, GENDERS, BREED_OPTIONS } from '../data/horsesData';

export default function ListHorseModal({ onClose, onHorseAdded }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    discipline: 'Show Jumping',
    breed: 'Zangersheide',
    gender: 'Gelding',
    age: 6,
    heightCm: 168,
    color: 'Bay',
    location: '',
    country: 'Belgium',
    priceEur: 65000,
    priceType: 'range',
    sire: '',
    dam: '',
    damSire: '',
    level: '1.30m - 1.35m',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
    hasXrays: true,
    cleanVetting: true
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHorse = {
      id: `horse-${Date.now()}`,
      name: formData.name || 'Unnamed Sport Horse',
      nickname: formData.nickname || '',
      discipline: formData.discipline,
      collection: 'marketplace',
      age: Number(formData.age) || 6,
      dob: String(2026 - (Number(formData.age) || 6)),
      gender: formData.gender,
      height: `${formData.heightCm} cm`,
      heightCm: Number(formData.heightCm) || 168,
      breed: formData.breed,
      color: formData.color,
      location: formData.location || `${formData.country}`,
      country: formData.country,
      flag: formData.country === 'Croatia' ? '🇭🇷' : formData.country === 'Belgium' ? '🇧🇪' : formData.country === 'Germany' ? '🇩🇪' : formData.country === 'France' ? '🇫🇷' : '🇳🇱',
      mapCoords: { x: 45, y: 45 },
      priceEur: Number(formData.priceEur) || 50000,
      priceDisplay: `${Math.round(formData.priceEur / 1000)}k €`,
      priceType: 'fixed',
      status: 'OPEN',
      badge: 'NEW LISTING',
      motivated: false,
      level: formData.level,
      levelCategory: 'amateur',
      pedigree: {
        sire: formData.sire || 'Top European Sire',
        dam: formData.dam || 'Championship Dam',
        sireSire: 'Grand Prix Sire',
        sireDam: 'Elite Dam',
        damSire: formData.damSire || 'Heartbreaker line',
        damDam: 'Proven Mother'
      },
      images: [
        formData.imageUrl,
        "https://images.unsplash.com/photo-1598974357801-cbca100e6571?auto=format&fit=crop&w=1200&q=80"
      ],
      description: formData.description || 'Recently listed sport horse with verified pedigree and radiographs on file.',
      veterinary: {
        xraysDate: 'Recent 2024/2026',
        xraysStatus: 'Full digital set verified by certified equine vet',
        clinicalExam: 'Passed 14-point physical exam',
        cleanEndoscopy: 'Grade 1',
        microchip: `276098${Math.floor(Math.random() * 899999 + 100000)}`,
        vices: 'None reported'
      },
      suitability: {
        amateurSafe: 92,
        scope: 94,
        rideability: 95,
        bravery: 93
      },
      competitionRecords: [
        { year: '2024', event: 'National Circuit', result: 'Clear Rounds' }
      ]
    };

    onHorseAdded(newHorse);
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-hero" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff' }}>
              <Sparkles size={13} />
              Seller Portal
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              Reach Pre-Qualified Buyers Globally
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginTop: '6px' }}>
            List Your Sport Horse on Equivalia
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-slate)' }}>
            Free listing · Direct connection with buyers · Standardized veterinary dossier protection
          </p>
        </div>

        <div className="modal-body-padding" style={{ paddingTop: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                Listing Published Successfully!
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-slate)', maxWidth: '480px', margin: '8px auto 24px' }}>
                Your horse <strong>{formData.name}</strong> is now live on our marketplace catalog. Our concierge scouting team will also cross-reference active buyer requests.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                View in Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Stepper indicators */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                {[
                  { n: 1, label: 'Identity' },
                  { n: 2, label: 'Pedigree' },
                  { n: 3, label: 'Media & Vet' },
                  { n: 4, label: 'Pricing' }
                ].map((s) => (
                  <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: step >= s.n ? 1 : 0.4 }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: step === s.n ? 'var(--color-obsidian)' : step > s.n ? 'var(--color-gold)' : 'var(--color-sand)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: '700'
                    }}>
                      {s.n}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-obsidian)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Horse Name *</label>
                      <input
                        type="text"
                        required
                        className="filter-select-styled"
                        placeholder="e.g. Diarado's Boy"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Barn Nickname</label>
                      <input
                        type="text"
                        className="filter-select-styled"
                        placeholder="e.g. Danny"
                        value={formData.nickname}
                        onChange={(e) => handleChange('nickname', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Discipline *</label>
                      <select
                        className="filter-select-styled"
                        value={formData.discipline}
                        onChange={(e) => handleChange('discipline', e.target.value)}
                      >
                        {DISCIPLINES.filter(d => d !== 'All Disciplines').map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Breed / Studbook *</label>
                      <select
                        className="filter-select-styled"
                        value={formData.breed}
                        onChange={(e) => handleChange('breed', e.target.value)}
                      >
                        {BREED_OPTIONS.filter(b => b !== 'All Studbooks').map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Gender *</label>
                      <select
                        className="filter-select-styled"
                        value={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                      >
                        {GENDERS.filter(g => g !== 'All Genders').map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Age (Years)</label>
                      <input
                        type="number"
                        min="3"
                        max="18"
                        className="filter-select-styled"
                        value={formData.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Height (cm)</label>
                      <input
                        type="number"
                        min="140"
                        max="190"
                        className="filter-select-styled"
                        value={formData.heightCm}
                        onChange={(e) => handleChange('heightCm', e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Coat Color</label>
                      <input
                        type="text"
                        className="filter-select-styled"
                        value={formData.color}
                        onChange={(e) => handleChange('color', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PEDIGREE */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Sire (Father) *</label>
                    <input
                      type="text"
                      className="filter-select-styled"
                      placeholder="e.g. Cornet Obolensky, Chacco-Blue, Diamant de Semilly"
                      value={formData.sire}
                      onChange={(e) => handleChange('sire', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Dam (Mother)</label>
                      <input
                        type="text"
                        className="filter-select-styled"
                        placeholder="e.g. Carthina Z"
                        value={formData.dam}
                        onChange={(e) => handleChange('dam', e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Dam's Sire (Maternal Grandfather)</label>
                      <input
                        type="text"
                        className="filter-select-styled"
                        placeholder="e.g. Baloubet du Rouet, Heartbreaker"
                        value={formData.damSire}
                        onChange={(e) => handleChange('damSire', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Current Performance Level</label>
                    <input
                      type="text"
                      className="filter-select-styled"
                      placeholder="e.g. 1.35m CSI2* or Prix St. Georges"
                      value={formData.level}
                      onChange={(e) => handleChange('level', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA & VETTING */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Primary Photo URL</label>
                    <input
                      type="url"
                      className="filter-select-styled"
                      value={formData.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                    />
                    <div style={{ marginTop: '10px', height: '140px', borderRadius: '8px', overflow: 'hidden', background: '#eae6df' }}>
                      <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-cream)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <ShieldCheck size={18} color="var(--color-success)" />
                      <strong style={{ fontSize: '0.9rem' }}>Veterinary Standard Check</strong>
                    </div>

                    <label className="filter-checkbox-row" style={{ marginTop: '6px' }}>
                      <input
                        type="checkbox"
                        checked={formData.hasXrays}
                        onChange={(e) => handleChange('hasXrays', e.target.checked)}
                        style={{ accentColor: 'var(--color-success)' }}
                      />
                      <span>Digital X-Rays taken within the last 12 months available upon request</span>
                    </label>

                    <label className="filter-checkbox-row" style={{ marginTop: '8px' }}>
                      <input
                        type="checkbox"
                        checked={formData.cleanVetting}
                        onChange={(e) => handleChange('cleanVetting', e.target.checked)}
                        style={{ accentColor: 'var(--color-success)' }}
                      />
                      <span>Horse is sound and free of stable vices (no cribbing, no weaving)</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Description & Temperament</label>
                    <textarea
                      rows={3}
                      className="filter-select-styled"
                      placeholder="Describe horse's temperament, jumping style, rideability, and suitability..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: PRICING & LOCATION */}
              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Asking Price (EUR €)</label>
                      <input
                        type="number"
                        step="5000"
                        className="filter-select-styled"
                        value={formData.priceEur}
                        onChange={(e) => handleChange('priceEur', e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px' }}>Stable Location (City/Country)</label>
                      <input
                        type="text"
                        required
                        className="filter-select-styled"
                        placeholder="e.g. Lanaken, Belgium"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-gold-light)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid #ebd7bf' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#7a5a29', display: 'block', marginBottom: '4px' }}>
                      Equivalia Seller Advantage
                    </strong>
                    <p style={{ fontSize: '0.82rem', color: '#685028', margin: 0 }}>
                      No listing fees. Sellers only pay a low standard commission upon successful sale. Your horse will be marketed to verified international buyers and VIP syndicate scouts.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                {step > 1 ? (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStep(step + 1)}
                  >
                    <span>Next Step</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-gold"
                  >
                    <CheckCircle2 size={16} />
                    <span>Publish Horse Listing</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
