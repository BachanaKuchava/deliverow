import React from 'react';
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
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col footer__col--about">
          <div className="footer__logo">Deliverow</div>
          <p className="footer__desc">
            თქვენ თავდაჯრებულად შეგიძლიათ აგვირჩიოთ ჩვენ, როდესაც გჭირდებათ საკურიერო სერვისი
          </p>

          {/* REPLACED subscribe block with map */}
          <div className="footer__map">
            <iframe
              title="Deliverow Location"
              src="https://maps.google.com/maps?q=17b%20D.%20Guramishvili%20Ave%2C%20Tbilisi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <p className="footer__note">დ.გურამიშვილის გამზ. 17ბ</p>
        </div>

        <div className="footer__col footer__col--services">
          <h4 className="footer__heading">ჩვენი სერვისები</h4>
          <ul className="footer__list">
            <li>სტანდარტული მომსახურება</li>
            <li>ექსპრესს მომსახურება</li>
            <li>ექსპრესს+</li>
            <li>კორპორატიული შეთავაზება</li>
          </ul>
        </div>

        <div className="footer__col footer__col--links">
          <h4 className="footer__heading">გვერდები</h4>
          <ul className="footer__list">
            <li>How It’s Work</li>
            <li>Partners</li>
            <li>Testimonials</li>
            <li>Case Studies</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div className="footer__col footer__col--info">
          <h4 className="footer__heading">ინფორმაცია</h4>
          <ul className="footer__info-list">
            <li>
              <FaMapMarkerAlt className="info-icon" />
              <span>დ.გურამიშვილის გამზ. 17ბ</span>
            </li>
            <li>
              <FaPhone className="info-icon" />
              <span>(+995) 597-93-58-16</span>
            </li>
            <li>
              <FaClock className="info-icon" />
              <span>ორ – კვ: 8:00 – 22:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__copy">პროდუქტი ეკუთვნის ©Deliverow | ყველა უფლება დაცულია</p>
        <div className="footer__social">
          <a href="https://www.facebook.com/deliverow" target="blank" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://x.com/?lang=en" target="blank" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.whatsapp.com/" target="blank" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/" target="blank" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" target="blank" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}
