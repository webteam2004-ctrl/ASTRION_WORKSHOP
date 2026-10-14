import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS, WORKSHOP } from '../../data/workshopData';

/* ============================================================
   NAVIGATION — Floating minimal nav
   Hides on scroll down, shows on scroll up
   ============================================================ */

export default function Navigation() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHidden(currentY > lastScrollY.current && currentY > 100);
            setScrolled(currentY > 50);
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`nav ${hidden ? 'nav--hidden' : ''} ${scrolled ? 'nav--scrolled' : ''}`}>
            <a href={WORKSHOP.mainWebsiteUrl} className="nav__brand">
                {WORKSHOP.event}
            </a>

            <ul className={`nav__links ${mobileOpen ? 'nav__links--open' : ''}`}>
                {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="nav__link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div
                className="nav__mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
            >
                <span style={mobileOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
                <span style={mobileOpen ? { opacity: 0 } : {}} />
                <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
            </div>
        </nav>
    );
}
