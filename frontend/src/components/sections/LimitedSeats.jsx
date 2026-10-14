import './LimitedSeats.css';

/* ============================================================
   LIMITED SEATS — Floating holographic status system
   ============================================================ */

export default function LimitedSeats() {
    const scrollToRegister = () => {
        const el = document.querySelector('#register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="limited section">
            <div className="limited__hologram">
                {/* Animated capacity ring */}
                <div className="limited__ring">
                    <svg viewBox="0 0 200 200" className="limited__ring-svg">
                        <circle
                            cx="100" cy="100" r="85"
                            fill="none"
                            stroke="rgba(0,229,255,0.08)"
                            strokeWidth="2"
                        />
                        <circle
                            cx="100" cy="100" r="85"
                            fill="none"
                            stroke="url(#ringGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="534"
                            strokeDashoffset="134"
                            className="limited__ring-fill"
                        />
                        <defs>
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00e5ff" />
                                <stop offset="100%" stopColor="#7c4dff" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="limited__ring-content">
                        <span className="limited__status-icon">◉</span>
                        <h3 className="limited__title">LIMITED SEATS</h3>
                        <span className="limited__subtitle">REGISTRATION OPEN</span>
                    </div>
                </div>

                {/* Floating particles */}
                <div className="limited__particles">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="limited__particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${3 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <p className="limited__message">
                Secure your place in Venture Launchpad before slots run out.
            </p>

            <button className="btn btn--primary btn--large" onClick={scrollToRegister}>
                RESERVE MY SLOT →
                <span className="btn__glow" />
            </button>
        </section>
    );
}
