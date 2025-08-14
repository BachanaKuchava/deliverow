// src/components/mapsection/pricepage/PricePage.jsx

import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../LanguageContext";
import "./pricePage.scss";

export default function PricePage() {
  const { lang } = useContext(LanguageContext);
  const locale = lang.toLowerCase(); // "ka" or "en"

  // Hard‑coded city pricing data with translations
  const cities = [
    { name: { ka: "თბილისი", en: "Tbilisi" },      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ბათუმი", en: "Batumi" },         prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ქუთაისი", en: "Kutaisi" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ზუგდიდი", en: "Zugdidi" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ფოთი", en: "Poti" },           prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ქობულეთი", en: "Kobuleti" },    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ჩაქვი", en: "Chakvi" },         prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ხაშური", en: "Khashuri" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ახალციხე", en: "Akhaltsikhe" },prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "ახალქალაქი", en: "Akhalqalaqi" }, prices: ["12₾","13₾","14₾","20₾","25₾","35₾","80₾","150₾"] },
    { name: { ka: "ნინოწმინდა", en: "Ninotsminda" }, prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: { ka: "წალკა", en: "Tsalka" },        prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: { ka: "რუსთავი", en: "Rustavi" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "გარდაბანი", en: "Gardabani" },  prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "მარნეული", en: "Marneuli" },   prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "საგურამო", en: "Saguramo" },    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "მცხეთა", en: "Mtskheta" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "გორი", en: "Gori" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: { ka: "თელავი", en: "Telavi" },     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },

  ];

  // Category labels with translations
  const categories = [
    { label: { ka: "1კგ-მდე",  en: "Up to 1kg" } },
    { label: { ka: "3კგ-მდე",  en: "Up to 3kg" } },
    { label: { ka: "5კგ-მდე",  en: "Up to 5kg" } },
    { label: { ka: "10კგ-მდე", en: "Up to 10kg" } },
    { label: { ka: "20კგ-მდე", en: "Up to 20kg" } },
    { label: { ka: "30კგ-мდე", en: "Up to 30kg" } },
    { label: { ka: "50კგ-мდე", en: "Up to 50kg" } },
    { label: { ka: "100კგ-мდე",en: "Up to 100kg" } },
  ];

  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="price-page">
      <h1 className="price-page__title">
        {locale === "en" ? "Pricing in All Regions" : "ღირებულებები ყველა რეგიონში"}
      </h1>

      <div className="price-page__grid">
        {cities.map(city => (
          <div
            key={city.name.ka}
            className="price-page__card"
            onClick={() => setSelectedCity(city)}
          >
            <span className="price-page__city">
              {city.name[locale]}
            </span>
            <span className="price-page__see">
              {locale === "en" ? "View Prices ➜" : "იხილე ფასები ➜"}
            </span>
          </div>
        ))}
      </div>

      {selectedCity && (
        <>
          <div
            className="price-page__overlay"
            onClick={() => setSelectedCity(null)}
          />
          <div className="price-page__popup">
            <button
              className="price-page__popup-close"
              onClick={() => setSelectedCity(null)}
            >
              &times;
            </button>
            <h2 className="price-page__popup-title">
              {selectedCity.name[locale]} — {locale === "en" ? "Prices" : "ფასები"}
            </h2>
            <table className="price-page__table">
              <thead>
                <tr>
                  {categories.map(cat => (
                    <th key={cat.label.ka}>
                      {cat.label[locale]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedCity.prices.map((p,i) => (
                    <td key={i} data-label={categories[i].label[locale]}>
                      {p}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}