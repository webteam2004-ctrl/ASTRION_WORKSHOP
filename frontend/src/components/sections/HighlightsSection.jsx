import { useState } from 'react';
import { WORKSHOP_THEMES } from '../../data/workshopData';
import './HighlightsSection.css';

/* ============================================================
   CORE PILLARS — TWO-DAY INNOVATION CONSTELLATION
   Structured 2-column layout:
   Top: Section label, Heading, Short explanatory paragraph
   Left: Compact, organized grid of selectable thematic nodes
   Right: Dedicated glassmorphism information panel
   Behind: Existing 3D constellation with reduced visual intensity
   ============================================================ */

export default function HighlightsSection({ onSelectTheme }) {
    const [activeThemeId, setActiveThemeId] = useState(WORKSHOP_THEMES[0].id);

    const handleThemeClick = (theme) => {
        setActiveThemeId(theme.id);
        if (onSelectTheme) {
            onSelectTheme(theme.coreVisual);
        }
    };

    const currentTheme = WORKSHOP_THEMES.find((t) => t.id === activeThemeId) || WORKSHOP_THEMES[0];

    return (
        <section className="highlights section" id="highlights">
            <div className="highlights__container">
                {/* Top Row */}
                <div className="highlights__top-header">
                    <span className="section__label">CORE PILLARS</span>
                    <h2 className="section__title">TWO-DAY INNOVATION CONSTELLATION</h2>
                    <p className="section__subtitle highlights__lead-text">
                        Explore the foundational thematic pillars spanning technological systems, statutory compliance, banking evaluation, enterprise scaling, and physical product creation.
                    </p>
                </div>

                {/* Structured Main Content Area */}
                <div className="constellation-structured-layout">
                    {/* Left: Compact, organized grid of selectable thematic nodes */}
                    <div className="constellation-nodes-sidebar" role="tablist" aria-label="Selectable Innovation Pillars">
                        <span className="constellation-nodes-title">THEMATIC PATHWAYS</span>
                        
                        <div className="constellation-nodes-list">
                            {WORKSHOP_THEMES.map((theme) => {
                                const isActive = theme.id === activeThemeId;
                                return (
                                    <button
                                        key={theme.id}
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`constellation-item-btn glass-card ${isActive ? 'constellation-item-btn--active' : ''}`}
                                        onClick={() => handleThemeClick(theme)}
                                    >
                                        <span className="constellation-item-icon">{theme.symbol}</span>
                                        <div className="constellation-item-content">
                                            <span className="constellation-item-day">{theme.day} TRACK</span>
                                            <h4 className="constellation-item-title">{theme.title}</h4>
                                        </div>
                                        <span className="constellation-item-arrow">→</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Dedicated Information Panel */}
                    <div className="constellation-detail-panel glass-card">
                        <div className="constellation-detail-panel__header">
                            <div className="constellation-detail-panel__tag-row">
                                <span className="constellation-detail-panel__badge">CONFIRMED THEME · {currentTheme.day}</span>
                                <span className="constellation-detail-panel__symbol">{currentTheme.symbol}</span>
                            </div>
                            <h3 className="constellation-detail-panel__title">{currentTheme.title}</h3>
                        </div>

                        <p className="constellation-detail-panel__desc">
                            {currentTheme.shortDesc}
                        </p>

                        {/* Interactive Spatial Visual Demonstration Box */}
                        <div className="constellation-detail-panel__visual-box">
                            {currentTheme.coreVisual === 'funding' && (
                                <div className="spatial-cue spatial-cue--funding">
                                    <div className="funding-flow-sim">
                                        <span className="funding-bar" />
                                        <span className="funding-bar" />
                                        <span className="funding-bar" />
                                    </div>
                                    <span className="spatial-cue__label">BANKING APPROVAL & BUSINESS PLAN METRICS</span>
                                </div>
                            )}
                            {currentTheme.coreVisual === 'growth' && (
                                <div className="spatial-cue spatial-cue--growth">
                                    <div className="growth-pulse">🌱</div>
                                    <span className="spatial-cue__label">ENTERPRISE RESILIENCE & AGRICULTURAL SUPPLY</span>
                                </div>
                            )}
                            {currentTheme.coreVisual === 'product' && (
                                <div className="spatial-cue spatial-cue--product">
                                    <div className="gear-pulse">🧸</div>
                                    <span className="spatial-cue__label">CREATIVE PRODUCT DESIGN & PHYSICAL TOY CRAFT</span>
                                </div>
                            )}
                            {currentTheme.coreVisual === 'business-exposure' && (
                                <div className="spatial-cue spatial-cue--business">
                                    <div className="node-pulse" />
                                    <span className="spatial-cue__label">VVITU APPA BUSINESS PROCESS EXPOSURE</span>
                                </div>
                            )}
                            {currentTheme.coreVisual === 'solar-ev' && (
                                <div className="spatial-cue spatial-cue--solar">
                                    <div className="solar-grid-sim">
                                        <span className="grid-cell" />
                                        <span className="grid-cell" />
                                        <span className="grid-cell" />
                                    </div>
                                    <span className="spatial-cue__label">PHOTOVOLTAIC & EV GRID SIMULATION</span>
                                </div>
                            )}
                            {currentTheme.coreVisual === 'manufacturing' && (
                                <div className="spatial-cue spatial-cue--manufacturing">
                                    <div className="gear-pulse">⚙</div>
                                    <span className="spatial-cue__label">TISSUE PRODUCTION & SUPPLY OPERATION</span>
                                </div>
                            )}
                        </div>

                        <div className="constellation-detail-panel__footer">
                            <span className="constellation-interactive-hint">
                                ✦ Active in 3D Innovation Core Background
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
