import { useEffect, useRef, useState } from 'react';
import { WORKSHOP } from '../../data/workshopData';
import './HeroSection.css';

/* ============================================================
   HERO SECTION — Full-screen cinematic 3D environment
   Accurate Day 1 details and direct functional CTAs
   ============================================================ */

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);
    const sectionRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (id) => {
        const el = document.querySelector(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" ref={sectionRef} id="hero">
            <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>
                
                {/* Meta Branding */}
                <div className="hero__meta">
                    <span className="hero__badge">{WORKSHOP.event} × IIC</span>
                    <span className="hero__badge hero__badge--secondary">IIC WORKSHOP EXPERIENCE</span>
                </div>

                {/* Primary Hero Headings */}
                <h1 className="hero__title">
                    <span className="hero__title-line hero__title-line--1">VENTURE</span>
                    <span className="hero__title-line hero__title-line--2 holo-text">LAUNCHPAD</span>
                </h1>

                <h2 className="hero__subtitle-tagline">
                    From Idea Generation to Business Creation
                </h2>

                {/* Day 1 Focus Banner */}
                <div className="hero__day-banner">
                    <span className="hero__day-indicator">
                        DAY 01 — INNOVATION, TECHNOLOGY & ENTREPRENEURSHIP
                    </span>
                    <div className="hero__day-meta">
                        <span className="hero__date">23 OCTOBER 2026</span>
                        <span className="hero__sep">•</span>
                        <span className="hero__venue">VVIT UNIVERSITY</span>
                    </div>
                </div>

                {/* Animated Status Indicator */}
                <div className="hero__status-pill">
                    <span className="status-dot" />
                    <span className="hero__status-label">WORKSHOP EXPERIENCE · DAY 01</span>
                </div>

                {/* Interactive CTAs */}
                <div className="hero__actions">
                    <button
                        className="btn btn--primary btn--large hero__cta-primary"
                        onClick={() => scrollToSection('#schedule')}
                    >
                        EXPLORE THE SCHEDULE
                        <span className="btn__glow" />
                    </button>
                    <button
                        className="btn btn--ghost btn--large hero__cta-secondary"
                        onClick={() => scrollToSection('#register')}
                    >
                        REGISTER NOW →
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`hero__scroll-indicator ${loaded ? 'hero__scroll-indicator--visible' : ''}`}>
                <div className="hero__scroll-line" />
                <span className="hero__scroll-text">SCROLL TO EXPERIENCE</span>
            </div>
        </section>
    );
}
