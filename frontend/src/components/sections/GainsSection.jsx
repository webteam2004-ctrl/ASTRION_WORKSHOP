import { useState, useRef, useEffect } from 'react';
import { GAINS } from '../../data/workshopData';
import './GainsSection.css';

/* ============================================================
   GAINS SECTION — Constellation of skills participants gain
   ============================================================ */

export default function GainsSection() {
    const [activeGain, setActiveGain] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="gains section" ref={sectionRef} id="learn">
            <span className="section__label">WHAT YOU'LL GAIN</span>
            <h2 className="section__title">YOUR VENTURE TOOLKIT</h2>
            <p className="section__subtitle">
                Every skill you need to transform an idea into a real business venture.
            </p>

            <div className={`gains__constellation ${isVisible ? 'gains__constellation--visible' : ''}`}>
                {/* Central node */}
                <div className="gains__center">
                    <div className="gains__center-core" />
                    <span className="gains__center-label">YOUR VENTURE</span>
                </div>

                {/* Orbiting gain nodes */}
                {GAINS.map((gain, i) => {
                    const angle = (i / GAINS.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 200;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div
                            key={gain.title}
                            className={`gains__node ${activeGain === i ? 'gains__node--active' : ''}`}
                            style={{
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                animationDelay: `${i * 0.1}s`,
                            }}
                            onMouseEnter={() => setActiveGain(i)}
                            onMouseLeave={() => setActiveGain(null)}
                        >
                            <div className="gains__node-dot" />
                            <span className="gains__node-title">{gain.title}</span>
                            {activeGain === i && (
                                <div className="gains__node-tooltip">
                                    <p>{gain.description}</p>
                                </div>
                            )}
                            {/* Connection line to center */}
                            <svg
                                className="gains__connection"
                                style={{
                                    width: `${Math.abs(x) + 20}px`,
                                    height: `${Math.abs(y) + 20}px`,
                                }}
                            >
                                <line
                                    x1={x > 0 ? 0 : '100%'}
                                    y1={y > 0 ? 0 : '100%'}
                                    x2={x > 0 ? '100%' : 0}
                                    y2={y > 0 ? '100%' : 0}
                                    stroke="rgba(0,229,255,0.1)"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    );
                })}
            </div>

            {/* Mobile-friendly list */}
            <div className="gains__list">
                {GAINS.map((gain, i) => (
                    <div
                        key={gain.title}
                        className={`gains__list-item glass-card ${isVisible ? 'gains__list-item--visible' : ''}`}
                        style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                        <div className="gains__list-dot" />
                        <div>
                            <h4 className="gains__list-title">{gain.title}</h4>
                            <p className="gains__list-desc">{gain.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
