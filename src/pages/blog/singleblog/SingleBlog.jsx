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

  const LOCALE = lang.toLowerCase();

  const title =
    (typeof post.title === 'object'
      ? post.title[LOCALE] || post.title.en
      : post.title) || '';

  const img   = post.image?.original || post.images?.[0]?.original_url || '';
  const date  = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        lang === 'KA' ? 'ka-GE' : 'en-US',
        { day: '2-digit', month: 'long', year: 'numeric' }
      )
    : '';

  const pickLocalized = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val[LOCALE] || val.en || '';
    return String(val);
  };
  let html = pickLocalized(post.post);
  if (!html) html = pickLocalized(post.description);
  if (!html) html = pickLocalized(post.short_description);

  const v = post.video || {};
  const videoUrl   = v.embed_url || v.url || null;
  const vW         = Number(v.width)  || 16;
  const vH         = Number(v.height) || 9;
  const ratioStyle = { aspectRatio: `${vW} / ${vH}` };

  // share links
  const shareUrl   = typeof window !== 'undefined' ? window.location.href : '';
  const shareText  = encodeURIComponent(title || '');
  const shareHref  = encodeURIComponent(shareUrl);

  const fb  = `https://www.facebook.com/sharer/sharer.php?u=${shareHref}`;
  const tw  = `https://twitter.com/intent/tweet?url=${shareHref}&text=${shareText}`;
  const wa  = `https://wa.me/?text=${shareText}%20${shareHref}`;
  const ig  = `https://www.instagram.com/`; // Instagram has no web share—link to profile/app

  return (
    <div className="article-page appear">
      <main className="article-page__main">
        <h1 className="article-title">{title}</h1>
        {date && <p className="article-meta"><FaCalendarAlt /> {date}</p>}

        {videoUrl ? (
          <div className="article-media" style={ratioStyle}>
            {v.embed_url ? (
              <iframe
                src={v.embed_url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video controls preload="metadata" poster={img || undefined}>
                <source src={v.url} />
              </video>
            )}
          </div>
        ) : (
          img && (
            <div className="article-image-wrap">
              <img src={img} alt={title} className="article-image" />
            </div>
          )
        )}

        {html && (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </main>

      <aside className="article-page__sidebar">
        <div className="widget widget--share">
          <h4 className="widget__title">
            {lang === 'KA' ? 'გაზიარება' : 'Share'}
          </h4>
          <div className="widget__socials">
            <a className="social-btn fb" href={fb} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
              <FaFacebookF />
            </a>
            <a className="social-btn tw" href={tw} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
              <FaTwitter />
            </a>
            <a className="social-btn wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
              <FaWhatsapp />
            </a>
            <a className="social-btn ig" href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
