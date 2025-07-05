// src/components/sliders/MainHero.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import { Link } from "react-router-dom";
import "./slider.scss";

export default function MainHero() {
  const { lang } = useContext(LanguageContext);
  const [t, setT]         = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoaded(false);

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
      .catch((err) => {
        console.error("Translations fetch failed:", err);
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, [lang]);

  return (
    <section className={`hero${loaded ? " hero--loaded" : ""}`}>
      <div className="hero__overlay" />

      <div className="hero__content">
        {/* subtitle from translations */}
        <p className="hero__subtitle">
          {t.mainsliderintro || "სწრაფი & დაცული მიწოდება"}
        </p>

        {/* title from translations */}
        {loaded && (
          <h1 className="hero__title">
            {t.mainslidertitle || "დროა, სწრაფ და უსაფრთხო მიწოდების სერვისზე გადასვლის"}
          </h1>
        )}

        {/* under-text from translations */}
        <p className="hero__text">
          {t.mainsliderundertext ||
            "ნახეთ, როგორ შეგვიძლია ვმართოთ თქვენი მიწოდება უფრო სწრაფად, ხელმისაწვდომ ფასად და უსაფრთხოდ."}
        </p>

        {/* button label from translations */}
        <Link to={`/${lang.toLowerCase()}/services`} className="hero__btn">
          {t.mainsliderbutton || "ნახე სრულად"}
          <span className="hero__btn-arrow">➜</span>
        </Link>
      </div>
    </section>
  );
}
