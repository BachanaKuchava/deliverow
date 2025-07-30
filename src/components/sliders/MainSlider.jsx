// src/components/sliders/MainHero.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import video1 from "../../assets/video1.mp4";
import "./slider.scss";

export default function MainHero() {
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});
  const [loaded, setLoaded] = useState(false);

  // index of which title to show
  const [titleIdx, setTitleIdx] = useState(0);
  const titleKeys = [
    "mainslidertitle5",
    "mainslidertitle",
    "mainslidertitle2",
    "mainslidertitle3",
    "mainslidertitle4"
  ];
  const titles = titleKeys.map((key) => t[key] || "");

  // fetch translations
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
      .catch((err) => console.error("Translations fetch failed:", err))
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, [lang]);

  // rotate titles every 3s
  useEffect(() => {
    if (!loaded) return;
    setTitleIdx(0);
    const iv = setInterval(() => {
      setTitleIdx((i) => (i + 1) % titles.length);
    }, 3000);
    return () => clearInterval(iv);
  }, [loaded, titles.join("")]);

  return (
    <section className={`hero${loaded ? " hero--loaded" : ""}`}>
      <video className="hero__video" autoPlay loop muted playsInline>
        <source src={video1} type="video/mp4" />
      </video>
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__subtitle">
          {t.mainsliderintro || "სწრაფი & დაცული მიწოდება"}
        </p>

        <AnimatePresence mode="wait">
          {loaded && (
            <motion.h1
              key={titleIdx}
              className="hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {titles[titleIdx] || t.mainslidertitle}
            </motion.h1>
          )}
        </AnimatePresence>

        <p className="hero__text">
          {t.mainsliderundertext ||
            "ნახეთ, როგორ შეგვიძლია ვმართოთ თქვენი მიწოდება უფრო სწრაფად, ხელმისაწვდომ ფასად და უსაფრთხოდ."}
        </p>

        <Link to={`/${lang.toLowerCase()}/services`} className="hero__btn">
          {t.mainsliderbutton || "ნახე სრულად"}
          <span className="hero__btn-arrow">➜</span>
        </Link>
      </div>
    </section>
  );
}
