import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";
import "./singleservice.scss";

// static fallback for “corporate” slug
import airImg from "../../../assets/corporate.png";

const FALLBACKS = {
  corporate: {
    title: "კორპორატიული შეთავაზება",
    html: "<p>კორპორატიული შეთავაზებისთვის დაგვიკავშირდით, 15+ შეკვეთიდან.</p>",
    image: airImg,
  },
};

export default function SingleService() {
  const { lang, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get(
        `https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/servisebi`
      )
      .then((res) => {
        if (!mounted) return;
        const list = res.data?.data?.category?.posts?.data || [];
        const found = list.find((p) => p.slug === slug);
        if (found) {
          setPost({
            title: found.title,
            html: found.post?.[lang] || "",
            images: found.images || [],
          });
        } else if (FALLBACKS[slug]) {
          setPost({
            title: FALLBACKS[slug].title,
            html: FALLBACKS[slug].html,
            images: [{ original: FALLBACKS[slug].image }],
          });
        } else {
          setError("Service not found");
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to load service");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [lang, slug]);

  if (loading) return <div className="single-service">Loading…</div>;
  if (error) return <div className="single-service">Oops: {error}</div>;

  const heroImg = post.images[0]?.original || "";

  return (
    <div className="single-service">
      {/* SIDEBAR */}
      <aside className="single-service__sidebar">
        <ul className="services-list">
          <li><FaShip /> <span>Ocean Freight</span> <FaArrowRight /></li>
          <li><FaPlane /> <span>Air Freight</span> <FaArrowRight /></li>
          <li><FaTrain /> <span>Rail Freight</span> <FaArrowRight /></li>
          <li><FaTruck /> <span>Road Freight</span> <FaArrowRight /></li>
          <li><FaWarehouse /> <span>Warehouse</span> <FaArrowRight /></li>
          <li><FaBoxes /> <span>Cargo Freight</span> <FaArrowRight /></li>
        </ul>
        <div className="contact-card">
          <p className="contact-card__subtitle">Logistics & Cargo For Business</p>
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
        {heroImg && (
          <div className="hero-image">
            <img src={heroImg} alt={post.title} />
          </div>
        )}

        <h1 className="service-title">{post.title}</h1>

        <div
          className="service-intro"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

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
                <div className="stat__fill" style={{ width: "82%" }} />
              </div>
              <div className="stat__percent">82%</div>
            </div>
            <div className="stat">
              <div className="stat__label">Happy Customers</div>
              <div className="stat__bar">
                <div className="stat__fill" style={{ width: "90%" }} />
              </div>
              <div className="stat__percent">90%</div>
            </div>
          </div>
        </section>

        <section className="video-section">
          <div className="video-thumb" onClick={() => setShowVideo(true)}>
            {heroImg && <img src={heroImg} alt="Play video" />}
            <div className="play-icon"><FaPlay /></div>
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
              <li><FaCheckCircle /> Quality Control System</li>
              <li><FaCheckCircle /> 100% Satisfaction Guarantee</li>
              <li><FaCheckCircle /> Professional and Qualified</li>
              <li><FaCheckCircle /> Safe, Reliable And Express</li>
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
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
