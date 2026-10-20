import React, { useState, useEffect } from 'react';
import {
  X, Heart, Share2, Calendar, MessageCircle, ShieldCheck,
  Award, CheckCircle2, ChevronRight, FileText, Download, Sparkles, Scale
} from 'lucide-react';
import { CURRENCIES } from '../data/horsesData';
import AnimatedCounter from './AnimatedCounter';

function SuitabilityBarItem({ label, score, index }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 40 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div style={{ background: 'var(--color-cream)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', fontWeight: '600' }}>
        <span>{label}</span>
        <strong style={{ color: 'var(--color-gold-hover)', fontVariantNumeric: 'tabular-nums' }}>
          {animated ? <AnimatedCounter end={score} suffix="%" duration={900} immediate={true} /> : '0%'}
        </strong>
      </div>
      <div style={{ width: '100%', height: '7px', background: '#e0ded8', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            width: animated ? `${score}%` : '0%',
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-obsidian) 0%, #353956 100%)',
            borderRadius: '4px',
            transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  );
}

export default function HorseDetailModal({
  horse,
  onClose,
  currency = 'EUR',
  isSaved,
  onToggleSave,
  onBookTrialRide,
  onInquireConcierge
}) {
  if (!horse) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pedigree' | 'vetting' | 'records'
  const [copiedLink, setCopiedLink] = useState(false);

  const images = horse.images && horse.images.length > 0
    ? horse.images
    : ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80"];

  const formatPrice = () => {
    if (horse.priceType === 'demand' || !horse.priceEur) {
      return "On demand";
    }
    const curr = CURRENCIES[currency] || CURRENCIES.EUR;
    const converted = Math.round(horse.priceEur * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close dossier">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="modal-header-hero">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-exclusive" style={{ background: 'var(--color-obsidian)' }}>
                {horse.discipline}
              </span>
              {horse.motivated && (
                <span className="badge badge-motivated">MOTIVATED SELLER</span>
              )}
              <span className="badge badge-verified">
                <ShieldCheck size={12} />
                VERIFIED VET DOSSIER
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-sm btn-outline"
                onClick={handleShare}
                style={{ padding: '6px 14px' }}
              >
                <Share2 size={14} />
                <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
              </button>
              <button
                className={`btn btn-sm ${isSaved ? 'btn-rose' : 'btn-outline'}`}
                onClick={() => onToggleSave(horse.id)}
                style={{ padding: '6px 14px' }}
              >
                <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: '700', lineHeight: 1.1, margin: 0 }}>
                {horse.name} {horse.nickname && <span style={{ fontSize: '1.8rem', fontWeight: '400', color: 'var(--color-slate)' }}>"{horse.nickname}"</span>}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-slate)', marginTop: '4px' }}>
                {horse.flag} <strong>{horse.location}</strong> · {horse.breed} · {horse.age} Years Old · {horse.height}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', display: 'block' }}>
                Asking Price
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: '700', color: 'var(--color-obsidian)', lineHeight: 1 }}>
                {formatPrice()}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-padding">
          {/* High-Res Gallery */}
          <div className="dossier-gallery-grid">
            <img
              src={images[activeImgIndex]}
              alt={horse.name}
              className="dossier-main-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="dossier-thumbs-col">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`dossier-thumb-img ${idx === activeImgIndex ? 'active' : ''}`}
                  onClick={() => setActiveImgIndex(idx)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Action Bar */}
          <div style={{
            background: 'var(--color-cream)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block' }}>Concierge Trial & Vetting Support</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-slate)' }}>Schedule European trial ride or request independent second veterinary opinion</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onBookTrialRide(horse)}
              >
                <Calendar size={15} />
                <span>Book Trial Ride</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onInquireConcierge(horse)}
              >
                <MessageCircle size={15} />
                <span>Inquire with Scout</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '24px' }}>
            {[
              { id: 'overview', label: 'Overview & Temperament' },
              { id: 'pedigree', label: 'Pedigree & Bloodline' },
              { id: 'vetting', label: 'Veterinary Dossier & X-Rays' },
              { id: 'records', label: 'Competition History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--color-obsidian)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--color-slate)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '8px 18px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--color-slate)', marginBottom: '28px' }}>
                {horse.description}
              </p>

              {/* Suitability Radars */}
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Rider Suitability & Evaluation
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Amateur Safe & Rideability', score: horse.suitability.amateurSafe },
                  { label: 'Scope & Athleticism', score: horse.suitability.scope },
                  { label: 'Trainability & Rhythm', score: horse.suitability.rideability },
                  { label: 'Bravery & Ring Presence', score: horse.suitability.bravery }
                ].map((item, idx) => (
                  <SuitabilityBarItem
                    key={idx}
                    index={idx}
                    label={item.label}
                    score={item.score}
                  />
                ))}
              </div>

              {/* Full Specs Table */}
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Vital Specifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { label: 'Breed / Studbook', val: horse.breed },
                  { label: 'Year of Birth', val: `${horse.dob} (${horse.age} Years)` },
                  { label: 'Gender', val: horse.gender },
                  { label: 'Height', val: horse.height },
                  { label: 'Color Coat', val: horse.color },
                  { label: 'Level', val: horse.level },
                  { label: 'Microchip ID', val: horse.veterinary.microchip },
                  { label: 'Stable Base', val: horse.location }
                ].map((spec, idx) => (
                  <div key={idx} style={{ padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-muted)', display: 'block' }}>
                      {spec.label}
                    </span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-obsidian)', marginTop: '2px', display: 'block' }}>
                      {spec.val}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PEDIGREE */}
          {activeTab === 'pedigree' && (
            <div className="pedigree-tree-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Award size={18} color="var(--color-gold-hover)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', margin: 0 }}>
                  Three-Generation Pedigree Tree
                </h4>
              </div>

              <div className="pedigree-grid">
                {/* Generation 1: Sire & Dam */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div className="pedigree-node highlight">
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Sire</span>
                    <strong style={{ display: 'block', fontSize: '1rem', marginTop: '2px' }}>{horse.pedigree.sire}</strong>
                  </div>
                  <div className="pedigree-node highlight">
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Dam</span>
                    <strong style={{ display: 'block', fontSize: '1rem', marginTop: '2px' }}>{horse.pedigree.dam}</strong>
                  </div>
                </div>

                {/* Generation 2: Grandparents */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="pedigree-node">
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Sire's Sire</span>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{horse.pedigree.sireSire}</div>
                  </div>
                  <div className="pedigree-node">
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Sire's Dam</span>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{horse.pedigree.sireDam}</div>
                  </div>
                  <div className="pedigree-node">
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Dam's Sire</span>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{horse.pedigree.damSire}</div>
                  </div>
                  <div className="pedigree-node">
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Dam's Dam</span>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{horse.pedigree.damDam}</div>
                  </div>
                </div>

                {/* Pedigree Summary */}
                <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span className="badge badge-featured" style={{ marginBottom: '8px' }}>
                    Elite Maternal Line
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-slate)', lineHeight: 1.5, margin: 0 }}>
                    Combines modern reflex speed with top European championship bloodlines. Consistently passes down scope, athletic longevity, and calm trainability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VETTING */}
          {activeTab === 'vetting' && (
            <div className="vet-checklist-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={22} color="var(--color-success)" />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>
                    Pre-Purchase Examination (PPE) Dossier
                  </h4>
                </div>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => alert(`Veterinary Dossier for ${horse.name} downloaded (Simulation: 28 X-rays & Clinic Report).`)}
                  style={{ gap: '6px' }}
                >
                  <Download size={14} />
                  <span>Download Vet PDF</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { title: "Radiograph Assessment", desc: horse.veterinary.xraysStatus, sub: `Exam Date: ${horse.veterinary.xraysDate}` },
                  { title: "Clinical Inspection", desc: horse.veterinary.clinicalExam, sub: "Heart, lungs, eyes, joint flexions negative" },
                  { title: "Airway Scope (Endoscopy)", desc: horse.veterinary.cleanEndoscopy, sub: "Full resting & dynamic airway clearance" },
                  { title: "Stable Manners & Vices", desc: horse.veterinary.vices, sub: "No cribbing, no weaving, sound in stall" }
                ].map((v, i) => (
                  <div key={i} style={{ background: '#ffffff', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #d4ebdd' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle2 size={16} color="var(--color-success)" />
                      <strong style={{ fontSize: '0.9rem' }}>{v.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-slate)', margin: '0 0 4px 0' }}>{v.desc}</p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>{v.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COMPETITION RECORDS */}
          {activeTab === 'records' && (
            <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '16px' }}>
                Verified Competition Placings & Show Records
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {horse.competitionRecords.map((rec, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'var(--color-cream)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div>
                      <span className="badge badge-featured" style={{ fontSize: '0.65rem', padding: '2px 8px', marginBottom: '4px' }}>
                        {rec.year}
                      </span>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-obsidian)' }}>
                        {rec.event}
                      </strong>
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-gold-hover)' }}>
                      {rec.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
