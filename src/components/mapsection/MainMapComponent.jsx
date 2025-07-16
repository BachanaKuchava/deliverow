// src/components/MapPricing/MapPricing.jsx

import React, { useState } from "react";
import "./MapPricing.scss";

export default function MapPricing() {
  // Hard‑coded city pricing data
  const cities = [
    {
      name: "თბილისი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ბათუმი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ქუთაისი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ზუგდიდი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ფოთი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ქობულეთი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ჩაქვი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ხაშური",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ახალციხე",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "ახალქალაქი",
      prices: ["12₾",  "13₾",  "14₾",  "20₾",  "25₾",  "35₾",  "80₾",  "150₾"],
    },
    {
      name: "ნინოწმინდა",
      prices: ["16₾",  "19₾",  "21₾",  "26₾",  "35₾",  "45₾",  "100₾", "155₾"],
    },
    {
      name: "წალკა",
      prices: ["16₾",  "19₾",  "21₾",  "26₾",  "35₾",  "45₾",  "100₾", "155₾"],
    },
    {
      name: "რუსთავი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "გარდაბანი",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "მარნეული",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "საგურამო",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
    {
      name: "მცხეთა",
      prices: ["8.42₾", "9.20₾", "11.22₾", "13.34₾", "21.21₾", "25.24₾", "51.85₾", "77.13₾"],
    },
  ];

  const categories = [
    "1კგ-მდე",
    "3კგ-მდე",
    "5კგ-მდე",
    "10კგ-მდე",
    "20კგ-მდე",
    "30კგ-მდე",
    "50კგ-მდე",
    "100კგ-მდე",
  ];

  const [selectedCity, setSelectedCity] = useState(null);

  const openPopup = (city) => setSelectedCity(city);
  const closePopup = () => setSelectedCity(null);

  return (
    <div className="map-pricing">
      <div className="map-pricing__bg" />

      <div className="map-pricing__grid">
        {cities.map((city) => (
          <div
            key={city.name}
            className="map-pricing__card"
            onClick={() => openPopup(city)}
          >
            <span className="map-pricing__city-name">{city.name}</span>
            <span className="map-pricing__more">
              ნახე ფასები <span className="map-pricing__more-icon">➜</span>
            </span>
          </div>
        ))}
      </div>

      {selectedCity && (
        <>
          <div
            className="map-pricing__popup-overlay"
            onClick={closePopup}
          />
          <div className="map-pricing__popup">
            <button
              className="map-pricing__popup__close"
              onClick={closePopup}
            >
              &times;
            </button>
            <h2 className="map-pricing__popup__title">
              {selectedCity.name} — ფასები
            </h2>
            <table className="map-pricing__popup__table">
              <thead>
                <tr>
                  {categories.map((cat) => (
                    <th key={cat}>{cat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedCity.prices.map((p, i) => (
                    <td key={i}>{p}</td>
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
