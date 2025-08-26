// src/components/mainBlog/MainBlog.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './mainBlog.scss';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../LanguageContext';

export default function MainBlog() {
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let m = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then(r => {
        if (!m) return;
        const map = {};
        r.data.forEach(({ alias, value }) => (map[alias] = value));
        setT(map);
      })
      .catch(console.error);
    return () => { m = false; };
  }, [lang]);

  useEffect(() => {
    let m = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/siakhleebi`)
      .then(r => {
        if (!m) return;
        setPosts(r.data?.data?.category?.posts?.data || []);
      })
      .catch(console.error);
    return () => { m = false; };
  }, [lang]);

  // duplicate if >1 so loop feels infinite
  const slides = posts.length > 1 ? [...posts, ...posts] : posts;

  // safe title helper
  const getLocalizedTitle = (titleObj) => {
    if (titleObj == null) return '';                          // null/undefined
    if (typeof titleObj === 'string') return titleObj;        // plain string
    if (typeof titleObj === 'object') {                       // localized object
      const L = lang.toLowerCase();
      return titleObj[L] || titleObj.en || Object.values(titleObj)[0] || '';
    }
    return String(titleObj ?? '');
  };

  return (
    <section className="mainblog-section">
      <div className="mainblog-header">
        <div className="mainblog-header-left">
          <p className="subtitle">{t.mainarticlenewslatest || 'ბოლო სიახლეები'}</p>
          <h2 className="title">{t.mainlatestarticle || 'ჩვენი ბოლო სიახლეები'}</h2>
        </div>
        <Link to={`/${lang.toLowerCase()}/blog`} className="all-news btn">
          {t.allnews || 'ყველა სიახლე'} <FaArrowRight className="icon" />
        </Link>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={posts.length > 1}
        autoplay={posts.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mainblog-slider"
      >
        {slides.map((post, idx) => {
          const img =
            post.image?.original ||
            post.images?.[0]?.original_url ||
            'https://via.placeholder.com/400x300?text=No+Image';

          const date = post.published_at
            ? new Date(post.published_at).toLocaleDateString(
                lang === 'KA' ? 'ka-GE' : 'en-US',
                { day: '2-digit', month: 'short', year: 'numeric' }
              )
            : '';

          const raw = (post.post && typeof post.post === 'object'
                        ? post.post[lang.toLowerCase()] || post.post.en
                        : post.post) || '';
          const text = String(raw).replace(/<[^>]+>/g, '');
          const excerpt = text.length > 100 ? text.slice(0, 100).trimEnd() + '…' : text;

          // title (safe + max 75 chars)
          const tVal = getLocalizedTitle(post.title);
          const titleShort = tVal.length > 75 ? tVal.slice(0, 75).trimEnd() + '…' : tVal;

          return (
            <SwiperSlide key={`${post.id}-${idx}`}>
              <div className="blog-card">
                <img src={img} alt={titleShort} />
                <div className="card-content">
                  <div className="card-date">
                    <FaCalendarAlt className="date-icon" />
                    <span>{date}</span>
                  </div>
                  <h3 className="card-title">{titleShort}</h3>
                  <p className="card-excerpt">{excerpt}</p>
                  <Link
                    to={`/${lang.toLowerCase()}/blog/${post.slug}`}
                    className="read-more btn"
                  >
                    {t.details || 'დეტალურად'} <FaArrowRight className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
