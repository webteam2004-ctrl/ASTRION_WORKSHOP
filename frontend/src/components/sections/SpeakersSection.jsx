import { SPEAKERS } from '../../data/workshopData';
import { useState, useRef, useEffect } from 'react';
import './SpeakersSection.css';

/* ============================================================
   SPEAKER CARD COMPONENT
   - Dedicated speaker portrait area at the top
   - Graceful placeholder silhouette with subtle cyan/violet border
   - Auto-fallback if speaker image fails to load
   - Robust text hierarchy preventing overflow
   ============================================================ */
function SpeakerCard({ person, isDuplicate = false, onFocus, onBlur }) {
  const [imgError, setImgError] = useState(false);
  const photoUrl = person.photo || person.imageUrl;
  const hasValidPhoto = Boolean(photoUrl && !imgError);

  const sessionTitle = person.session || person.sessionTitle;
  const sessionTime = person.timing || person.sessionTime;
  const description = person.note || person.description || person.shortDescription;

  return (
    <article
      className="speaker-card glass-card"
      style={{ '--speaker-accent': person.accent || '#00e5ff' }}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? 'true' : undefined}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* 1. Dedicated Speaker Photo Area at the Top */}
      <div className="speaker-card__photo-section">
        <div className="speaker-card__portrait-frame">
          {hasValidPhoto ? (
            <img
              src={photoUrl}
              alt={person.name}
              className="speaker-card__portrait-img"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="speaker-card__placeholder" aria-label="Speaker portrait placeholder">
              <svg
                className="speaker-card__silhouette"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              {person.icon && (
                <span className="speaker-card__corner-icon" title={person.badge || ''}>
                  {person.icon}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="speaker-card__meta-tags">
          <span className="speaker-card__day-tag">{person.day}</span>
          {person.badge && (
            <span className="speaker-card__badge">{person.badge}</span>
          )}
        </div>
      </div>

      {/* 2. Speaker Identity */}
      <div className="speaker-card__identity">
        <h3 className="speaker-card__name" title={person.name}>
          {person.name}
        </h3>
        <span className="speaker-card__role" title={person.role}>
          {person.role}
        </span>
      </div>

      {/* 3. Session Title & Time */}
      <div className="speaker-card__session">
        <p className="speaker-card__session-title" title={sessionTitle}>
          {sessionTitle}
        </p>
        {sessionTime && (
          <span className="speaker-card__timing">⏱ {sessionTime}</span>
        )}
      </div>

      {/* 4. Short Description */}
      {description && (
        <p className="speaker-card__note" title={description}>
          {description}
        </p>
      )}
    </article>
  );
}

/* ============================================================
   SPEAKERS & GUESTS SECTION
   Infinite seamless horizontal carousel with pause/resume control.
   ============================================================ */
export default function SpeakersSection() {
  const [filterDay, setFilterDay] = useState('ALL');
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const trackRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const filteredSpeakers =
    filterDay === 'ALL'
      ? SPEAKERS
      : SPEAKERS.filter((s) => s.day.includes(filterDay));

  return (
    <section className="speakers section" id="speakers">
      <div className="speakers__container">
        <span className="section__label">LEADERSHIP & EXPERTISE</span>
        <h2 className="section__title">PEOPLE BEHIND THE EXPERIENCE</h2>
        <p className="section__subtitle">
          Guiding you through technological systems, statutory mechanics, enterprise funding, and operational scaling.
        </p>

        {/* Day Filter Pills & Animation Controls */}
        <div className="speakers__controls-row">
          <div className="speakers__filter-pills" role="tablist" aria-label="Filter Speakers by Day">
            <button
              role="tab"
              aria-selected={filterDay === 'ALL'}
              className={`filter-pill ${filterDay === 'ALL' ? 'filter-pill--active' : ''}`}
              onClick={() => setFilterDay('ALL')}
            >
              ALL GUESTS ({SPEAKERS.length})
            </button>
            <button
              role="tab"
              aria-selected={filterDay === 'Day 1'}
              className={`filter-pill ${filterDay === 'Day 1' ? 'filter-pill--active' : ''}`}
              onClick={() => setFilterDay('Day 1')}
            >
              DAY 01 (23 OCT)
            </button>
            <button
              role="tab"
              aria-selected={filterDay === 'Day 2'}
              className={`filter-pill ${filterDay === 'Day 2' ? 'filter-pill--active' : ''}`}
              onClick={() => setFilterDay('Day 2')}
            >
              DAY 02 (24 OCT)
            </button>
          </div>

          <button
            className="carousel-pause-btn"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume Carousel Movement' : 'Pause Carousel Movement'}
          >
            {isPaused ? '▶ RESUME SCROLL' : '⏸ PAUSE SCROLL'}
          </button>
        </div>

        {/* Infinite Horizontal Carousel */}
        <div
          className="speakers__carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`speakers__carousel-track ${
              isPaused || prefersReducedMotion ? 'speakers__carousel-track--paused' : ''
            }`}
            ref={trackRef}
          >
            {/* Primary Track (Announced to screen readers) */}
            <div className="speakers__track-group">
              {filteredSpeakers.map((person) => (
                <SpeakerCard
                  key={person.id}
                  person={person}
                  isDuplicate={false}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                />
              ))}
            </div>

            {/* Duplicate Track for Seamless Infinite Loop (Hidden from screen readers) */}
            <div className="speakers__track-group" aria-hidden="true">
              {filteredSpeakers.map((person) => (
                <SpeakerCard
                  key={`dup-${person.id}`}
                  person={person}
                  isDuplicate={true}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
