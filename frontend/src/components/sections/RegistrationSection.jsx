import { useState } from 'react';
import { WORKSHOP } from '../../data/workshopData';
import { submitRegistration } from '../../services/registrationService';
import './RegistrationSection.css';

/* ============================================================
   REGISTRATION — Integrated into the 3D environment
   Full Two-Day Workshop Integration:
   2 DAYS · 23–24 OCTOBER 2026 · VVIT UNIVERSITY
   VENTURE LAUNCHPAD: From Idea Generation to Business Creation
   LIMITED SEATS / SLOTS AVAILABLE
   ============================================================ */

export default function RegistrationSection({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    website: '', // Honeypot field for spam prevention
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoNotice, setInfoNotice] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [registrationOutcome, setRegistrationOutcome] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoNotice(null);

    try {
      const result = await submitRegistration(formData);

      if (result.success) {
        setRegistrationOutcome(result);
        setSubmitted(true);
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result);
        }
      } else if (result.needsConfig) {
        setInfoNotice(result.message);
      } else {
        setErrorMsg(result.message || 'Registration could not be completed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error occurred. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration section" id="register">
      <span className="section__label">REGISTRATION PORTAL</span>
      <h2 className="section__title">YOUR JOURNEY STARTS HERE</h2>
      <p className="section__subtitle">
        Join the Venture Launchpad workshop at ASTRION 2K26.
      </p>

      {/* Two-Day Workshop Summary Cards */}
      <div className="registration__meta-strip">
        <div className="meta-item glass-card">
          <span className="meta-item__label">WORKSHOP DURATION</span>
          <span className="meta-item__value">2 DAYS · 23–24 OCTOBER 2026</span>
        </div>
        <div className="meta-item glass-card">
          <span className="meta-item__label">CAMPUS VENUE</span>
          <span className="meta-item__value">VVIT UNIVERSITY</span>
        </div>
        <div className="meta-item glass-card">
          <span className="meta-item__label">PROGRAM TRACK</span>
          <span className="meta-item__value">VENTURE LAUNCHPAD</span>
        </div>
        <div className="meta-item glass-card">
          <span className="meta-item__label">SEAT AVAILABILITY</span>
          <span className="meta-item__value meta-item__value--accent">LIMITED SLOTS AVAILABLE</span>
        </div>
      </div>

      <div className="registration__tagline-notice">
        <span>From Idea Generation to Business Creation</span>
      </div>

      {/* Terminal UI Form */}
      <div className="terminal glass-card">
        <div className="terminal__header">
          <div className="terminal__dots">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
          </div>
          <span className="terminal__title">SYSTEM ID: ASTRION/VL-REG · 2-DAY ACCESS</span>
          <span className="terminal__status">PORTAL READY</span>
        </div>

        <div className="terminal__body">
          {/* Status info message if awaiting final portal endpoint */}
          {infoNotice && (
            <div className="terminal-alert terminal-alert--info">
              <span className="terminal-alert__icon">ℹ️</span>
              <div>
                <strong>ORGANIZER INTEGRATION NOTICE:</strong>
                <p>{infoNotice}</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="terminal-alert terminal-alert--error">
              <span className="terminal-alert__icon">⚠️</span>
              <div>
                <strong>SYSTEM ALERT:</strong>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="terminal-success">
              <span className="terminal-success__check">✓</span>
              <h3 className="terminal-success__title">REGISTRATION CONFIRMED</h3>
              <p className="terminal-success__desc">
                Your workshop registration for the two-day experience (23–24 October 2026) has been successfully recorded in the database.
              </p>
              {registrationOutcome?.emailStatus === 'sent' && (
                <div style={{ marginTop: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#00e5ff' }}>
                  ✉️ Confirmation email successfully dispatched to <strong>{registrationOutcome?.data?.email || formData.email}</strong>.
                </div>
              )}
              {registrationOutcome?.emailStatus === 'failed' && (
                <div style={{ marginTop: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255, 179, 0, 0.1)', border: '1px solid rgba(255, 179, 0, 0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#ffb300' }}>
                  ⚠️ {registrationOutcome?.emailNotice || 'Confirmation email service is pending server configuration. Your registration is safely recorded.'}
                </div>
              )}
              <div style={{ marginTop: '1.2rem' }}>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      college: '',
                      department: '',
                      year: '',
                      website: '',
                    });
                    setRegistrationOutcome(null);
                    setSubmitted(false);
                  }}
                >
                  SUBMIT ANOTHER RESPONSE
                </button>
              </div>
            </div>
          ) : (
            <form className="terminal__form" onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-field">
                  <label className="form-field__label">FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    className="form-field__input"
                    placeholder="Enter full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-field__label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    className="form-field__input"
                    placeholder="name@institution.edu"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-field">
                  <label className="form-field__label">PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-field__input"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-field__label">COLLEGE / INSTITUTION</label>
                  <input
                    type="text"
                    name="college"
                    className="form-field__input"
                    placeholder="VVIT University / Affiliated Institution"
                    required
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-field">
                  <label className="form-field__label">DEPARTMENT</label>
                  <input
                    type="text"
                    name="department"
                    className="form-field__input"
                    placeholder="e.g. Electrical & Electronics, CSE"
                    required
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-field__label">YEAR OF STUDY</label>
                  <select
                    name="year"
                    className="form-field__select"
                    required
                    value={formData.year}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="Postgraduate/Research">Postgraduate / Research Scholar</option>
                    <option value="Faculty/Other">Faculty / Other</option>
                  </select>
                </div>
              </div>

              {/* Anti-bot Honeypot Field (hidden from genuine users) */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="terminal__footer">
                <button
                  type="submit"
                  className={`btn btn--primary btn--large terminal__submit ${loading ? 'terminal__submit--loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'TRANSMITTING CREDENTIALS...' : 'REGISTER FOR THE WORKSHOP'}
                  {!loading && <span className="btn__glow" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
