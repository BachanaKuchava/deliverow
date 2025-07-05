import React, { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import "./article.scss";

const categories = [
  { name: "Ocean Freight", count: 5 },
  { name: "Air Freight", count: 7 },
  { name: "Road Freight", count: 3 },
  { name: "Warehouse", count: 5 },
  { name: "Cargo Freight", count: 2 },
  { name: "Rail Freight", count: 8 },
];

const latestPosts = [
  {
    title: "The Future of Logistics Embracing Technology",
    date: "25 Nov, 2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6901TLFoWKWsFusPta-yEqsLN6JOMHw1qvw&s",
    link: "#",
  },
  {
    title: "Green Logistics Solutions for a Greener Future",
    date: "24 Nov, 2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6901TLFoWKWsFusPta-yEqsLN6JOMHw1qvw&s",
    link: "#",
  },
  {
    title: "Importers Achieve Savings Through the First Sale Rule!",
    date: "23 Nov, 2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6901TLFoWKWsFusPta-yEqsLN6JOMHw1qvw&s",
    link: "#",
  },
  {
    title: "Improving Supply Chains with AI Analytics",
    date: "22 Nov, 2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6901TLFoWKWsFusPta-yEqsLN6JOMHw1qvw&s",
    link: "#",
  },
];

const tags = ["Cargo", "Air Freight", "Shipping", "Freight", "Warehouse", "Marine"];

export default function ArticlePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`article-page${visible ? " appear" : ""}`}>
      {/* MAIN CONTENT */}
      <main className="article-page__main">
        <h1 className="article-title">Welcome to Blog Post!</h1>
        <p className="article-meta">
          <em>Posted on January 1, 2023 by Start Bootstrap</em>
        </p>

        <div className="article-tags">
          <span className="article-tag">Web Design</span>
          <span className="article-tag">Freebies</span>
        </div>

        <div className="article-image-wrap">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6901TLFoWKWsFusPta-yEqsLN6JOMHw1qvw&s"
            alt="Blog post"
            className="article-image"
          />
        </div>

        <div className="article-content">
          <p>
            Science is an enterprise that should be cherished as an activity of
            the free human mind. Because it transforms who we are, how we live,
            and it gives us an understanding of our place in the universe.
          </p>
          <p>
            The universe is large and old, and the ingredients for life as we
            know it are everywhere, so there's no reason to think that Earth
            would be unique in that regard. Whether or not life became
            intelligent is a different question, and we'll see if we find that.
          </p>
        </div>
      </main>

      {/* SIDEBAR */}
      <aside className="article-page__sidebar">
        {/* Search */}
        {/* <div className="widget widget--search">
          <h4 className="widget__title">Search</h4>
          <div className="widget__search">
            <input
              type="text"
              placeholder="Search here..."
              className="widget__input"
            />
            <button className="widget__btn">
              <FaSearch />
            </button>
          </div>
        </div> */}

        {/* Latest Post */}
        <div className="widget widget--latest">
          <h4 className="widget__title">ბოლო სიახლეები</h4>
          <ul className="widget__latest-list">
            {latestPosts.map((post, i) => (
              <li key={i} className="widget__latest-item">
                <img src={post.img} alt={post.title} />
                <div className="widget__info">
                  <small>
                    <FaCalendarAlt /> {post.date}
                  </small>
                  <a href={post.link}>{post.title}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="widget widget--tags">
          <h4 className="widget__title">თეგები</h4>
          <div className="widget__tags-list">
            {tags.map((tag) => (
              <a key={tag} href="#" className="widget__tag">
                {tag}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
