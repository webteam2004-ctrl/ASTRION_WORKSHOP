import { useRef, useState, useEffect } from 'react';
import { JOURNEY_STAGES } from '../../data/workshopData';
import './JourneySection.css';

/* ============================================================
   JOURNEY SECTION — FROM AN IDEA TO A VENTURE
   Visual transformation of idea → venture through scroll
   ============================================================ */

export default function JourneySection() {
    const sectionRef = useRef();
    const [activeStage, setActiveStage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionProgress = Math.max(0, Math.min(1,
                -rect.top / (rect.height - window.innerHeight)
            ));
            const stage = Math.min(
                JOURNEY_STAGES.length - 1,
                Math.floor(sectionProgress * JOURNEY_STAGES.length)
            );
            setActiveStage(stage);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    return (
        <section className="journey" ref={sectionRef} id="experience">
            <div className="journey__sticky">
                <div className="journey__header">
                    <span className="section__label">THE TRANSFORMATION</span>
                    <h2 className="section__title">FROM AN IDEA TO A VENTURE</h2>
                </div>

                {/* Visual timeline */}
                <div className="journey__timeline">
                    {JOURNEY_STAGES.map((stage, i) => (
                        <div
                            key={stage.label}
                            className={`journey__stage ${i === activeStage ? 'journey__stage--active' : ''} ${i < activeStage ? 'journey__stage--complete' : ''}`}
                        >
                            <div className="journey__stage-dot">
                                <div className="journey__stage-dot-inner" />
                            </div>
                            {i < JOURNEY_STAGES.length - 1 && (
                                <div className={`journey__stage-line ${i < activeStage ? 'journey__stage-line--filled' : ''}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Active stage display */}
                <div className="journey__display">
                    <div className="journey__display-visual">
                        {/* Particle visualization based on stage */}
                        <div className={`journey__orb journey__orb--stage-${activeStage}`}>
                            <div className="journey__orb-core" />
                            <div className="journey__orb-ring journey__orb-ring--1" />
                            <div className="journey__orb-ring journey__orb-ring--2" />
                            <div className="journey__orb-ring journey__orb-ring--3" />
                            {activeStage >= 2 && (
                                <>
                                    <div className="journey__orb-node journey__orb-node--1" />
                                    <div className="journey__orb-node journey__orb-node--2" />
                                    <div className="journey__orb-node journey__orb-node--3" />
                                    <div className="journey__orb-node journey__orb-node--4" />
                                </>
                            )}
                            {activeStage >= 4 && (
                                <>
                                    <div className="journey__orb-node journey__orb-node--5" />
                                    <div className="journey__orb-node journey__orb-node--6" />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="journey__display-content">
                        <span className="journey__stage-number">
                            {String(activeStage + 1).padStart(2, '0')} / {String(JOURNEY_STAGES.length).padStart(2, '0')}
                        </span>
                        <h3 className="journey__stage-label" key={activeStage}>
                            {JOURNEY_STAGES[activeStage].label}
                        </h3>
                        <p className="journey__stage-description">
                            {JOURNEY_STAGES[activeStage].description}
                        </p>
                    </div>
                </div>

                {/* Flow arrows */}
                <div className="journey__flow">
                    {JOURNEY_STAGES.map((stage, i) => (
                        <span
                            key={stage.label}
                            className={`journey__flow-item ${i === activeStage ? 'journey__flow-item--active' : ''}`}
                        >
                            {stage.label}
                            {i < JOURNEY_STAGES.length - 1 && <span className="journey__flow-arrow">→</span>}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
