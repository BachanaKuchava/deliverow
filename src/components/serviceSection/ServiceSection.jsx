import React from "react";
import { FaBox, FaBoxOpen, FaBoxes, FaTruck } from "react-icons/fa";
import "./ServiceSection.scss";
import { Link } from "react-router-dom";

// Swap these for your real image paths:
import img1 from "../../assets/delivery1.png"; // container ship
import img2 from "../../assets/doortodoor.png"; // truck
import img3 from "../../assets/24door.png"; // airplane ramp
import img4 from "../../assets/corporate.png"; // train containers

const services = [
  {
    img: img1,
    icon: <FaBox />,
    title: "სტანდარტული მომსახურება",
    desc:
      "სწრაფი მიწოდება მომდევნო სამუშაო დღეს, მიწოდება ხდება 12:00-დან 21:00-მდე.",
  },
  {
    img: img2,
    icon: <FaBoxOpen />,
    title: "ექსპრესს მომსახურება",
    desc:
      "მიწოდება იმავე დღეს,  მიწოდება ხდება 11:00-დან 21:00-მდე.",
  },
  {
    img: img3,
    icon: <FaBoxOpen />,
    title: "ექსპრესს+ ",
    desc:
      "მიოწდება იმავე დღეს, Door to door-კურიერის მიერ კარამდე მიწოდება.",
  },
  {
    img: img4,
    icon: <FaBoxes />,
    title: "კორპორატიული შეთავაზება ",
    desc:
      "კორპორატიული შეთავაზებისთვის დაგვიკავშირდით, 15+ შეკვეთიდან.",
  },
];

export default function ServiceSection() {
  return (
    <section className="service-section">
      <div className="service-section__header">
        <div>
          <p className="subtitle">ჩვენი საუკეთესო სერვისები</p>
          <h2 className="title">
           ყველა  საკურიერო სერვისი თქვენთვის
          </h2>
        </div>
        <Link to='services' className="all-btn">
          ყველა სერვისი ➜
        </Link>
      </div>

      <div className="service-section__grid">
        {services.map((s, i) => (
          <div className="card" key={i}>
            <div className="card-image">
              <img src={s.img} alt={s.title} />
              <div className="icon">{s.icon}</div>
              <div className="overlay">
                <Link to='/singleservice'>
                <button className="overlay-btn">
                  სრულად ➜
                </button></Link>
              </div>
            </div>
            <div className="card-content">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
