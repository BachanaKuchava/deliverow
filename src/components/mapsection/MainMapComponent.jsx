// src/components/serviceSection/MapPricing.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";
import "./MapPricing.scss";

export default function MapPricing() {
  const { lang } = useContext(LanguageContext);
  // normalize strictly to "ka" | "en"
  const L = String(lang || "ka").toLowerCase() === "en" ? "en" : "ka";
  const t = (ka, en) => (L === "en" ? en : ka);

  // Cities (names translated) + prices
  const cities = [
    { name: { ka: "თბილისი",    en: "Tbilisi" },      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ბათუმი",     en: "Batumi" },       prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ქუთაისი",    en: "Kutaisi" },      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ზუგდიდი",    en: "Zugdidi" },      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ფოთი",       en: "Poti" },         prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ქობულეთი",   en: "Kobuleti" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ჩაქვი",      en: "Chakvi" },       prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ხაშური",     en: "Khashuri" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ახალციხე",   en: "Akhaltsikhe" },  prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ახალქალაქი", en: "Akhalqalaqi" },  prices: ["12₾","13₾","14₾","20₾","25₾","35₾","80₾","150₾"] },
    { name: { ka: "ნინოწმინდა", en: "Ninotsminda" },  prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: { ka: "წალკა",      en: "Tsalka" },       prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: { ka: "რუსთავი",    en: "Rustavi" },      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "გარდაბანი",  en: "Gardabani" },    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "მარნეული",   en: "Marneuli" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "საგურამო",   en: "Saguramo" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "მცხეთა",     en: "Mtskheta" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "გორი",       en: "Gori" },         prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "თელავი",     en: "Telavi" },       prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
  ];

  const categories = [
    { label: { ka: "1კგ-მდე",  en: "Up to 1kg" } },
    { label: { ka: "3კგ-მდე",  en: "Up to 3kg" } },
    { label: { ka: "5კგ-მდე",  en: "Up to 5kg" } },
    { label: { ka: "10კგ-მდე", en: "Up to 10kg" } },
    { label: { ka: "20კგ-მდე", en: "Up to 20kg" } },
    { label: { ka: "30კგ-მდე", en: "Up to 30kg" } },
    { label: { ka: "50კგ-მდე", en: "Up to 50kg" } },
    { label: { ka: "100კგ-მდე",en: "Up to 100kg" } },
  ];

  const [selectedCity, setSelectedCity] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // simple inline styles so layout is guaranteed (no SCSS edit needed)
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "#fff",
    border: "1px solid #e6edf7",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,.05)",
    marginBottom: 10,
  };
  const labelStyle = { color: "#014681", fontWeight: 700 };
  const priceStyle = { color: "#0f274a", fontWeight: 700 };

  return (
    <div className="map-pricing">
      <div className="map-pricing__bg" />

      <div className="map-pricing__header">
        <h2>{t("ფასები რეგიონებში", "Regional Pricing")}</h2>
      </div>

      <div className="map-pricing__grid">
        {cities.map((city) => (
          <div
            key={city.name.ka}
            className="map-pricing__card"
            onClick={() => setSelectedCity(city)}
          >
            <span className="map-pricing__city-name">{city.name[L]}</span>
            <span className="map-pricing__more">
              {t("ნახე ფასები", "View Prices")} <span className="map-pricing__more-icon">➜</span>
            </span>
          </div>
        ))}
      </div>

      {isMobile && cities.length > 4 && (
        <button
          className="map-pricing__show-more"
          onClick={() => navigate(`/${L}/pricepage`)}
        >
          {t("მეტის ჩვენება", "Show More")}
        </button>
      )}

      {selectedCity && (
        <>
          <div
            className="map-pricing__popup-overlay"
            onClick={() => setSelectedCity(null)}
          />
          <div className="map-pricing__popup">
            <button
              className="map-pricing__popup__close"
              onClick={() => setSelectedCity(null)}
              aria-label={t("დახურვა", "Close")}
            >
              &times;
            </button>

            <h2 className="map-pricing__popup__title">
              {selectedCity.name[L]} — {t("ფასები", "Prices")}
            </h2>

            {/* Left: category (Up to ...), Right: price — always a single row per weight */}
            <div className="map-pricing__rows">
              {categories.map((cat, i) => (
                <div key={cat.label.ka} style={rowStyle}>
                  <span style={labelStyle}>{cat.label[L]}</span>
                  <span style={priceStyle}>{selectedCity.prices[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
