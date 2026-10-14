import { WORKSHOP } from '../../data/workshopData';
import './FinalSection.css';

/* ============================================================
   FINAL SECTION — The Innovation Core Culmination
   Clear localized dark glassmorphism panel behind the headline and CTA.
   Reduced central object dominance, no obstruction of buttons or text.
   ============================================================ */

export default function FinalSection() {
    const scrollToRegister = () => {
        const el = document.querySelector('#register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="final section">
            {/* Localized Dark Glassmorphism Container */}
            <div className="final__glass-panel glass-card">
                
                {/* 4 Interconnected Core Systems Tags */}
                <div className="final__pillars">
                    <div className="final__pillar-tag">
                        <span className="final__pillar-dot" />
                        <span>SOLAR ENERGY</span>
                    </div>
                    <div className="final__pillar-tag">
                        <span className="final__pillar-dot final__pillar-dot--ev" />
                        <span>ELECTRIC MOBILITY</span>
                    </div>
                    <div className="final__pillar-tag">
                        <span className="final__pillar-dot final__pillar-dot--innov" />
                        <span>INNOVATION</span>
                    </div>
                    <div className="final__pillar-tag">
                        <span className="final__pillar-dot final__pillar-dot--ent" />
                        <span>ENTREPRENEURSHIP</span>
                    </div>
                </div>

                {/* Final Headline */}
                <h2 className="final__title">
                    <span className="final__title-line">IDEAS INSPIRE.</span>
                    <span className="final__title-line holo-text">INNOVATION MOVES US FORWARD.</span>
                </h2>

                <div className="final__branding">
                    <span className="final__brand-name">VENTURE LAUNCHPAD</span>
                    <span className="final__brand-sub">ASTRION 2K26 × IIC</span>
                    <span className="final__brand-date">23–24 OCTOBER 2026</span>
                </div>

                <div className="final__actions">
                    <button className="btn btn--primary btn--large" onClick={scrollToRegister}>
                        REGISTER NOW
                        <span className="btn__glow" />
                    </button>
                    <a
                        href={WORKSHOP.mainWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--ghost btn--large"
                    >
                        ← RETURN TO ASTRION 2K26
                    </a>
                </div>
            </div>

            {/* Footer Minimal */}
            <footer className="footer">
                <p>© 2026 Institution's Innovation Council (IIC), VVIT University × ASTRION 2K26.</p>
            </footer>
        </section>
    );
}
