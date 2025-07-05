import React, { useState, useEffect } from "react";
import {
  FaShip,
  FaPlane,
  FaTrain,
  FaTruck,
  FaWarehouse,
  FaBoxes,
  FaArrowRight,
  FaPhoneAlt,
  FaFilePdf,
  FaFileWord,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";
import "./singleservice.scss";

export default function SingleService() {
  const [showVideo, setShowVideo] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`single-service${visible ? " appear" : ""}`}>
      {/* SIDEBAR */}
      <aside className="single-service__sidebar">
        <ul className="services-list">
          <li>
            <FaShip /> <span>Ocean Freight</span> <FaArrowRight />
          </li>
          <li>
            <FaPlane /> <span>Air Freight</span> <FaArrowRight />
          </li>
          <li>
            <FaTrain /> <span>Rail Freight</span> <FaArrowRight />
          </li>
          <li>
            <FaTruck /> <span>Road Freight</span> <FaArrowRight />
          </li>
          <li>
            <FaWarehouse /> <span>Warehouse</span> <FaArrowRight />
          </li>
          <li>
            <FaBoxes /> <span>Cargo Freight</span> <FaArrowRight />
          </li>
        </ul>

        <div className="contact-card">
          {/* <div className="contact-card__logo">LOGISTEX</div> */}
          <p className="contact-card__subtitle">
            Logistics & Cargo For Business
          </p>
          <a href="#" className="contact-card__btn">
            <FaPhoneAlt /> (123) 565-8901
          </a>
          <a href="#" className="contact-card__link">
            Contact With Us <FaArrowRight />
          </a>
        </div>

        <div className="brochure-card">
          <h4 className="brochure-card__title">Brochure</h4>
          <p className="brochure-card__desc">
            When An Unknown Printer Took Galley Of Type And Scrambled It
          </p>
          <a href="#" className="brochure-card__btn">
            <FaFilePdf /> PDF Download
          </a>
          <a href="#" className="brochure-card__btn">
            <FaFileWord /> DOC Download
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="single-service__main">
        <div className="hero-image">
          <img
            src="https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/service-culture.jpeg"
            alt="Freight"
          />
        </div>

        <h1 className="service-title">Modern Business Investment Planning</h1>
        <p className="service-intro">
          Shipping freight refers to the transportation of large quantities of
          goods or cargo by sea, air, or land. Freight can be shipped in
          various types of containers such as boxes, crates, barrels, or
          pallets. The transportation of goods by freight is typically arranged
          through a shipping company or freight forwarder, which handles the
          logistics of the shipment, including booking of cargo space,
          transportation, customs clearance, and delivery.
        </p>

        <section className="stats-section">
          <h2 className="section-heading">
            Our Next Level Logistics Around The World
          </h2>
          <p className="section-text">
            With over four decades of experience providing solutions for large
            enterprises throughout the globe, we offer tailored logistics
            solutions for specific markets.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="stat__label">Successful Delivery</div>
              <div className="stat__bar">
                <div className="stat__fill" style={{ width: "82%" }}></div>
              </div>
              <div className="stat__percent">82%</div>
            </div>
            <div className="stat">
              <div className="stat__label">Happy Customers</div>
              <div className="stat__bar">
                <div className="stat__fill" style={{ width: "90%" }}></div>
              </div>
              <div className="stat__percent">90%</div>
            </div>
          </div>
        </section>

        <section className="video-section">
          <div className="video-thumb" onClick={() => setShowVideo(true)}>
            <img
              src="https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/service-culture.jpeg"
              alt="Warehouse"
            />
            <div className="play-icon">
              <FaPlay />
            </div>
          </div>
          <div className="video-content">
            <h3 className="video-title">
              Raise Capital Faster & Negotiate On Your Own Terms
            </h3>
            <p className="video-text">
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
            </p>
            <ul className="features-list">
              <li>
                <FaCheckCircle /> Quality Control System
              </li>
              <li>
                <FaCheckCircle /> 100% Satisfaction Guarantee
              </li>
              <li>
                <FaCheckCircle /> Professional and Qualified
              </li>
              <li>
                <FaCheckCircle /> Safe, Reliable And Express
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="video-modal">
          <div className="video-modal__content">
            <button
              className="video-modal__close"
              onClick={() => setShowVideo(false)}
            >
              &times;
            </button>
            <video controls className="video-modal__video">
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
