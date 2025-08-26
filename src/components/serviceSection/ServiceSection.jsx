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

  useEffect(() => {
    let m = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then(res => {
        if (!m) return;
        const map = {};
        res.data.forEach(({ alias, value }) => (map[alias] = value));
        setT(map);
      })
      .catch(console.error);
    return () => { m = false; };
  }, [lang]);

  useEffect(() => {
    let m = true;
    setLoading(true);
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/servisebi`)
      .then(res => {
        if (!m) return;
        setPosts(res.data?.data?.category?.posts?.data || []);
      })
      .catch(console.error)
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [lang]);

  const iconFor = i => {
    switch (i) {
      case 0: return <FaBox />;
      case 1: return <FaBoxOpen />;
      case 2: return <FaBoxes />;
      default: return <FaTruck />;
    }
  };

  if (loading) return null;

  return (
    <section className="service-section">
      <div className="service-section__header">
        <div>
          <p className="subtitle">{t.mainservicesintro || "ჩვენი საუკეთესო სერვისები"}</p>
          <h2 className="title">{t.mainservicestitle || "ყველა საკურიერო სერვისი თქვენთვის"}</h2>
        </div>
        <Link to={`/${lang.toLowerCase()}/services`} className="all-btn">
          {t.allservices || "ყველა სერვისი"} <FaArrowRight />
        </Link>
      </div>

      <div className="service-section__grid">
        {posts.slice(0, 4).map((post, i) => {
          const imgUrl = post.image?.original || post.images?.[0]?.original_url || "";

          const rawHtml = typeof post.post === "object"
            ? post.post[lang.toLowerCase()]
            : post.post || "";
          const doc = new DOMParser().parseFromString(rawHtml, "text/html");
          const plainText = doc.body.textContent || "";
          const snippet = plainText.length > 100
            ? plainText.slice(0, 100).replace(/\s+\S*$/, "") + "…"
            : plainText;

          return (
            <div className="card" key={post.id}>
              {/* FULL-CARD TAP TARGET (mobile only via CSS) */}
              <Link
                to={`/${lang.toLowerCase()}/services/${post.slug}`}
                className="card-hit"
                aria-label={t.details || "დეტალურად"}
              />
              <div className="card-image">
                <img src={imgUrl} alt={post.title} />
                <div className="icon">{iconFor(i)}</div>
                <div className="overlay">
                  <Link to={`/${lang.toLowerCase()}/services/${post.slug}`}>
                    <button className="overlay-btn">
                      {t.details || "დეტალურად"} ➜
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card-content">
                <h3>{post.title}</h3>
                <p className="desc">{snippet}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
