import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram
} from 'react-icons/fa';
import { LanguageContext } from '../../../LanguageContext';
import './article.scss';

export default function SingleBlog() {
  const { lang } = useContext(LanguageContext);
  const { slug } = useParams();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/blogpost/${slug}`)
      .then(res => {
        if (!mounted) return;
        setPost(res.data.data.post);
      })
      .catch(err => {
        console.error(err);
        if (mounted) setError('Failed to load article');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [lang, slug]);

  if (loading) return null;
  if (error)   return <p>{error}</p>;
  if (!post)   return <p>Post not found.</p>;

  // title is now an object { en, ka }
  const title = post.title[lang.toLowerCase()] || post.title.en;
  const img   = post.image?.original || post.images?.[0]?.original_url || '';
  const date  = new Date(post.published_at).toLocaleDateString(
    lang === 'KA' ? 'ka-GE' : 'en-US',
    { day: '2-digit', month: 'long', year: 'numeric' }
  );
  const html  = post.post[lang.toLowerCase()] || post.post.en;

  return (
    // note the added "appear" class here
    <div className="article-page appear">
      <main className="article-page__main">
        <h1 className="article-title">{title}</h1>
        <p className="article-meta"><FaCalendarAlt /> {date}</p>

        {img && (
          <div className="article-image-wrap">
            <img src={img} alt={title} className="article-image" />
          </div>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <aside className="article-page__sidebar">
        <div className="widget widget--share">
          <h4 className="widget__title">
            {lang === 'KA' ? 'გაზიარება' : 'Share'}
          </h4>
          <div className="widget__socials">
            <FaFacebookF />
            <FaTwitter />
            <FaWhatsapp />
            <FaInstagram />
          </div>
        </div>
      </aside>
    </div>
  );
}
