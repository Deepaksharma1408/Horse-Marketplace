import React, { useState } from 'react';
import { Heart, Scale, PlusCircle, Search, Menu, X, Globe, Shield, Sparkles } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  selectedCurrency,
  setSelectedCurrency,
  wishlistCount,
  onOpenWishlist,
  compareCount,
  onOpenCompare,
  onOpenListHorse,
  onOpenPrivateNetwork
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setCurrentView(viewName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="site-navbar">
      <div className="site-container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('marketplace')}>
            <div className="brand-symbol">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 3L14 5l-2-2-4 3-3 7 2 3h4l2 5 3-1-1-6 3-2 3-7zm-4 4l-3-1 2-1 2 1-1 1z" />
              </svg>
            </div>
            <div>
              <span className="brand-name">EliteHorse</span>
              <span className="brand-sub">Sport Horse Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            <li
              className={`nav-link-item ${currentView === 'marketplace' ? 'active' : ''}`}
              onClick={() => handleNavClick('marketplace')}
            >
              Marketplace
            </li>
            <li
              className={`nav-link-item ${currentView === 'adriatic' ? 'active' : ''}`}
              onClick={() => handleNavClick('adriatic')}
            >
              Adriatic Collection
            </li>
            <li
              className={`nav-link-item ${currentView === 'searches' ? 'active' : ''}`}
              onClick={() => handleNavClick('searches')}
            >
              Client Searches
            </li>
            <li
              className={`nav-link-item ${currentView === 'services' ? 'active' : ''}`}
              onClick={() => handleNavClick('services')}
            >
              Services & Vetting
            </li>
            <li
              className="nav-link-item"
              onClick={() => onOpenPrivateNetwork()}
              style={{ color: 'var(--color-gold-hover)', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Sparkles size={14} />
              Private Network
            </li>
          </ul>

          {/* Right Action Tools */}
          <div className="nav-actions">
            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '4px 10px' }}>
              <Globe size={13} color="var(--color-slate)" />
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-obsidian)', cursor: 'pointer', outline: 'none' }}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Compare Tool */}
            <button
              className="nav-icon-btn"
              onClick={onOpenCompare}
              title="Compare Horses"
            >
              <Scale size={18} />
              {compareCount > 0 && (
                <span className="nav-icon-badge" style={{ backgroundColor: 'var(--color-obsidian)' }}>
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Tool */}
            <button
              className="nav-icon-btn"
              onClick={onOpenWishlist}
              title="Saved Horses"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="nav-icon-badge">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* List A Horse CTA */}
            <button
              className="btn btn-primary btn-sm"
              onClick={onOpenListHorse}
              style={{ display: 'none' }}
              className="btn btn-primary btn-sm list-btn-desktop"
            >
              <PlusCircle size={15} />
              <span>List a Horse</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="nav-icon-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'flex' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            padding: '20px 0 24px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div
              className={`nav-link-item ${currentView === 'marketplace' ? 'active' : ''}`}
              onClick={() => handleNavClick('marketplace')}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Marketplace
            </div>
            <div
              className={`nav-link-item ${currentView === 'adriatic' ? 'active' : ''}`}
              onClick={() => handleNavClick('adriatic')}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Adriatic Collection
            </div>
            <div
              className={`nav-link-item ${currentView === 'searches' ? 'active' : ''}`}
              onClick={() => handleNavClick('searches')}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Client Searches
            </div>
            <div
              className={`nav-link-item ${currentView === 'services' ? 'active' : ''}`}
              onClick={() => handleNavClick('services')}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Services & Concierge
            </div>
            <div
              onClick={() => { onOpenPrivateNetwork(); setMobileMenuOpen(false); }}
              style={{ fontSize: '1rem', padding: '8px 0', color: 'var(--color-gold-hover)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Sparkles size={16} />
              Private Network (3,200+ Horses)
            </div>
            <button
              className="btn btn-primary"
              onClick={() => { onOpenListHorse(); setMobileMenuOpen(false); }}
              style={{ width: '100%', marginTop: '8px' }}
            >
              <PlusCircle size={16} />
              List a Horse (Free)
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
