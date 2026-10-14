import { useState } from 'react';
import './WhySection.css';

/* ============================================================
   WHY SECTION — Interactive concept exploration
   THINK → CREATE → VALIDATE → BUILD → LAUNCH
   ============================================================ */

const CONCEPTS = [
    {
        label: 'THINK',
        description: 'Cultivate an entrepreneurial mindset. Learn to see problems as opportunities.',
        visual: 'brain',
    },
    {
        label: 'CREATE',
        description: 'Transform abstract thoughts into structured, actionable ideas.',
        visual: 'build',
    },
    {
        label: 'VALIDATE',
        description: 'Test your assumptions with real-world feedback before investing.',
        visual: 'scan',
    },
    {
        label: 'BUILD',
        description: 'Develop business models and prototypes that bring your idea to life.',
        visual: 'blocks',
    },
    {
        label: 'LAUNCH',
        description: 'Prepare your venture for the real world with go-to-market strategies.',
        visual: 'rocket',
    },
];

export default function WhySection() {
    const [activeConcept, setActiveConcept] = useState(null);

    return (
        <section className="why section">
            <span className="section__label">THE ENTREPRENEURIAL JOURNEY</span>
            <h2 className="section__title">WHY THIS WORKSHOP?</h2>
            <p className="section__subtitle">
                Five pillars that transform how you think about building ventures.
            </p>

            <div className="why__concepts">
                {CONCEPTS.map((concept, i) => (
                    <div
                        key={concept.label}
                        className={`why__concept glass-card ${activeConcept === i ? 'why__concept--active' : ''}`}
                        onMouseEnter={() => setActiveConcept(i)}
                        onMouseLeave={() => setActiveConcept(null)}
                    >
                        {/* Abstract visual */}
                        <div className={`why__visual why__visual--${concept.visual}`}>
                            <div className="why__visual-core">
                                {concept.visual === 'brain' && (
                                    <>
                                        <div className="why__particle why__particle--1" />
                                        <div className="why__particle why__particle--2" />
                                        <div className="why__particle why__particle--3" />
                                        <div className="why__particle why__particle--4" />
                                        <div className="why__particle why__particle--5" />
                                    </>
                                )}
                                {concept.visual === 'build' && (
                                    <div className="why__structure">
                                        <div className="why__structure-block why__structure-block--1" />
                                        <div className="why__structure-block why__structure-block--2" />
                                        <div className="why__structure-block why__structure-block--3" />
                                    </div>
                                )}
                                {concept.visual === 'scan' && (
                                    <div className="why__scanner">
                                        <div className="why__scanner-ring" />
                                        <div className="why__scanner-line" />
                                    </div>
                                )}
                                {concept.visual === 'blocks' && (
                                    <div className="why__blocks">
                                        <div className="why__block why__block--1" />
                                        <div className="why__block why__block--2" />
                                        <div className="why__block why__block--3" />
                                        <div className="why__block why__block--4" />
                                    </div>
                                )}
                                {concept.visual === 'rocket' && (
                                    <div className="why__launch">
                                        <div className="why__launch-core" />
                                        <div className="why__launch-trail" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <span className="why__concept-number">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="why__concept-label">{concept.label}</h3>
                        <p className="why__concept-desc">{concept.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
