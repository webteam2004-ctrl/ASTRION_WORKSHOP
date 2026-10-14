import { useRef, useState, useEffect } from 'react';
import { SESSIONS } from '../../data/workshopData';
import './SessionsSection.css';

/* ============================================================
   SESSIONS SECTION — 3D Timeline through 3 sessions
   ============================================================ */

export default function SessionsSection() {
    const sectionRef = useRef();
    const [activeSession, setActiveSession] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1,
                -rect.top / (rect.height - window.innerHeight)
            ));
            const session = Math.min(2, Math.floor(progress * 3));
            setActiveSession(session);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    const transitions = [
        'CHAOS → IDEAS',
        'IDEAS → STRUCTURE',
        'STRUCTURE → VENTURE',
    ];

    return (
        <section className="sessions" ref={sectionRef} id="sessions">
            <div className="sessions__sticky">
                <div className="sessions__header">
                    <span className="section__label">THE 3-SESSION EXPERIENCE</span>
                    <h2 className="section__title">YOUR WORKSHOP PATHWAY</h2>
                </div>

                {/* Session indicator */}
                <div className="sessions__nav">
                    {SESSIONS.map((session, i) => (
                        <button
                            key={session.id}
                            className={`sessions__nav-item ${i === activeSession ? 'sessions__nav-item--active' : ''}`}
                            onClick={() => setActiveSession(i)}
                        >
                            <span className="sessions__nav-number">{session.label}</span>
                            <span className="sessions__nav-line" />
                        </button>
                    ))}
                </div>

                {/* Transition label */}
                <div className="sessions__transition">
                    <span className="sessions__transition-label">{transitions[activeSession]}</span>
                </div>

                {/* Session content */}
                <div className="sessions__content">
                    <div className="sessions__visual">
                        {/* Evolving visual for each session */}
                        <div className={`sessions__scene sessions__scene--${activeSession}`}>
                            {/* Session 1: scattered particles forming */}
                            {activeSession === 0 && (
                                <div className="sessions__particles">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="sessions__particle"
                                            style={{
                                                left: `${10 + Math.random() * 80}%`,
                                                top: `${10 + Math.random() * 80}%`,
                                                animationDelay: `${i * 0.15}s`,
                                                width: `${3 + Math.random() * 5}px`,
                                                height: `${3 + Math.random() * 5}px`,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            {/* Session 2: organized nodes */}
                            {activeSession === 1 && (
                                <div className="sessions__network">
                                    <div className="sessions__network-center" />
                                    {['Customer', 'Market', 'Solution', 'Value', 'Revenue'].map((label, i) => {
                                        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                                        const radius = 90;
                                        return (
                                            <div
                                                key={label}
                                                className="sessions__network-node"
                                                style={{
                                                    left: `calc(50% + ${Math.cos(angle) * radius}px - 30px)`,
                                                    top: `calc(50% + ${Math.sin(angle) * radius}px - 12px)`,
                                                    animationDelay: `${i * 0.15}s`,
                                                }}
                                            >
                                                <div className="sessions__network-node-dot" />
                                                <span className="sessions__network-node-label">{label}</span>
                                            </div>
                                        );
                                    })}
                                    {/* Connection lines via SVG */}
                                    <svg className="sessions__network-lines" viewBox="0 0 300 300">
                                        {[0, 1, 2, 3, 4].map(i => {
                                            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                                            const x = 150 + Math.cos(angle) * 90;
                                            const y = 150 + Math.sin(angle) * 90;
                                            return (
                                                <line
                                                    key={i}
                                                    x1="150" y1="150"
                                                    x2={x} y2={y}
                                                    stroke="rgba(0,229,255,0.2)"
                                                    strokeWidth="1"
                                                    className="sessions__network-line"
                                                    style={{ animationDelay: `${i * 0.2}s` }}
                                                />
                                            );
                                        })}
                                    </svg>
                                </div>
                            )}
                            {/* Session 3: full ecosystem */}
                            {activeSession === 2 && (
                                <div className="sessions__ecosystem">
                                    <div className="sessions__ecosystem-core" />
                                    <div className="sessions__ecosystem-ring sessions__ecosystem-ring--1" />
                                    <div className="sessions__ecosystem-ring sessions__ecosystem-ring--2" />
                                    <div className="sessions__ecosystem-ring sessions__ecosystem-ring--3" />
                                    <div className="sessions__ecosystem-pulse" />
                                    {['Prototype', 'Growth', 'Network', 'Strategy', 'Launch', 'Vision'].map((label, i) => {
                                        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                                        const radius = 100;
                                        return (
                                            <div
                                                key={label}
                                                className="sessions__ecosystem-node"
                                                style={{
                                                    left: `calc(50% + ${Math.cos(angle) * radius}px - 25px)`,
                                                    top: `calc(50% + ${Math.sin(angle) * radius}px - 10px)`,
                                                    animationDelay: `${i * 0.1}s`,
                                                }}
                                            >
                                                <span>{label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sessions__info">
                        <div className="sessions__info-meta">
                            <span className="sessions__info-label">{SESSIONS[activeSession].label}</span>
                            <span className="sessions__info-badge">{SESSIONS[activeSession].day} • {SESSIONS[activeSession].timeSlot}</span>
                        </div>
                        <h3 className="sessions__info-title">{SESSIONS[activeSession].title}</h3>
                        <div className="sessions__info-time">
                            <span>{SESSIONS[activeSession].date} | {SESSIONS[activeSession].time}</span>
                        </div>
                        <p className="sessions__info-desc">{SESSIONS[activeSession].description}</p>
                        <ul className="sessions__info-topics">
                            {SESSIONS[activeSession].topics.map(topic => (
                                <li key={topic} className="sessions__info-topic">
                                    <span className="sessions__info-topic-dot" />
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
