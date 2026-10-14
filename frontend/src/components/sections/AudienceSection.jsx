import { AUDIENCES } from '../../data/workshopData';
import './AudienceSection.css';

/* ============================================================
   AUDIENCE — Who should attend?
   Branching pathway leading to Venture Launchpad
   ============================================================ */

export default function AudienceSection() {
    return (
        <section className="audience section">
            <span className="section__label">WHO SHOULD ATTEND?</span>
            <h2 className="section__title">THIS WORKSHOP IS FOR YOU</h2>
            <p className="section__subtitle">
                Whether you're an aspiring entrepreneur or a curious explorer —
                Venture Launchpad meets you where you are.
            </p>

            <div className="audience__paths">
                {AUDIENCES.map((audience, i) => (
                    <div
                        key={audience.title}
                        className="audience__path glass-card"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <div className="audience__path-connector">
                            <div className="audience__path-line" />
                            <div className="audience__path-dot" />
                        </div>
                        <h3 className="audience__path-title">{audience.title}</h3>
                        <p className="audience__path-desc">{audience.description}</p>
                    </div>
                ))}

                {/* Central convergence */}
                <div className="audience__destination">
                    <div className="audience__destination-glow" />
                    <span className="audience__destination-label">VENTURE LAUNCHPAD</span>
                </div>
            </div>
        </section>
    );
}
