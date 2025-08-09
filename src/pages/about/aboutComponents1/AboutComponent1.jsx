// src/components/aboutcomponent1/AboutComponent1.jsx
import React, { useRef, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import './aboutcomponent1.scss';
import aboutVideo from '../../../assets/MZA1.mp4';
import { LanguageContext } from '../../../LanguageContext';

export default function AboutComponent1() {
  const sectionRef = useRef(null);
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});

  // 1) Fetch translations on lang change
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then(res => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => {
          map[alias] = value;
        });
        setT(map);
      })
      .catch(err => console.error('Translations fetch failed:', err));
    return () => { mounted = false; };
  }, [lang]);

  // 2) Parallax scroll effect
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

  // Helper: split "<label><number>%" into [label, number%]
  const parseStat = (raw, fallbackLabel, fallbackValue) => {
    const m = raw.match(/(.*?)(\d+%)/);
    if (m) return [m[1], m[2]];
    return [fallbackLabel, fallbackValue];
  };

  // Prepare stat values
  const [stat1Label, stat1Value] = parseStat(
    t.aboutustested || 'გატესტილი სისტემა 100%',
    'გატესტილი სისტემა',
    '100%'
  );
  const [stat2Label, stat2Value] = parseStat(
    t.aboutusbuissenss || 'კმაყოფილი ბიზნეს სექტორი 100%',
    'კმაყოფილი ბიზნეს სექტორი',
    '100%'
  );

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
          <p className="about1__subtitle">
            {t.aboutusintro || 'Deliverow — თქვენი ბიზნესის საიმედო საკურიერო პარტნიორი'}
          </p>
          <h2 className="about1__title">
            {t.aboutustitle ||
              'ჩვენ არ ვყიდით უბრალოდ მიწოდების სერვისს — ჩვენ ვქმნით პროცესს, რომელიც ზრდის თქვენი ბიზნესის ეფექტურობას'}
          </h2>
          <p className="about1__desc">
            {t.aboutustext ||
              'Deliverow გეხმარებათ დროისა და რესურსების დაზოგვაში. ჩვენ ვაწვდით ამანათებს სწრაფად, სტაბილურად და უსაფრთხოდ — ისე, როგორც ბიზნესს სჭირდება ყოველდღიური ოპერაციების წარმატებისთვის'}
          </p>
          {/* <div className="about1__stats">
            <div className="stat">
              <span className="stat__label">{stat1Label}</span>
              <span className="stat__value">{stat1Value}</span>
              <div className="stat__bar">
                <div
                  className="stat__fill"
                  style={{ width: stat1Value }}
                />
              </div>
            </div>
            <div className="stat">
              <span className="stat__label">{stat2Label}</span>
              <span className="stat__value">{stat2Value}</span>
              <div className="stat__bar">
                <div
                  className="stat__fill"
                  style={{ width: stat2Value }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
