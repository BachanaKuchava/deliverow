// src/components/footer/Footer.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../LanguageContext';
import './footer.scss';

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});
  const [services, setServices] = useState([]);

  // 1) Fetch all translations on language change
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
      .catch(err => console.error('Footer translations failed:', err));
    return () => { mounted = false; };
  }, [lang]);

  // 2) Fetch services list on language change
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/services`)
      .then(res => {
        if (!mounted) return;
        // the posts array
        setServices(res.data.data.category.posts.data || []);
      })
      .catch(err => console.error('Footer services fetch failed:', err));
    return () => { mounted = false; };
  }, [lang]);

  return (
    <footer className="footer">
      <div className="footer__top">

        {/* ABOUT */}
        <div className="footer__col footer__col--about">
          <div className="footer__logo">Deliverow</div>
          <p className="footer__desc">
            {t.footertext || 'თქვენ თავდაჯრებულად შეგიძლიათ აგვირჩიოთ ჩვენ, როდესაც გჭირდებათ საკურიერო სერვისი'}
          </p>
          <div className="footer__map">
            <iframe
              title="Deliverow Location"
              src="https://maps.google.com/maps?q=17b%20D.%20Guramishvili%20Ave%2C%20Tbilisi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="footer__note">
            {t.office || 'ოფისის მისამართი'}:&nbsp;{t.location || 'დ.გურამიშვილის გამზ. 17ბ'}
          </p>
        </div>

        {/* SERVICES - dynamically generated */}
        <div className="footer__col footer__col--services">
          <h4 className="footer__heading">
            {t.footerservices || 'ჩვენი სერვისები'}
          </h4>
          <ul className="footer__list">
            {services.map(post => (
              <li key={post.id}>
                <Link to={`/${lang.toLowerCase()}/services/${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PAGES LINKS */}
        <div className="footer__col footer__col--links">
          <h4 className="footer__heading">
            {t.footerpages || 'გვერდები'}
          </h4>
          <ul className="footer__list">
            <li><Link to={`/${lang.toLowerCase()}`}>{t.mainpage || 'მთავარი'}</Link></li>
            <li><Link to={`/${lang.toLowerCase()}/about`}>{t.menuabout || 'ჩვენს შესახებ'}</Link></li>
            <li><Link to={`/${lang.toLowerCase()}/services`}>{t.menuservices || 'სერვისები'}</Link></li>
            <li><Link to={`/${lang.toLowerCase()}/blog`}>{t.menublog || 'სიახლეები'}</Link></li>
            <li><Link to={`/${lang.toLowerCase()}/contact`}>{t.menucontacts || 'კონტაქტი'}</Link></li>
          </ul>
        </div>

        {/* INFO */}
        <div className="footer__col footer__col--info">
          <h4 className="footer__heading">
            {t.footerinfo || 'ინფორმაცია'}
          </h4>
          <ul className="footer__info-list">
            <li>
              <FaMapMarkerAlt className="info-icon" />
              <span>{t.location || 'დ.გურამიშვილის გამზ. 17ბ'}</span>
            </li>
            <li>
              <FaPhone className="info-icon" />
              <span>
                {t.Hotline || 'ცხელი ხაზი'}:&nbsp;(+995) 597-93-58-16
              </span>
            </li>
            <li>
              <FaClock className="info-icon" />
              <span>
                {t.time || 'ორშ-კვ'}:&nbsp;8:00 – 22:00
              </span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__copy">
          {t.footerfirstundertext || 'პროდუქტი ეკუთვნის'} ©Deliverow | {t.footerrights || 'ყველა უფლება დაცულია'}
        </p>
        <div className="footer__social">
          <a href="https://www.facebook.com/deliverow" target="_blank" rel="noopener noreferrer"><FaFacebookF/></a>
          <a href="https://x.com/?lang=en"            target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
          <a href="https://www.whatsapp.com/"         target="_blank" rel="noopener noreferrer"><FaWhatsapp/></a>
          <a href="https://www.instagram.com/"        target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
          <a href="https://www.youtube.com"           target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
        </div>
      </div>
    </footer>
  );
}
