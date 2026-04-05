// src/pages/services/singleService/SingleService.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaFilePdf,
  FaFileWord,
  FaPlay,
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
  const [services, setServices] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setShowVideo(false);

    axios
      .get(
        `https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/servisebi`
      )
      .then((res) => {
        if (!mounted) return;

        const list = res.data?.data?.category?.posts?.data || [];
        setServices(list);

        const found = list.find((p) => p.slug === slug);

        if (found) {
          const raw = found.post;
          const htmlContent =
            typeof raw === "object" ? raw[lang.toLowerCase()] : raw;

          const videoUrl =
            typeof found.video === "string"
              ? found.video.trim()
              : typeof found.video_url === "string"
              ? found.video_url.trim()
              : typeof found.video?.original_url === "string"
              ? found.video.original_url.trim()
              : typeof found.video?.original === "string"
              ? found.video.original.trim()
              : "";

          setPost({
            title: found.title,
            html: htmlContent,
            images: found.images || [],
            image: found.image || null,
            videoUrl,
          });
        } else if (FALLBACKS[slug]) {
          setPost({
            title: FALLBACKS[slug].title,
            html: FALLBACKS[slug].html,
            images: [{ original: FALLBACKS[slug].image }],
            image: { original: FALLBACKS[slug].image },
            videoUrl: "",
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
  if (!post) return null;

  const heroImg =
    post.image?.original ||
    post.image?.original_url ||
    post.images?.[0]?.original_url ||
    post.images?.[0]?.original ||
    "";

  const hasVideo = !!post?.videoUrl;

  return (
    <div className="single-service">
      {/* SIDEBAR */}
      <aside className="single-service__sidebar">
        <ul className="services-list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/${lang.toLowerCase()}/services/${s.slug}`}>
                {s.title.length > 30
                  ? s.title.substring(0, 30) + "…"
                  : s.title}
              </Link>
              <FaArrowRight />
            </li>
          ))}
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
        <h1 className="service-title">{post.title}</h1>

        <section className="stats-section">
          <div
            className="section-text"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>

        <section className="video-section">
          <div className="video-thumb">
            {heroImg && <img src={heroImg} alt={post.title} />}

            {hasVideo && (
              <button
                type="button"
                className="play-icon"
                onClick={() => setShowVideo(true)}
              >
                <FaPlay />
              </button>
            )}
          </div>
        </section>
      </main>

      {/* VIDEO MODAL */}
      {showVideo && hasVideo && (
        <div className="video-modal">
          <div className="video-modal__content">
            <button
              className="video-modal__close"
              onClick={() => setShowVideo(false)}
            >
              &times;
            </button>
            <video controls className="video-modal__video">
              <source src={post.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}