// src/pages/contact/Contact.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../../LanguageContext';
import './contact.scss';

export default function Contact() {
  const { lang } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  const [t, setT] = useState({});

  // trigger the appear animation
  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(tid);
  }, []);

  // fetch translations for this page
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then(res => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => {
          map[alias] = value;
        });
        setT(map);
      })
      .catch(err => console.error('Contact translations failed:', err));
    return () => { mounted = false };
  }, [lang]);

  return (
    <section className={`contact-section${visible ? ' appear' : ''}`}>
      <div className="contact-card">
        <h2 className="contact-card__title">
          {t.contactstitle || 'შეგვეხმიანე'}
        </h2>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                {t.contactfullname || 'სრული სახელი'}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t.contactfullname || 'Your Name'}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                {t.email || 'ელ.ფოსტა'}
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="phone">
                {t.contacttelephone || 'ტელეფონის ნომერი'}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+995 567 643 633"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">
                {t.contactmessege || 'მესიჯი'}
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder={t.contactmessageplaceholder || 'დაწერეთ თქვენი შეტყობინება აქ...'}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn submit-btn">
            {t.contactbuttoninfo || 'გააგზავნე მესიჯი'}
          </button>
        </form>
      </div>
    </section>
  );
}
