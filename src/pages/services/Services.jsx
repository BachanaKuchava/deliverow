// src/components/services/Services.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FaBox,
  FaBoxOpen,
  FaBoxes,
  FaTruck
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";
import "./services.scss";

export default function Services() {
  const { lang } = useContext(LanguageContext);
  const [posts, setPosts] = useState([]);
  const [t, setT] = useState({});
  const [loading, setLoading] = useState(true);

  // 1) Fetch translations
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

  // 2) Fetch the services on mount and whenever `lang` changes
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(
        `https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/servisebi`
      )
      .then((res) => {
        if (!mounted) return;
        const data = res.data?.data?.category?.posts?.data || [];
        setPosts(data);
      })
      .catch((err) => console.error("Failed loading services:", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  // Helper to pick an icon per index
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

  if (loading) return null; // or a spinner

  return (
    <section className="services-custom appear">
      <div className="services-custom__grid">
        {posts.map((post, i) => {
          // pick a good image (full-res)
          const imgUrl =
            post.image?.original ||
            post.images?.[0]?.original_url ||
            "";

          // right-language HTML snippet for the description
          const rawHtml = post.post?.[lang.toLowerCase()] || "";

          return (
            <div className="services-custom__card" key={post.id}>
              <div
                className="services-custom__thumb"
                style={{ backgroundImage: `url(${imgUrl})` }}
              >
                <div className="services-custom__icon">
                  {iconFor(i)}
                </div>
              </div>
              <div className="services-custom__body">
                <h3 className="services-custom__title">
                  {post.title}
                </h3>
                <p
                  className="services-custom__desc"
                  dangerouslySetInnerHTML={{ __html: rawHtml }}
                />
                <Link to={`/${lang.toLowerCase()}/services/${post.slug}`}>
                  <button className="services-custom__btn">
                    {t.details || "ნახე დეტალები"}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
