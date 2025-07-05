import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP
} from 'react-icons/fa';
import './aboutTeam.scss';

const teamMembers = [
  { name: 'Kristin Watson', dept: 'Investment Department', img: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { name: 'Guy Hawkins', dept: 'Investment Department', img: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { name: 'Wade Warren', dept: 'Investment Department', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Jenny Wilson', dept: 'Investment Department', img: 'https://randomuser.me/api/portraits/women/56.jpg' },
  { name: 'Cameron Williamson', dept: 'Marketing Department', img: 'https://randomuser.me/api/portraits/men/67.jpg' },
  { name: 'Courtney Henry', dept: 'Finance Department', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Theresa Webb', dept: 'Logistics Department', img: 'https://randomuser.me/api/portraits/women/69.jpg' },
  { name: 'Floyd Miles', dept: 'Operations Department', img: 'https://randomuser.me/api/portraits/men/70.jpg' },
];

export default function AboutTeam() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? teamMembers : teamMembers.slice(0, 6);

  return (
    <section className="about-team-section">
      <div className="team-grid">
        {visible.map((m, i) => (
          <div className="team-card" key={i}>
            <div className="avatar-wrapper">
              <img src={m.img} alt={m.name} className="avatar" />
            </div>
            <h3 className="member-name">{m.name}</h3>
            <p className="member-dept">{m.dept}</p>
            <div className="socials">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaPinterestP /></a>
            </div>
          </div>
        ))}
      </div>
      <button
        className="show-more-btn"
        onClick={() => setShowAll(prev => !prev)}
      >
        {showAll ? 'ნაკლების ჩვენება' : 'მეტის ჩვენება'}
      </button>
    </section>
  );
}
