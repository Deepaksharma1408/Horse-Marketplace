import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import HorseCard from './components/HorseCard';
import HorseMap from './components/HorseMap';
import HorseDetailModal from './components/HorseDetailModal';
import WishlistDrawer from './components/WishlistDrawer';
import CompareModal from './components/CompareModal';
import ListHorseModal from './components/ListHorseModal';
import PrivateNetworkModal from './components/PrivateNetworkModal';
import TrialRideModal from './components/TrialRideModal';
import ClientSearchesView from './components/ClientSearchesView';
import ServicesView from './components/ServicesView';
import ConciergeChat from './components/ConciergeChat';
import Footer from './components/Footer';

import { HORSES_DATA } from './data/horsesData';
import { Sparkles, Shield, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState('marketplace'); // 'marketplace' | 'adriatic' | 'searches' | 'services'
  const [currency, setCurrency] = useState('EUR'); // 'EUR' | 'USD' | 'GBP'

  // Master catalog of horses
  const [horses, setHorses] = useState(() => {
    const saved = localStorage.getItem('elitehorse_custom_horses');
    if (saved) {
      try {
        return [...HORSES_DATA, ...JSON.parse(saved)];
      } catch (e) {
        return HORSES_DATA;
      }
    }
    return HORSES_DATA;
  });

  // Saved / Wishlist IDs
  const [savedHorseIds, setSavedHorseIds] = useState(() => {
    const saved = localStorage.getItem('elitehorse_wishlist');
    return saved ? JSON.parse(saved) : ['horse-1', 'horse-4'];
  });

  // Compared IDs
  const [comparedHorseIds, setComparedHorseIds] = useState([]);

  // Active Modals & Drawers
  const [selectedHorseDossier, setSelectedHorseDossier] = useState(null);
  const [trialRideHorse, setTrialRideHorse] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isListHorseOpen, setIsListHorseOpen] = useState(false);
  const [isPrivateNetworkOpen, setIsPrivateNetworkOpen] = useState(false);
  const [isPostSearchOpen, setIsPostSearchOpen] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All Disciplines');
  const [activeCollection, setActiveCollection] = useState('all'); // 'all', 'adriatic', 'jumping', 'dressage', 'amateur', 'youngsters'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [selectedBreed, setSelectedBreed] = useState('All Studbooks');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [onlyMotivated, setOnlyMotivated] = useState(false);
  const [onlyVerifiedVet, setOnlyVerifiedVet] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('elitehorse_wishlist', JSON.stringify(savedHorseIds));
  }, [savedHorseIds]);

  // Wishlist actions
  const toggleSaveHorse = (id) => {
    setSavedHorseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compare actions
  const toggleCompareHorse = (id) => {
    setComparedHorseIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 horses side-by-side. Please deselect one first.");
        return prev;
      }
      return [...prev, id];
    });
  };

  // Add new horse from seller wizard
  const handleAddNewHorse = (newHorse) => {
    setHorses((prev) => [newHorse, ...prev]);
    const customList = JSON.parse(localStorage.getItem('elitehorse_custom_horses') || '[]');
    customList.unshift(newHorse);
    localStorage.setItem('elitehorse_custom_horses', JSON.stringify(customList));
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDiscipline('All Disciplines');
    setActiveCollection('all');
    setSelectedGender('All Genders');
    setSelectedBreed('All Studbooks');
    setSelectedLevel('all');
    setSelectedPriceRange('all');
    setSelectedCountry('all');
    setOnlyMotivated(false);
    setOnlyVerifiedVet(false);
    setSortBy('featured');
  };

  // Switch to Adriatic collection from header
  useEffect(() => {
    if (currentView === 'adriatic') {
      setActiveCollection('adriatic');
    }
  }, [currentView]);

  // Filtered & Sorted Horses
  const filteredHorses = useMemo(() => {
    return horses
      .filter((h) => {
        // Search term check
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = h.name.toLowerCase().includes(q);
          const matchNick = h.nickname?.toLowerCase().includes(q);
          const matchSire = h.pedigree?.sire.toLowerCase().includes(q);
          const matchBreed = h.breed.toLowerCase().includes(q);
          const matchLocation = h.location.toLowerCase().includes(q);
          const matchDiscipline = h.discipline.toLowerCase().includes(q);
          if (!matchName && !matchNick && !matchSire && !matchBreed && !matchLocation && !matchDiscipline) {
            return false;
          }
        }

        // Discipline check
        if (selectedDiscipline !== 'All Disciplines' && h.discipline !== selectedDiscipline) {
          return false;
        }

        // Collection tab check
        if (activeCollection === 'adriatic' && h.collection !== 'adriatic') return false;
        if (activeCollection === 'jumping' && h.discipline !== 'Show Jumping') return false;
        if (activeCollection === 'dressage' && h.discipline !== 'Dressage') return false;
        if (activeCollection === 'amateur' && h.suitability.amateurSafe < 90) return false;
        if (activeCollection === 'youngsters' && h.age > 6) return false;

        // Gender check
        if (selectedGender !== 'All Genders' && h.gender !== selectedGender) return false;

        // Breed check
        if (selectedBreed !== 'All Studbooks' && h.breed !== selectedBreed) return false;

        // Level check
        if (selectedLevel !== 'all' && h.levelCategory !== selectedLevel) return false;

        // Country check
        if (selectedCountry !== 'all' && h.country !== selectedCountry) return false;

        // Motivated toggle
        if (onlyMotivated && !h.motivated) return false;

        // Price bracket check
        if (selectedPriceRange !== 'all') {
          if (selectedPriceRange === 'demand' && h.priceType !== 'demand') return false;
          if (selectedPriceRange === 'under50k' && (h.priceEur > 50000 || h.priceType === 'demand')) return false;
          if (selectedPriceRange === '50k-100k' && (h.priceEur < 50000 || h.priceEur > 100000 || h.priceType === 'demand')) return false;
          if (selectedPriceRange === '100k-200k' && (h.priceEur < 100000 || h.priceEur > 200000 || h.priceType === 'demand')) return false;
          if (selectedPriceRange === '200kplus' && (h.priceEur < 200000 || h.priceType === 'demand')) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return (a.priceEur || 999999) - (b.priceEur || 999999);
        }
        if (sortBy === 'price-desc') {
          return (b.priceEur || 0) - (a.priceEur || 0);
        }
        if (sortBy === 'age-asc') {
          return a.age - b.age;
        }
        if (sortBy === 'age-desc') {
          return b.age - a.age;
        }
        // Featured
        return (b.motivated ? 1 : 0) - (a.motivated ? 1 : 0);
      });
  }, [
    horses,
    searchTerm,
    selectedDiscipline,
    activeCollection,
    selectedGender,
    selectedBreed,
    selectedLevel,
    selectedPriceRange,
    selectedCountry,
    onlyMotivated,
    sortBy
  ]);

  const savedHorsesList = horses.filter((h) => savedHorseIds.includes(h.id));

  return (
    <div className="elitehorse-app">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCurrency={currency}
        setSelectedCurrency={setCurrency}
        wishlistCount={savedHorseIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        compareCount={comparedHorseIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenListHorse={() => setIsListHorseOpen(true)}
        onOpenPrivateNetwork={() => setIsPrivateNetworkOpen(true)}
      />

      {/* MAIN VIEW CONTROLLER */}
      {currentView === 'searches' ? (
        <ClientSearchesView
          onOpenPostSearch={() => setIsPostSearchOpen(true)}
          onSubmitMatch={(searchItem) => {
            alert(`Opening candidate horse matcher for "${searchItem.title}". Our concierge will contact you with upload options.`);
          }}
        />
      ) : currentView === 'services' ? (
        <ServicesView
          onOpenPrivateNetwork={() => setIsPrivateNetworkOpen(true)}
          onOpenListHorse={() => setIsListHorseOpen(true)}
        />
      ) : (
        /* MARKETPLACE & ADRIATIC COLLECTION VIEW */
        <main>
          {/* Editorial Hero Banner */}
          <Hero
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDiscipline={selectedDiscipline}
            setSelectedDiscipline={setSelectedDiscipline}
            onOpenPrivateNetwork={() => setIsPrivateNetworkOpen(true)}
          />

          {/* Facets & Filter Bar */}
          <FilterBar
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            onlyMotivated={onlyMotivated}
            setOnlyMotivated={setOnlyMotivated}
            onlyVerifiedVet={onlyVerifiedVet}
            setOnlyVerifiedVet={setOnlyVerifiedVet}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            totalMatching={filteredHorses.length}
          />

          {/* VIEW: MAP VIEW vs GRID VIEW */}
          <div className="site-container">
            {viewMode === 'map' ? (
              <HorseMap
                horses={filteredHorses}
                currency={currency}
                onSelectHorse={(h) => setSelectedHorseDossier(h)}
                onCloseMap={() => setViewMode('grid')}
              />
            ) : (
              <div>
                {filteredHorses.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--color-cream)', borderRadius: 'var(--radius-xl)', margin: '40px 0' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '8px' }}>
                      No horses matched your exact criteria
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--color-slate)', maxWidth: '480px', margin: '0 auto 20px' }}>
                      Try relaxing your filter parameters or request access to our 3,200+ unlisted sport horses in the Private Network.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button className="btn btn-outline" onClick={handleResetFilters}>
                        Reset all filters
                      </button>
                      <button className="btn btn-primary" onClick={() => setIsPrivateNetworkOpen(true)}>
                        Unlock Private Network
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="horses-grid"
                    key={`${activeCollection}-${selectedDiscipline}-${selectedGender}-${selectedBreed}-${selectedLevel}-${selectedPriceRange}-${selectedCountry}-${sortBy}-${onlyMotivated}-${onlyVerifiedVet}-${searchTerm}`}
                  >
                    {filteredHorses.map((horse, index) => (
                      <HorseCard
                        key={horse.id}
                        horse={horse}
                        index={index}
                        currency={currency}
                        isSaved={savedHorseIds.includes(horse.id)}
                        onToggleSave={toggleSaveHorse}
                        isCompared={comparedHorseIds.includes(horse.id)}
                        onToggleCompare={toggleCompareHorse}
                        onSelectHorse={(h) => setSelectedHorseDossier(h)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PRIVATE NETWORK / VIP VAULT BANNER (Bridl Parity) */}
            <div className="private-network-banner">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="badge badge-exclusive" style={{ background: 'var(--color-gold)', color: '#ffffff' }}>
                    <Lock size={12} />
                    Off-Market Vault
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#c9cddb' }}>
                    Curated by International Scouts
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.15, marginBottom: '16px' }}>
                  3,200+ Sport Horses Available in Our <em>Private Network.</em>
                </h3>

                <p style={{ fontSize: '1rem', color: '#a2a7be', lineHeight: 1.6, maxWidth: '600px' }}>
                  High-profile Grand Prix jumpers and elite young breeding stock not published on public catalogs. Direct owner connections, video links, and vetted dossiers.
                </p>

                <div className="private-banner-features">
                  <div className="private-feat-item">
                    <CheckCircle2 size={18} color="var(--color-gold)" />
                    <span>100% Confidential Access</span>
                  </div>
                  <div className="private-feat-item">
                    <CheckCircle2 size={18} color="var(--color-gold)" />
                    <span>Personal Scout Match</span>
                  </div>
                  <div className="private-feat-item">
                    <CheckCircle2 size={18} color="var(--color-gold)" />
                    <span>Response Within 24h</span>
                  </div>
                  <div className="private-feat-item">
                    <CheckCircle2 size={18} color="var(--color-gold)" />
                    <span>Verified European Stables</span>
                  </div>
                </div>

                <button
                  className="btn btn-gold btn-lg"
                  onClick={() => setIsPrivateNetworkOpen(true)}
                  style={{ gap: '10px' }}
                >
                  <span>Unlock Access to Private Horses</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Decorative Card Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(255, 255, 255, 0.05)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={20} color="#ffffff" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', margin: 0, color: '#ffffff' }}>
                      Concierge Trial Itineraries
                    </h5>
                    <span style={{ fontSize: '0.78rem', color: '#9da2b8' }}>
                      Belgium · Germany · Netherlands · Croatia
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#b9bdd0', margin: 0, lineHeight: 1.5 }}>
                  Planning an overseas shopping trip? We coordinate visits to 5+ top barns in 48 hours, private chauffeurs, veterinary PPE appointments, and export air transit.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', marginTop: '8px' }}
                  onClick={() => setCurrentView('services')}
                >
                  Explore Concierge Services
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FLOATING CONCIERGE CHAT WIDGET */}
      <ConciergeChat />

      {/* FOOTER */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivateNetwork={() => setIsPrivateNetworkOpen(true)}
        onOpenListHorse={() => setIsListHorseOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Full Horse Dossier Modal */}
      {selectedHorseDossier && (
        <HorseDetailModal
          horse={selectedHorseDossier}
          onClose={() => setSelectedHorseDossier(null)}
          currency={currency}
          isSaved={savedHorseIds.includes(selectedHorseDossier.id)}
          onToggleSave={toggleSaveHorse}
          onBookTrialRide={(h) => {
            setSelectedHorseDossier(null);
            setTrialRideHorse(h);
          }}
          onInquireConcierge={(h) => {
            alert(`Opening WhatsApp / Concierge connection for ${h.name}. Head scout will assist immediately.`);
          }}
        />
      )}

      {/* 2. Wishlist Slide Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedHorses={savedHorsesList}
        onRemoveSave={toggleSaveHorse}
        onSelectHorse={(h) => setSelectedHorseDossier(h)}
        currency={currency}
        onInquireAll={(horsesList) => {
          alert(`Inquiry sent for ${horsesList.length} horses! Our concierge is preparing combined vetting dossiers.`);
          setIsWishlistOpen(false);
        }}
      />

      {/* 3. Compare Modal */}
      {isCompareOpen && (
        <CompareModal
          horses={horses}
          comparedIds={comparedHorseIds}
          onRemoveCompare={toggleCompareHorse}
          onClearCompare={() => setComparedHorseIds([])}
          onSelectHorse={(h) => setSelectedHorseDossier(h)}
          currency={currency}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* 4. List Horse Seller Modal */}
      {isListHorseOpen && (
        <ListHorseModal
          onClose={() => setIsListHorseOpen(false)}
          onHorseAdded={handleAddNewHorse}
        />
      )}

      {/* 5. Private Network VIP Modal */}
      {isPrivateNetworkOpen && (
        <PrivateNetworkModal
          onClose={() => setIsPrivateNetworkOpen(false)}
        />
      )}

      {/* 6. Trial Ride Scheduler Modal */}
      {trialRideHorse && (
        <TrialRideModal
          horse={trialRideHorse}
          onClose={() => setTrialRideHorse(null)}
        />
      )}

      {/* 7. Post Buyer Search Modal */}
      {isPostSearchOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsPostSearchOpen(false)}>
          <div className="modal-content-box" style={{ maxWidth: '640px', padding: '36px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '8px' }}>
              Post a Buyer Acquisition Request
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-slate)', marginBottom: '20px' }}>
              Our scouting network across Germany, Belgium, France, and Croatia will find matching horses directly from breeders.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Your buyer acquisition brief was posted. Relevant horses will be matched within 48h.");
              setIsPostSearchOpen(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input className="filter-select-styled" placeholder="Target Horse Title (e.g. 1.40m Amateur Show Jumper)" required />
                <input className="filter-select-styled" placeholder="Allocated Budget (e.g. €80,000 – €120,000)" required />
                <textarea rows={3} className="filter-select-styled" placeholder="Key requirements (age, height, rideability, breeding)..." required />
                <input className="filter-select-styled" type="email" placeholder="Your Email Address" required />
                <button type="submit" className="btn btn-gold" style={{ marginTop: '10px' }}>
                  Submit Buyer Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
