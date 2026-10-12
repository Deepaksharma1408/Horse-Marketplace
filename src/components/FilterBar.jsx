import React, { useState } from 'react';
import { SlidersHorizontal, Map, LayoutGrid, RotateCcw, Check, Sparkles } from 'lucide-react';
import { GENDERS, BREED_OPTIONS, LEVEL_OPTIONS, PRICE_RANGES } from '../data/horsesData';

export default function FilterBar({
  activeCollection,
  setActiveCollection,
  viewMode,
  setViewMode,
  selectedGender,
  setSelectedGender,
  selectedBreed,
  setSelectedBreed,
  selectedLevel,
  setSelectedLevel,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedCountry,
  setSelectedCountry,
  onlyMotivated,
  setOnlyMotivated,
  onlyVerifiedVet,
  setOnlyVerifiedVet,
  sortBy,
  setSortBy,
  onResetFilters,
  totalMatching
}) {
  const [showDrawer, setShowDrawer] = useState(false);

  // Calculate active filter count
  const activeFilterCount = [
    selectedGender !== 'All Genders',
    selectedBreed !== 'All Studbooks',
    selectedLevel !== 'all',
    selectedPriceRange !== 'all',
    selectedCountry !== 'all',
    onlyMotivated,
    onlyVerifiedVet
  ].filter(Boolean).length;

  return (
    <div className="filter-section-wrapper" id="marketplace-listings">
      <div className="site-container">
        {/* Collection & View Controls Row */}
        <div className="facet-pills-bar">
          {/* Collection Tabs */}
          <div className="collection-tabs">
            {[
              { id: 'all', label: 'All Sport Horses' },
              { id: 'adriatic', label: 'Adriatic Collection' },
              { id: 'jumping', label: 'Show Jumping' },
              { id: 'dressage', label: 'Dressage' },
              { id: 'amateur', label: 'Amateur Safe' },
              { id: 'youngsters', label: 'Young Prospects (4–6yo)' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`collection-tab-btn ${activeCollection === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCollection(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Filter Drawer Toggle & View Mode Toggle */}
          <div className="filter-view-controls">
            <button
              className={`btn btn-sm ${activeFilterCount > 0 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setShowDrawer(!showDrawer)}
              style={{ borderRadius: 'var(--radius-pill)', gap: '6px' }}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    background: 'var(--color-gold)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Grid vs Map Toggle */}
            <div className="view-toggle-group">
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={15} />
                <span>Grid</span>
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                title="Interactive Map View"
              >
                <Map size={15} />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results summary & Sort row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.88rem', color: 'var(--color-slate)' }}>
          <div>
            Showing <strong style={{ color: 'var(--color-obsidian)' }}>{totalMatching}</strong> sport horse{totalMatching === 1 ? '' : 's'}
            {activeFilterCount > 0 && (
              <button
                onClick={onResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-rose-hover)',
                  marginLeft: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600',
                  fontSize: '0.8rem'
                }}
              >
                <RotateCcw size={12} />
                Reset filters
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 10px',
                fontSize: '0.8rem',
                color: 'var(--color-obsidian)',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: '600'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="age-asc">Age: Youngest</option>
              <option value="age-desc">Age: Oldest</option>
            </select>
          </div>
        </div>

        {/* Expanded Filters Drawer */}
        {showDrawer && (
          <div className="expanded-filter-drawer">
            <div className="filter-grid-facets">
              {/* Studbook / Breed */}
              <div className="filter-facet-col">
                <label>Studbook / Registry</label>
                <select
                  className="filter-select-styled"
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                >
                  {BREED_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="filter-facet-col">
                <label>Gender</label>
                <select
                  className="filter-select-styled"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level / Suitability */}
              <div className="filter-facet-col">
                <label>Experience Level</label>
                <select
                  className="filter-select-styled"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-facet-col">
                <label>Budget Tier</label>
                <select
                  className="filter-select-styled"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  {PRICE_RANGES.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div className="filter-facet-col">
                <label>Location / Stable</label>
                <select
                  className="filter-select-styled"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  <option value="Croatia">Croatia (Adriatic)</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Germany">Germany</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            {/* Checkbox toggles */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <label className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={onlyMotivated}
                  onChange={(e) => setOnlyMotivated(e.target.checked)}
                  style={{ accentColor: 'var(--color-rose)' }}
                />
                <span>Motivated Sellers Only</span>
              </label>

              <label className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={onlyVerifiedVet}
                  onChange={(e) => setOnlyVerifiedVet(e.target.checked)}
                  style={{ accentColor: 'var(--color-success)' }}
                />
                <span>Grade 1 X-Rays on File</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
