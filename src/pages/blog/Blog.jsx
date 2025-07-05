import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaArrowRight } from 'react-icons/fa';
import './blog.scss';
import { Link } from 'react-router-dom';
const allArticles = [
  { img: 'https://picsum.photos/600/350?random=11', date: '25 Nov, 2024', title: 'The Future of Logistics Embracing Technology', excerpt: 'Road transportation is crucial in coordinating shipments across countries.' },
  { img: 'https://picsum.photos/600/350?random=12', date: '24 Nov, 2024', title: 'Green Logistics Solutions for a Greener Future', excerpt: 'Sustainable practices in freight can reduce carbon footprints worldwide.' },
  { img: 'https://picsum.photos/600/350?random=13', date: '23 Nov, 2024', title: 'Importers Achieve Savings Through the First Sale Rule!', excerpt: 'First Sale rule can deliver significant cost advantages for importers.' },
  { img: 'https://picsum.photos/600/350?random=14', date: '22 Nov, 2024', title: 'Air Freight vs Sea Freight: Pros & Cons', excerpt: 'Choosing the right transport mode depends on speed, cost, and cargo type.' },
  { img: 'https://picsum.photos/600/350?random=15', date: '21 Nov, 2024', title: 'Warehouse Automation Trends in 2025', excerpt: 'Robotic picking and IoT are revolutionizing warehouse management systems.' },
  { img: 'https://picsum.photos/600/350?random=16', date: '20 Nov, 2024', title: 'Supply Chain Resilience in Uncertain Times', excerpt: 'Building flexible networks helps businesses handle disruptions effectively.' },
  { img: 'https://picsum.photos/600/350?random=17', date: '19 Nov, 2024', title: 'Rail Freight: An Underrated Heavy Haul Option', excerpt: 'Rail transport offers cost efficiencies for long-distance heavy shipments.' },
  { img: 'https://picsum.photos/600/350?random=18', date: '18 Nov, 2024', title: 'Last-Mile Delivery Innovations', excerpt: 'Drones and autonomous vehicles are set to transform last-mile logistics.' },
  { img: 'https://picsum.photos/600/350?random=19', date: '17 Nov, 2024', title: 'Cold Chain Logistics: Keeping Goods Fresh', excerpt: 'Temperature-controlled transport is vital for perishables and pharmaceuticals.' },
  { img: 'https://picsum.photos/600/350?random=20', date: '16 Nov, 2024', title: 'Sustainable Packaging in Transport', excerpt: 'Eco-friendly packaging reduces waste and improves brand reputation.' },
  { img: 'https://picsum.photos/600/350?random=21', date: '15 Nov, 2024', title: 'Digital Twins: The Next Frontier', excerpt: 'Virtual replicas help optimize route planning and asset management.' },
  { img: 'https://picsum.photos/600/350?random=22', date: '14 Nov, 2024', title: 'Blockchain for Supply Chain Transparency', excerpt: 'Distributed ledgers build trust by tracking goods end-to-end.' },
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = allArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="blog-section">
      <div className="search-container">
        <input
          type="text"
          placeholder="მოძებნეთ სიახლე..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="cards-grid">
        {visible.map((art, idx) => (
          <div className="blog-card" key={idx}>
            <img src={art.img} alt={art.title} />
            <div className="card-content">
              <div className="card-date">
                <FaCalendarAlt className="date-icon" /> <span>{art.date}</span>
              </div>
              <h3 className="card-title">{art.title}</h3>
              <p className="card-excerpt">{art.excerpt}</p>
              <Link to='/article' className="read-more">
                გაიგე მეტი <FaArrowRight className="icon" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? 'page active' : 'page'}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
