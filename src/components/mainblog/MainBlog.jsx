import React from 'react';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './mainBlog.scss';
import { Link } from 'react-router-dom';

const baseArticles = [
  {
    img: 'https://picsum.photos/400/300?random=21',
    date: '25 Nov, 2024',
    title: 'Importers achieve savings through the First Sale rule!',
    excerpt:
      'Road transpo arere tation cricuilar roley area coordinated trans portation they aw countries destination.',
  },
  {
    img: 'https://picsum.photos/400/300?random=22',
    date: '25 Nov, 2024',
    title: 'The Future of Logistics Embracing Technology',
    excerpt:
      'Road transpo arere tation cricuilar roley area coordinated trans portation they aw countries destination.',
  },
  {
    img: 'https://picsum.photos/400/300?random=23',
    date: '25 Nov, 2024',
    title: 'Green Logistics Solutions for a Greener Future',
    excerpt:
      'Road transpo arere tation cricuilar roley area coordinated trans portation they aw countries destination.',
  },
];

// duplicate to ensure loop is smooth
const articles = [...baseArticles, ...baseArticles];

export default function MainBlog() {
  return (
    <section className="mainblog-section">
      <div className="mainblog-header">
        <div className="mainblog-header-left">
          <p className="subtitle">ბოლო სიახლეები</p>
          <h2 className="title">ჩვენი ბოლო სიახლეები</h2>
        </div>
        <Link to='blog' className="all-news btn">
          ყველა სიახლე <FaArrowRight className="icon" />
        </Link>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mainblog-slider"
      >
        {articles.map((art, idx) => (
          <SwiperSlide key={idx}>
            <div className="blog-card">
              <img src={art.img} alt={art.title} />
              <div className="card-content">
                <div className="card-date">
                  <FaCalendarAlt className="date-icon" />
                  <span>{art.date}</span>
                </div>
                <h3 className="card-title">{art.title}</h3>
                <p className="card-excerpt">{art.excerpt}</p>
                <Link to='/article' className="read-more btn">
                  დეტალურად <FaArrowRight className="icon" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
