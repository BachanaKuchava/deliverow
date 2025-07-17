import React, { useState } from "react";
import "./pricePage.scss";

export default function PricePage() {
  const cities = [
    { name: "თბილისი",      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ბათუმი",       prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ქუთაისი",     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ზუგდიდი",     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ფოთი",        prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ქობულეთი",    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ჩაქვი",        prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ხაშური",      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ახალციხე",    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "ახალქალაქი",  prices: ["12₾","13₾","14₾","20₾","25₾","35₾","80₾","150₾"] },
    { name: "ნინოწმინდა",  prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: "წალკა",       prices: ["16₾","19₾","21₾","26₾","35₾","45₾","100₾","155₾"] },
    { name: "რუსთავი",     prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "გარდაბანი",   prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "მარნეული",    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "საგურამო",    prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
    { name: "მცხეთა",      prices: ["8.42₾","9.20₾","11.22₾","13.34₾","21.21₾","25.24₾","51.85₾","77.13₾"] },
  ];

  const categories = [
    "1კგ-მდე","3კგ-მდე","5კგ-მდე",
    "10კგ-მდე","20კგ-მდე","30კგ-мდე",
    "50კგ-мდე","100კგ-мდე"
  ];

  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="price-page">
      <h1 className="price-page__title">ღირებულებები ყველა რეგიონში</h1>

      <div className="price-page__grid">
        {cities.map(city => (
          <div
            key={city.name}
            className="price-page__card"
            onClick={() => setSelectedCity(city)}
          >
            <span className="price-page__city">{city.name}</span>
            <span className="price-page__see">იხილე ფასები ➜</span>
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
              {selectedCity.name} — ფასები
            </h2>
            <table className="price-page__table">
              <thead>
                <tr>
                  {categories.map(cat => <th key={cat}>{cat}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedCity.prices.map((p,i) => (
                    <td key={i} data-label={categories[i]}>
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
