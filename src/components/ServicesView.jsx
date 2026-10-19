import React from 'react';
import { ShieldCheck, Compass, Lock, Truck, CheckCircle2, Award, Sparkles, ArrowRight, Star } from 'lucide-react';
import { SERVICES, TESTIMONIALS, TRUST_STATS } from '../data/testimonialsData';

export default function ServicesView({ onOpenPrivateNetwork, onOpenListHorse }) {
  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="site-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <Sparkles size={14} />
            The EliteHorse Difference
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', lineHeight: 1.12, marginBottom: '20px' }}>
            Reinventing the Global Sport Horse Trade with <em>Total Transparency.</em>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-slate)', lineHeight: 1.6 }}>
            Traditional horse buying is plagued by opaque markups, undisclosed vet issues, and scattered videos. We provide end-to-end concierge support from scouting to post-sale delivery.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '80px' }}>
          {SERVICES.map((s, idx) => {
            const IconComponent = idx === 0 ? ShieldCheck : idx === 1 ? Compass : idx === 2 ? Lock : Truck;

            return (
              <div
                key={s.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-gold-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <IconComponent size={28} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', marginBottom: '12px', lineHeight: 1.2 }}>
                  {s.title}
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--color-slate)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {s.short}
                </p>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.5, marginTop: 'auto' }}>
                  {s.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics Stats Strip */}
        <div style={{
          background: 'var(--color-obsidian)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '60px 48px',
          marginBottom: '80px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff', marginBottom: '12px' }}>
              Proven Industry Results
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', lineHeight: 1.15 }}>
              Why Leading International Barns Rely on Our Platform
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
            {TRUST_STATS.map((stat, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--color-gold)', paddingLeft: '20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', fontWeight: '700', lineHeight: 1, color: '#ffffff' }}>
                  {stat.metric}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold)', marginTop: '8px' }}>
                  {stat.label}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#a2a7be', marginTop: '4px' }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonials Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              Wall of Trust
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>
              What Equestrians Say About EliteHorse
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                style={{
                  background: 'var(--color-cream)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                  <span className="badge badge-featured" style={{ marginLeft: 'auto', fontSize: '0.68rem' }}>
                    {t.tag}
                  </span>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--color-slate)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--color-sand)' }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: '700', margin: 0 }}>
                      {t.author}
                    </h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', display: 'block' }}>
                      {t.role} · {t.location}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: '600' }}>
                      {t.horsePurchased}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #f7f2eb 0%, #ece5db 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '56px 40px',
          textAlign: 'center',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', marginBottom: '12px' }}>
            Ready to Find Your Next Partner or List Your Horse?
          </h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-slate)', maxWidth: '600px', margin: '0 auto 28px' }}>
            Join thousands of riders, breeders, and international agents who trade sport horses with total transparency.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenPrivateNetwork}>
              <span>Unlock Private Network</span>
              <Sparkles size={16} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={onOpenListHorse}>
              <span>List a Horse (Free)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
