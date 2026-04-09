import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard UK delivery takes 3–5 working days. Express delivery (1–2 days) is available at checkout. Free standard delivery on orders over $100.' },
  { q: 'Can I return a product?', a: 'Yes — we offer a 30-day return policy on all unopened items. If a product is faulty or not as described, we\'ll cover return postage and offer a full refund or replacement.' },
  { q: 'Are your products suitable for vegans?', a: 'Many of our products are vegan-friendly. Each product page clearly states dietary suitability. Our vegan range includes plant-based proteins, BCAAs, and most vitamin supplements.' },
  { q: 'Do you offer subscription discounts?', a: 'Yes! Subscribe & Save gives you 10% off every order plus free delivery. You can pause or cancel anytime from your account dashboard.' },
  { q: 'Are your supplements third-party tested?', a: 'All products are manufactured in GMP-certified facilities and undergo independent third-party testing for purity, potency, and label accuracy.' },
];

const contactInfo = [
  { icon: '📞', title: 'Phone', detail: '(000) 123 - 456 78', sub: 'Mon–Fri, 9am–6pm' },
  { icon: '✉️', title: 'Email', detail: 'demo@demo.com', sub: 'We reply within 24 hours' },
  { icon: '💬', title: 'Live Chat', detail: 'Start a conversation', sub: 'Available during business hours' },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-content">
          <p className="section-subheading">Get In Touch</p>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-sub">We're here to help. Reach out and we'll get back to you shortly.</p>
        </div>
      </section>

      {/* Contact Info Strips */}
      <div className="contact-info-strip">
        {contactInfo.map((item, i) => (
          <div key={i} className="contact-info-card">
            <div className="contact-info-icon">{item.icon}</div>
            <div>
              <p className="contact-info-title">{item.title}</p>
              <p className="contact-info-detail">{item.detail}</p>
              <p className="contact-info-sub">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form + Map */}
      <section className="contact-main">
        {/* Form */}
        <div className="contact-form-wrap">
          <div className="contact-form-header">
            <p className="section-subheading">Send a Message</p>
            <h2 className="section-heading" style={{ fontSize: '38px', marginBottom: '8px' }}>How Can We Help?</h2>
            <p style={{ color: 'var(--color-gray-mid)', fontSize: '14px', marginBottom: '36px' }}>
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          {submitted && (
            <div className="contact-success">
              ✓ Message sent! We'll be in touch within 24 hours.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="contact-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="contact-field">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Order enquiry, product question..."
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="contact-field">
              <label>Message *</label>
              <textarea
                rows={6}
                placeholder="Tell us how we can help..."
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="contact-submit-btn">
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Map placeholder + store info */}
        <div className="contact-map-wrap">
          <div className="contact-map">
            <div className="contact-map-placeholder">
              <div className="map-bg" />
              <div className="map-pin-wrap">
                <div className="map-pin">📍</div>
                <div className="map-label">Bayou Muscle HQ</div>
              </div>
            </div>
          </div>
          <div className="contact-store-info">
            <h4 className="contact-store-title">Our Location</h4>
            <p className="contact-store-addr">2nd Floor, Wellness Plaza<br />Main Street, City Center<br />United Kingdom</p>
            <div className="contact-hours">
              <p className="contact-hours-title">Opening Hours</p>
              <div className="contact-hours-list">
                <div className="hours-row"><span>Monday – Friday</span><span>9:00 – 18:00</span></div>
                <div className="hours-row"><span>Saturday</span><span>10:00 – 16:00</span></div>
                <div className="hours-row closed"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-faq-inner">
          <div className="contact-faq-header">
            <p className="section-subheading">FAQ</p>
            <h2 className="section-heading" style={{ fontSize: '42px', marginBottom: '0' }}>
              Frequently Asked<br />Questions
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="contact-cta-section">
        <div className="contact-cta-bg" />
        <div className="contact-cta-inner">
          <h2 className="contact-cta-title">Stay in the Loop</h2>
          <p className="contact-cta-sub">
            Subscribe for exclusive deals, new product launches, and expert nutrition tips.
          </p>
          <div className="contact-cta-form">
            <input type="email" placeholder="Enter your email address" className="cta-email-input" />
            <button className="cta-subscribe-btn">Subscribe & Save 10%</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
