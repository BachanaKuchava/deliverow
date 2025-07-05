import React, { useRef, useEffect } from 'react';
import './aboutcomponent1.scss'
import aboutVideo from '../../../assets/MZA1.mp4';

export default function AboutComponent1() {
  const sectionRef = useRef(null);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (sectionRef.current) {
        sectionRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about1" ref={sectionRef}>
      <video
        className="about1__video"
        src={aboutVideo}
        muted
        loop
        autoPlay
        playsInline
      />
      <div className="about1__overlay">
        <div className="about1__content">
          <p className="about1__subtitle">ჩვენს შესახებ: სისტემა & გუნდი</p>
          <h2 className="about1__title">
          იდეიდან რეალობამდე <br /> 
          თანამედროვე საკურიერო სისტემა და მეტი.
          </h2>
          <p className="about1__desc">
            ჩვენ შევიმუშავებ , დავაპროექტეთ და შევქმენით ახალი თანამედროვე საკურიერო სისტემა თქვენთვის და თქვენი ბიზნესისთვის.
          </p>
          <div className="about1__stats">
            <div className="stat">
              <span className="stat__label">გატესტილი სისტემა</span>
              <span className="stat__value">100%</span>
              <div className="stat__bar">
                <div className="stat__fill" style={{ width: '82%' }} />
              </div>
            </div>
            <div className="stat">
              <span className="stat__label">კმაყოფილი ბიზნეს სექტორი</span>
              <span className="stat__value">100%</span>
              <div className="stat__bar">
                <div className="stat__fill" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
