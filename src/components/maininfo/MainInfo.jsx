// src/components/maininfo/MainInfo.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaBoxOpen, FaGlobe, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import sliderimage1 from "../../assets/slider1.jpg";
import sliderimage2 from "../../assets/slider2.jpg";
import sliderimage3 from "../../assets/slider3.jpg";
import { LanguageContext } from "../../LanguageContext";
import { Link } from "react-router-dom";
import "./maininfo.scss";

export default function MainInfo() {
  const { lang } = useContext(LanguageContext);

  // State for the translations map:
  const [t, setT] = useState({});

  // Cycle images
  const images = [sliderimage1, sliderimage2, sliderimage3];
  const [current, setCurrent] = useState(0);

  // Fetch all translations on lang change
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
      .catch((err) => console.error("Failed to fetch translations:", err));
    return () => {
      mounted = false;
    };
  }, [lang]);

  // Image carousel interval
  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="maininfo-section">
      <div className="maininfo-container">
        {/* Left: crossfading framed image */}
        <div className="image-collage">
          <div className="frame" />
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className="main-img"
              style={{ opacity: current === i ? 1 : 0 }}
            />
          ))}
        </div>

        {/* Right: translated text */}
        <div className="content-area">
          <p className="subtitle">
            {t.publicity || "საჯაროობა & უსაფრთხოება"}
          </p>
          <h2 className="headline">
            {t.thirdslidertitle || "ევროპული გამოცდილება & მაღალი სტანდარტი !"}
          </h2>
          <p className="intro">
            {t.thirdsliderundertext ||
              "ევროპული გამოცდილება გულისხმობს საჯაროობის მაქსიმალურად მაღალ სტანდარტს, რომელიც..." }
          </p>

          <div className="info-grid">
            <div className="stats-block">
              <div className="stat-item">
                <FaBoxOpen className="stat-icon" />
                <div>
                  <p className="stat-number">9.5M</p>
                  <p className="stat-label">
                    {t.thirdsliderpackagesdelivered || "მიწოდებული ამანათი"}
                  </p>
                </div>
              </div>
              <div className="stat-item">
                <FaGlobe className="stat-icon" />
                <div>
                  <p className="stat-number">15.9M</p>
                  <p className="stat-label">
                    {t.thirdsliderWWC || "კლიენტი მსოფლიოს გარშემო"}
                  </p>
                </div>
              </div>
            </div>

            <div className="features-block">
              <ul>
                {[
                  t.thirdsliderHP || "უვნებელი ამანათები",
                  t.thirdsliderOM || "შეკვეთის მონიტორინგი",
                  t.thirdsliderPC || "მუდმივი კავშირი",
                  t.thirdsliderR  || "სანდოობა",
                ].map((text, i) => (
                  <li key={i}>
                    <FaCheckCircle className="check-icon" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link to={`/${lang.toLowerCase()}/about`} className="btn primary-btn">
            {t.thirdsliderbutton || "შეიტყვე მეტი ჩვენს შესახებ"}{" "}
            <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
