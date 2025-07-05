import React, { useState, useEffect } from "react";
import {
FaBox, FaBoxOpen, FaBoxes
} from "react-icons/fa";
import "./services.scss";
import { Link } from "react-router-dom";

// Swap these imports for your actual image files:
import trainImg from "../../assets/delivery1.png";
import oceanImg from "../../assets/doortodoor.png";
import roadImg from "../../assets/24door.png";
import airImg from "../../assets/corporate.png";

const services = [
  {
    img: trainImg,
    icon: <FaBox />,
    title: "სტანდარტული მომსახურება",
    desc:
      "სწრაფი მიწოდება მომდევნო სამუშაო დღეს, მიწოდება ხდება 12:00-დან 21:00-მდე."
  },
  {
    img: oceanImg,
    icon: <FaBoxOpen />,
    title: "ექსპრესს მომსახურება",
    desc:
      "მიწოდება იმავე დღეს,  მიწოდება ხდება 11:00-დან 21:00-მდე."
  },
  {
    img: roadImg,
    icon: <FaBoxOpen />,
    title: "ექსპრესს+",
    desc:
      "მიოწდება იმავე დღეს, Door to door-კურიერის მიერ კარამდე მიწოდება."
  },
  {
    img: airImg,
    icon: <FaBoxes />,
    title: "კორპორატიული შეთავაზება",
    desc:
      "კორპორატიული შეთავაზებისთვის დაგვიკავშირდით, 15+ შეკვეთიდან."
  }
];

export default function Services() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger the appear animation once mounted
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`services-custom${visible ? " appear" : ""}`}>
      <div className="services-custom__grid">
        {services.map((s, i) => (
          <div className="services-custom__card" key={i}>
            <div
              className="services-custom__thumb"
              style={{ backgroundImage: `url(${s.img})` }}
            >
              <div className="services-custom__icon">{s.icon}</div>
            </div>
            <div className="services-custom__body">
              <h3 className="services-custom__title">{s.title}</h3>
              <p className="services-custom__desc">{s.desc}</p>
              <Link to="/singleservice">
                <button className="services-custom__btn">
                  ნახე დეტალები
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
