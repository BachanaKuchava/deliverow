// src/pages/contact/Contact.jsx
import React, { useState, useEffect } from 'react';
import './contact.scss';

export default function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger the animation after mount
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`contact-section${visible ? ' appear' : ''}`}>
      <div className="contact-card">
        <h2 className="contact-card__title">შეგვეხმიანე</h2>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">სრული სახელი</label>
              <input id="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">ელ.ფოსტა</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="phone">ტელეფონის ნომერი</label>
              <input id="phone" type="tel" placeholder="+995 567 643 633" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">მესიჯი</label>
              <textarea
                id="message"
                rows="5"
                placeholder="დაწერეთ თქვენი შეტყობინება აქ..."
                required
              />
            </div>
          </div>
          <button type="submit" className="btn submit-btn">
            გააგზავნე მესიჯი
          </button>
        </form>
      </div>
    </section>
  );
}
