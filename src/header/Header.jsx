import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaUser,
  FaTimes,
  FaGlobe,
  FaBars
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import "./header.scss";
import logo from "../assets/logo.png";

export default function Header() {
  const { lang, setLang } = useContext(LanguageContext);
  const [helpOpen, setHelpOpen]     = useState(false);
  const [visible, setVisible]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing]       = useState(false);
  const [t, setT]                   = useState({});
  const menuRef                     = useRef(null);
  const location                    = useLocation();

  // 1) Fetch translations on `lang` change
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
      .catch(err => console.error("Translations fetch failed:", err));
    return () => { mounted = false; };
  }, [lang]);

  // 2) Fade-in on route change
  useEffect(() => {
    setVisible(false);
    const tid = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(tid);
  }, [location]);

  // 3) Mobile menu close animation
  const handleMobileClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setMobileOpen(false);
    }, 300);
  };

  // 4) Click-outside to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleMobileClose();
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [mobileOpen]);

  // 5) Toggle language
  const toggleLang = () => setLang(lang === "EN" ? "KA" : "EN");

  return (
    <>
      <div className={`site-header${visible ? " appear" : ""}`}>
        {/* UPPER HEADER */}
        <div className="upper-header">
          <div className="container">
            <div className="upper-header__left">
              <div className="upper-header__item">
                <FaMapMarkerAlt />{" "}
                <span>{t.location || "დ.გურამიშვილის გამზ. 17ბ"}</span>
              </div>
              <div className="upper-header__item">
                <FaEnvelope />{" "}
                <span>deliverow@gmail.com</span>
              </div>
              <div className="upper-header__item">
                <FaClock />{" "}
                <span>
                  {t.time || "ორშ-კვ"}: 8:00–22:00
                </span>
              </div>
            </div>
            <div className="upper-header__right">
              <a href="#" className="upper-header__link">Help Center</a>
              <a href="#" className="upper-header__link">Find Store</a>
              <span className="upper-header__divider" />
              <span className="upper-header__follow">
                {t.upperheadersub || "გამოგვიწერე"}
              </span>
              <FaFacebookF className="upper-header__icon" />
              <FaTwitter    className="upper-header__icon" />
              <FaWhatsapp   className="upper-header__icon" />
              <FaInstagram  className="upper-header__icon" />
              <FaYoutube    className="upper-header__icon" />
            </div>
          </div>
        </div>

        {/* UNDER HEADER */}
        <div className="under-header">
          <div className="under-header__container">
            <button
              className="burger-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <img
              className="logo-icon"
              src={logo}
              onClick={() => setHelpOpen(true)}
              aria-label="Help"
            />

            <div className="mobilelogo">
              <img src={logo} className="logo-icon-mobile" />
              <Link to={`/${lang.toLowerCase()}`} className="logolink mobilelogolink">
               Deliverow
              </Link>
            </div>

            <div className="logo">
              <Link to={`/${lang.toLowerCase()}`} className="logolink">
                Deliverow
              </Link>
            </div>

            <nav className="menu">
              <Link to={`/${lang.toLowerCase()}`}>{t.mainpage || "მთავარი"}</Link>
              <Link to={`/${lang.toLowerCase()}/about`}>{t.menuabout || "ჩვენს შესახებ"}</Link>
              <Link to={`/${lang.toLowerCase()}/services`}>{t.menuservices || "სერვისები"}</Link>
              <Link to={`/${lang.toLowerCase()}/blog`}>{t.menublog || "სიახლეები"}</Link>
              <Link to={`/${lang.toLowerCase()}/contact`}>{t.menucontacts || "კონტაქტი"}</Link>
            </nav>

            <div className="right-block">
              <button
                className="lang-selector__btn"
                onClick={toggleLang}
                aria-label="Toggle Language"
              >
                <FaGlobe />
                <span className="lang-selector__current">{lang}</span>
              </button>

              <div className="divider" />

              <div className="phone-block">
                <div className="icon"><FaPhoneAlt/></div>
                <div className="phone-text">
                  <span className="phone-label">
                    {t.Hotline || "ცხელი ხაზი"}:
                  </span>
                  <span className="phone-number">(+995) 597-93-58-16</span>
                </div>
              </div>

              <Link to={`/${lang.toLowerCase()}/login`} className="login-button">
                <FaUser className="login-icon" /> {t.login || "შესვლა"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileOpen && (
        <div ref={menuRef} className={`mobile-menu${closing ? " closing" : ""}`}>
          <button
            className="mobile-menu__close"
            onClick={handleMobileClose}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          <ul className="mobile-menu__nav">
            {/* desktop‐style language toggle */}
            <li>
              <button
                className="lang-selector__btn"
                onClick={toggleLang}
                aria-label="Toggle Language"
              >
                <FaGlobe />
                <span className="lang-selector__current">{lang}</span>
              </button>
            </li>
            <li>
              <Link to={`/${lang.toLowerCase()}`} onClick={handleMobileClose}>
                {t.mainpage || "მთავარი"}
              </Link>
            </li>
            <li>
              <Link to={`/${lang.toLowerCase()}/about`} onClick={handleMobileClose}>
                {t.menuabout || "ჩვენს შესახებ"}
              </Link>
            </li>
            <li>
              <Link to={`/${lang.toLowerCase()}/services`} onClick={handleMobileClose}>
                {t.menuservices || "სერვისები"}
              </Link>
            </li>
            <li>
              <Link to={`/${lang.toLowerCase()}/blog`} onClick={handleMobileClose}>
                {t.menublog || "სიახლეები"}
              </Link>
            </li>
            <li>
              <Link to={`/${lang.toLowerCase()}/contact`} onClick={handleMobileClose}>
                {t.menucontacts || "კონტაქტი"}
              </Link>
            </li>
            {/* desktop‐style login button */}
            <li>
              <Link
                to={`/${lang.toLowerCase()}/login`}
                className="login-button"
                onClick={handleMobileClose}
              >
                <FaUser className="login-icon" /> {t.login || "შესვლა"}
              </Link>
            </li>
          </ul>

          <div className="mobile-menu__socials">
            <FaFacebookF />
            <FaTwitter />
            <FaWhatsapp />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      )}

      {/* HELP PANEL */}
      <div className={`help-panel${helpOpen ? " active" : ""}`}>
        <button className="help-close" onClick={() => setHelpOpen(false)}>
          <FaTimes />
        </button>
        <div className="help-panel__logo"><span>Deliverow</span></div>
        <hr />
        <h4>{t.office || "ოფისის მისამართი"}</h4>
        <p>{t.location || "დ.გურამიშვილის გამზ. 17ბ"}</p>
        <p>თბილისი საქართველო</p>
        <h4>{t.Hotline || "ცხელი ხაზი"}</h4>
        <p>(+995) 597-93-58-16</p>
        <h4>{t.email || "ელ.ფოსტა"}</h4>
        <p>deliverow@gmail.com</p>
        <div className="socials">
          <FaFacebookF />
          <FaTwitter />
          <FaWhatsapp />
          <FaInstagram />
        </div>
      </div>
    </>
  );
}
