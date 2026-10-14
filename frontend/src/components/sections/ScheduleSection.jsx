import { useState, useRef } from 'react';
import { WORKSHOP_DAYS } from '../../data/workshopData';
import './ScheduleSection.css';

/* ============================================================
   ASTRION 2K26 — WORKSHOP SCHEDULE FLOWCHART
   Redesigned as an elegant horizontal milestone timeline:
   - Time label ABOVE the timeline
   - Circular milestone marker ON the timeline (connected by continuous line)
   - Short session title BELOW the marker
   - Concise description / detail below title
   - Optional duration, speaker, or status metadata
   - Dedicated compact active milestone details panel
   - Completely filters out "Arrival and Setup" milestone from Day 1
   ============================================================ */

export default function ScheduleSection({ onFocusSession }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const currentDay = WORKSHOP_DAYS[activeDayIndex];

  // Filter out any hidden sessions; explicitly exclude "Arrival and Setup" (d1-arrival)
  const visibleSchedule = currentDay.schedule.filter(
    (session) => !session.hiddenFromTimeline && session.id !== 'd1-arrival'
  );

  // Default selected milestone to the first visible session of the day
  const [selectedSessionId, setSelectedSessionId] = useState(
    visibleSchedule[0]?.id || null
  );

  const handleDaySelect = (idx) => {
    setActiveDayIndex(idx);
    const newDaySchedule = WORKSHOP_DAYS[idx].schedule.filter(
      (s) => !s.hiddenFromTimeline && s.id !== 'd1-arrival'
    );
    const firstSession = newDaySchedule[0];
    setSelectedSessionId(firstSession ? firstSession.id : null);
    if (onFocusSession && firstSession) {
      onFocusSession(firstSession.themeKey);
    }
  };

  const handleSessionSelect = (session) => {
    setSelectedSessionId(session.id);
    if (onFocusSession) {
      onFocusSession(session.themeKey);
    }
  };

  // Accessible keyboard navigation across timeline milestones
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % visibleSchedule.length;
      handleSessionSelect(visibleSchedule[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + visibleSchedule.length) % visibleSchedule.length;
      handleSessionSelect(visibleSchedule[prevIndex]);
    }
  };

  const activeSession =
    visibleSchedule.find((s) => s.id === selectedSessionId) ||
    visibleSchedule[0];
  const activeIndex = visibleSchedule.findIndex((s) => s.id === activeSession?.id);

  return (
    <section className="schedule-section section" id="schedule">
      <div className="schedule__container">
        {/* Header Area with Subtle Background Shield for Contrast */}
        <div className="schedule__header">
          <span className="section__label">EVENT JOURNEY</span>
          <h2 className="section__title">{currentDay.heading}</h2>
          <p className="section__subtitle schedule__header-sub">
            {currentDay.fullDate} · Institution's Innovation Council (IIC), VVIT University
          </p>
        </div>

        {/* Day Selector Buttons: DAY 01 — FRI, 23 OCT / DAY 02 — SAT, 24 OCT */}
        <div className="schedule__day-tabs" role="tablist" aria-label="Select Workshop Day">
          <button
            role="tab"
            aria-selected={activeDayIndex === 0}
            className={`day-tab-btn ${activeDayIndex === 0 ? 'day-tab-btn--active' : ''}`}
            onClick={() => handleDaySelect(0)}
          >
            <span className="day-tab-btn__name">DAY 01</span>
            <span className="day-tab-btn__sep">—</span>
            <span className="day-tab-btn__date">FRI, 23 OCT</span>
          </button>

          <button
            role="tab"
            aria-selected={activeDayIndex === 1}
            className={`day-tab-btn ${activeDayIndex === 1 ? 'day-tab-btn--active' : ''}`}
            onClick={() => handleDaySelect(1)}
          >
            <span className="day-tab-btn__name">DAY 02</span>
            <span className="day-tab-btn__sep">—</span>
            <span className="day-tab-btn__date">SAT, 24 OCT</span>
          </button>
        </div>

        {/* Horizontal Milestone Flowchart Container */}
        <div className="flowchart-timeline-outer">
          <div
            className="flowchart-timeline-scroll"
            ref={scrollContainerRef}
            role="tablist"
            aria-label={`${currentDay.label} Milestone Flowchart`}
          >
            <div className="flowchart-milestones-row">
              {visibleSchedule.map((session, index) => {
                const isSelected = session.id === activeSession?.id;
                const isLunch = session.isLunch;
                const milestoneNum = String(index + 1).padStart(2, '0');
                const isUnconfirmed =
                  session.status === 'awaiting_confirmation' || session.isUnconfirmedOverlap;

                return (
                  <div
                    key={session.id}
                    className={`flowchart-milestone ${
                      isSelected ? 'flowchart-milestone--selected' : ''
                    } ${isLunch ? 'flowchart-milestone--lunch' : ''} ${
                      isUnconfirmed ? 'flowchart-milestone--unconfirmed' : ''
                    }`}
                  >
                    {/* 1. Time Label ABOVE the timeline */}
                    <div className="flowchart-milestone__time-top">
                      <span className="milestone-time-badge">
                        {session.time}
                      </span>
                    </div>

                    {/* 2. Circular Milestone Marker ON the timeline */}
                    <div className="flowchart-milestone__track">
                      {/* Continuous illuminated connecting line segments */}
                      <div className="flowchart-line-segment flowchart-line-segment--left" />
                      <div className="flowchart-line-segment flowchart-line-segment--right" />

                      <button
                        type="button"
                        role="tab"
                        id={`milestone-tab-${session.id}`}
                        aria-controls="milestone-detail-panel"
                        aria-selected={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        className="flowchart-marker-btn"
                        onClick={() => handleSessionSelect(session)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        aria-label={`Milestone ${index + 1}: ${session.time} - ${session.title}`}
                      >
                        <span className="flowchart-marker-circle">
                          {isLunch ? (
                            <span className="marker-glyph">☕</span>
                          ) : (
                            <span className="marker-number">{milestoneNum}</span>
                          )}
                        </span>
                        <span className="marker-glow-ring" />
                      </button>
                    </div>

                    {/* 3. Short Session Title BELOW the marker */}
                    {/* 4. Concise Description or Session Detail */}
                    {/* 5. Optional Duration or Status Metadata */}
                    <div
                      className="flowchart-milestone__content-bottom"
                      onClick={() => handleSessionSelect(session)}
                    >
                      <h4 className="milestone-title">
                        {session.title}
                      </h4>

                      {/* Display detail only when not lunch break */}
                      {!isLunch && session.detail && (
                        <p className="milestone-detail">
                          {session.detail}
                        </p>
                      )}

                      {!isLunch && (
                        <div className="milestone-meta-tags">
                          {session.speaker && (
                            <span className="milestone-speaker-pill">
                              {session.speaker}
                            </span>
                          )}
                          {session.duration && (
                            <span className="milestone-duration-pill">
                              {session.duration}
                            </span>
                          )}
                          {isUnconfirmed && (
                            <span className="milestone-status-pill milestone-status-pill--warning">
                              Awaiting confirmation
                            </span>
                          )}
                        </div>
                      )}

                      {/* For Lunch: display ONLY the title LUNCH BREAK; no speaker or detailed description */}
                      {isLunch && (
                        <div className="milestone-meta-tags">
                          <span className="milestone-lunch-pill">
                            INTERMISSION
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Swipe indicator for mobile touch viewports */}
          <div className="flowchart-scroll-hint" aria-hidden="true">
            <span>← SWIPE TIMELINE →</span>
          </div>
        </div>

        {/* Dedicated Active Session Details Panel (Compact & High Contrast) */}
        {activeSession && (
          <div
            id="milestone-detail-panel"
            role="tabpanel"
            aria-labelledby={`milestone-tab-${activeSession.id}`}
            className="flowchart-detail-panel glass-card"
          >
            {activeSession.isLunch ? (
              /* Strictly LUNCH BREAK only: no speaker, no detailed menu or description */
              <div className="detail-panel__lunch-content">
                <span className="detail-panel__lunch-icon">☕</span>
                <div className="detail-panel__lunch-text">
                  <span className="detail-panel__kicker">
                    MILESTONE {String(activeIndex + 1).padStart(2, '0')} · INTERMISSION
                  </span>
                  <h3 className="detail-panel__lunch-title">LUNCH BREAK</h3>
                  <p className="detail-panel__lunch-timing">
                    TIMING: <strong>{activeSession.time}</strong>
                  </p>
                </div>
              </div>
            ) : (
              /* Full Session Details Panel */
              <div className="detail-panel__grid">
                <div className="detail-panel__main">
                  <div className="detail-panel__eyebrow">
                    <span className="detail-step-badge">
                      MILESTONE {String(activeIndex + 1).padStart(2, '0')} OF{' '}
                      {String(visibleSchedule.length).padStart(2, '0')}
                    </span>
                    <span className="detail-time-tag">⏱ {activeSession.time}</span>
                    {activeSession.duration && (
                      <span className="detail-duration-tag">{activeSession.duration}</span>
                    )}
                    {activeSession.status === 'awaiting_confirmation' && (
                      <span className="detail-status-tag detail-status-tag--warning">
                        AWAITING CONFIRMATION
                      </span>
                    )}
                  </div>

                  <h3 className="detail-panel__title">{activeSession.title}</h3>

                  {activeSession.speaker && (
                    <div className="detail-panel__speaker-bar">
                      <span className="meta-label">LEAD / SPEAKER:</span>
                      <span className="meta-value-speaker">{activeSession.speaker}</span>
                      {activeSession.role && (
                        <span className="meta-value-role">({activeSession.role})</span>
                      )}
                    </div>
                  )}

                  {activeSession.description && (
                    <p className="detail-panel__description">
                      {activeSession.description}
                    </p>
                  )}

                  {activeSession.remark && (
                    <div className="detail-panel__note-bar">
                      <span className="note-label">SESSION NOTE:</span>
                      <span className="note-text">{activeSession.remark}</span>
                    </div>
                  )}
                </div>

                <div className="detail-panel__side">
                  <div className="spatial-sync-tag">
                    <span className="sync-pulse-dot" />
                    <span>SYNCHRONIZED WITH 3D WORLD</span>
                  </div>
                  {activeSession.badge && (
                    <div className="category-meta-box">
                      <span className="meta-label">SESSION TRACK</span>
                      <span className="category-value">{activeSession.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
