import { useState } from 'react';
import { FAQ_DATA, WORKSHOP } from '../../data/workshopData';
import './FaqSection.css';

/* ============================================================
   FAQ & VENUE
   ============================================================ */

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="faq-venue section">
            <div className="faq-venue__grid">
                {/* FAQ Area */}
                <div className="faq">
                    <span className="section__label">HAVE QUESTIONS?</span>
                    <h2 className="section__title" style={{ textAlign: 'left' }}>WORKSHOP FAQ</h2>

                    <div className="faq__list">
                        {FAQ_DATA.map((faq, i) => (
                            <div
                                key={i}
                                className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}
                                onClick={() => toggleFaq(i)}
                            >
                                <button className="faq-item__question">
                                    {faq.question}
                                    <span className="faq-item__icon">+</span>
                                </button>
                                <div className="faq-item__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Venue Info */}
                <div className="venue glass-card">
                    <div className="venue__bg" />
                    <div className="venue__content">
                        <span className="section__label">EVENT LOGISTICS</span>
                        <h3 className="venue__title">{WORKSHOP.event} × {WORKSHOP.organizer}</h3>

                        <div className="venue__details">
                            <div className="venue__detail">
                                <span className="venue__detail-label">WORKSHOP</span>
                                <span className="venue__detail-value">{WORKSHOP.title}</span>
                            </div>
                            <div className="venue__detail">
                                <span className="venue__detail-label">DATE</span>
                                <span className="venue__detail-value">23rd & 24th</span>
                            </div>
                            <div className="venue__detail">
                                <span className="venue__detail-label">SESSIONS</span>
                                <span className="venue__detail-value">3 Interactive Blocks</span>
                            </div>
                            <div className="venue__detail">
                                <span className="venue__detail-label">VENUE</span>
                                <span className="venue__detail-value">{WORKSHOP.venue}</span>
                            </div>
                            <div className="venue__detail">
                                <span className="venue__detail-label">STATUS</span>
                                <span className="venue__detail-value venue__detail-value--success">
                                    {WORKSHOP.registrationStatus === 'OPEN' ? 'REGISTRATIONS OPEN' : WORKSHOP.registrationStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
