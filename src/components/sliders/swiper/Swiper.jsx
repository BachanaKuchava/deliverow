import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss';

export default function FadeSlider() {
  const images = [
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
   
  ];

  return (
    <div className="fade-slider-container">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (idx, className) =>
            `<button class="${className}">${idx + 1}</button>`
        }}
        className="fade-swiper"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} alt={`slide ${i + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* This empty div is where Swiper will render our numbered buttons */}
      <div className="custom-pagination"></div>
    </div>
  );
}
