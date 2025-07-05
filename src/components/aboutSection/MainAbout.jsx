// src/components/MainAbout.jsx

import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaCheckCircle, FaStar, FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../../LanguageContext";
import { Link } from "react-router-dom";
import "./MainAbout.scss";
// Replace with your actual video path
import leftVideo from "../../assets/video1.mp4";

export default function MainAbout() {
  const videoRef = useRef(null);
  const { lang } = useContext(LanguageContext);

  // translations map
  const [t, setT] = useState({});

  // fetch all translations in one call
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then((res) => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => {
          map[alias] = value;
        });
        setT(map);
      })
      .catch((err) => console.error("Translations fetch failed:", err));
    return () => {
      mounted = false;
    };
  }, [lang]);

  // auto-play/pause the video via IntersectionObserver
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) vid.play().catch(() => {});
          else vid.pause();
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(vid);
    return () => {
      obs.unobserve(vid);
      obs.disconnect();
    };
  }, []);

  return (
    <section className="main-about">
      <div className="main-about__media">
        <video
          ref={videoRef}
          src={leftVideo}
          muted
          loop
          playsInline
          className="main-about__video"
        />
      </div>

      <div className="main-about__content">
        {/* subtitle */}
        <p className="subtitle">
          {t.secondsliderintro || "პასუხისმგებლობა & დროის მართვა"}
        </p>

        {/* title */}
        <h2 className="title">
          {t.secondslidertitle ||
            "ჩვენი მისიაა მივცეთ ბიზნესს საშუალება, რომ საკუთარი პროდუქციის მიწოდება შეძლონ..."}
        </h2>

        {/* description */}
        <p className="text">
          {t.secondsliderundertext ||
            "თქვენ თავდაჯრებულად შეგიძლიათ აგვირჩიოთ ჩვენ, როდესაც გჭირდებათ მიწოდება..."}
        </p>

        {/* features list */}
        <ul className="features">
          {[
            t.quality || "ხარისხის კონტროლი",
            t.deliveryguarantee || "100% მიწოდება",
            t.Proffesionals || "პროფესიონალები",
            t.security || "უსაფრთხოება",
          ].map((feat, i) => (
            <li key={i}>
              <FaCheckCircle className="icon" />
              {feat}
            </li>
          ))}
        </ul>

        {/* contact button */}
        <Link to={`/${lang.toLowerCase()}/contact`} className="btn">
          {t.contact || "შეგვეხმიანე"} <FaArrowRight className="btn-icon" />
        </Link>

        {/* stats */}
        <div className="stats">
          <div className="experience">
            {/* you can swap “5” for a dynamic number if you have one */}
            <span className="years">5</span>
            <span className="label">
              {t.exp || "წლიანი გამოცდილება"}
            </span>
          </div>
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="reviews">
              {t.clients || "კლიენტები 4.8 (1,567 გამოხმაურება)"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
