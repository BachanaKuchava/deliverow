// src/components/serviceSection/ServiceSection.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FaBox,
  FaBoxOpen,
  FaBoxes,
  FaTruck,
  FaArrowRight
} from "react-icons/fa";
import { LanguageContext } from "../../LanguageContext";
import "./ServiceSection.scss";
import { Link } from "react-router-dom";

export default function ServiceSection() {
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) fetch translations
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
      .catch((err) => console.error("Translations fetch failed:", err));
    return () => {
      mounted = false;
    };
  }, [lang]);

  // 2) fetch services posts
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(
        `https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/services`
      )
      .then((res) => {
        if (!mounted) return;
        const data = res.data?.data?.category?.posts?.data || [];
        setPosts(data);
      })
      .catch((err) => console.error("Services fetch failed:", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  // pick icon by index
  const iconFor = (i) => {
    switch (i) {
      case 0:
        return <FaBox />;
      case 1:
        return <FaBoxOpen />;
      case 2:
        return <FaBoxes />;
      default:
        return <FaTruck />;
    }
  };

  if (loading) {
    return null; // or a spinner
  }

  return (
    <section className="service-section">
      <div className="service-section__header">
        <div>
          <p className="subtitle">
            {t.mainservicesintro || "ჩვენი საუკეთესო სერვისები"}
          </p>
          <h2 className="title">
            {t.mainservicestitle || "ყველა საკურიერო სერვისი თქვენთვის"}
          </h2>
        </div>
        <Link
          to={`/${lang.toLowerCase()}/services`}
          className="all-btn"
        >
          {t.allservices || "ყველა სერვისი"} <FaArrowRight />
        </Link>
      </div>

      <div className="service-section__grid">
        {posts.map((post, i) => {
          const imgUrl =
            post.image?.original ||
            post.images?.[0]?.original_url ||
            "";
          const rawHtml =
            post.post?.[lang.toLowerCase()] || "<p></p>";
          return (
            <div className="card" key={post.id}>
              <div className="card-image">
                <img src={imgUrl} alt={post.title} />
                <div className="icon">{iconFor(i)}</div>
                <div className="overlay">
                  <Link
                    to={`/${lang.toLowerCase()}/services/${post.slug}`}
                  >
                    <button className="overlay-btn">
                      {t.details || "დეტალურად"} ➜
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card-content">
                <h3>{post.title}</h3>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: rawHtml }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
