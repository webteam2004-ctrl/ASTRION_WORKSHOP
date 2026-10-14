import { useRef, useEffect, useState } from 'react';
import './AboutSection.css';

/* ============================================================
   ABOUT SECTION — Where Ideas Meet Real-World Innovation
   Cinematic glass container with restrained text width,
   left-aligned paragraph, and clear foreground separation.
   ============================================================ */

const DAY1_INNOVATION_PILLARS = [
    {
        id: 'inaugural',
        phase: 'PHASE 01',
        title: 'Institutional Foundations',
        detail: 'Inaugural assembly with invited dignitaries, faculty mentors, and the IIC Council, establishing an institutional launchpad for ventures.',
        icon: '◈',
        tag: 'IIC COUNCIL',
    },
    {
        id: 'solar-ev',
        phase: 'PHASE 02',
        title: 'Solar & EV Charging Infrastructure',
        detail: 'Exploring statutory compliance, clean energy distribution, and electric mobility systems with Ravi Shankar sir, translating technology into scalable operations.',
        icon: '⚡',
        tag: 'DEEP TECH & POLICY',
    },
    {
        id: 'guest-talk',
        phase: 'PHASE 03',
        title: 'Industry & Innovation Dialogue',
        detail: 'Keynote address by Rajesh Kampala, providing real-world perspectives on emerging industry opportunities and execution ecosystems.',
        icon: '🎙️',
        tag: 'EXECUTIVE TALK',
    },
    {
        id: 'entrepreneurship',
        phase: 'PHASE 04',
        title: 'Enterprise Manufacturing & Founder Journey',
        detail: 'Operational journey with Rama ma\'am exploring tissue manufacturing operations, women entrepreneurship, and navigating business creation.',
        icon: '✨',
        tag: 'FOUNDER JOURNEY',
    },
];

export default function AboutSection() {
    const sectionRef = useRef();
    const [activePillar, setActivePillar] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="about section" ref={sectionRef} id="about">
            <div className="about__container">
                {/* Foreground Glass Header Hero Card */}
                <div className="about__hero-glass glass-card">
                    <span className="section__label">ABOUT THE WORKSHOP</span>
                    <h2 className="about__main-title">
                        WHERE IDEAS MEET <span className="holo-text">REAL-WORLD INNOVATION</span>
                    </h2>
                    <p className="about__lead-desc">
                        Organized by the Institution's Innovation Council (IIC), VVIT University, Venture Launchpad bridges
                        the gap between conceptual ideation and operational enterprise through deep technology,
                        statutory compliance, institutional banking, and proven founder journeys.
                    </p>
                </div>

                {/* 3D Innovation Ecosystem interactive layout */}
                <div className={`about__ecosystem ${isVisible ? 'about__ecosystem--visible' : ''}`}>
                    {/* Compact Connected Center Badge */}
                    <div className="about__core-anchor">
                        <div className="about__core-pulse" />
                        <span className="about__core-title">IIC VENTURE FRAMEWORK</span>
                    </div>

                    {/* Interactive Connected Nodes */}
                    <div className="about__nodes-grid">
                        {DAY1_INNOVATION_PILLARS.map((pillar, i) => (
                            <div
                                key={pillar.id}
                                className={`about__node glass-card ${activePillar === i ? 'about__node--active' : ''}`}
                                onClick={() => setActivePillar(i)}
                                onMouseEnter={() => setActivePillar(i)}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => e.key === 'Enter' && setActivePillar(i)}
                                aria-label={`Pillar: ${pillar.title}`}
                            >
                                <div className="about__node-header">
                                    <span className="about__node-phase">{pillar.phase}</span>
                                    <span className="about__node-tag">{pillar.tag}</span>
                                </div>
                                <div className="about__node-body">
                                    <div className="about__node-icon">{pillar.icon}</div>
                                    <h3 className="about__node-title">{pillar.title}</h3>
                                </div>
                                <p className="about__node-desc">{pillar.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
