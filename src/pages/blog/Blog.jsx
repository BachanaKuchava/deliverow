import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { FaCalendarAlt, FaSearch, FaArrowRight } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { LanguageContext } from '../../LanguageContext'
import './blog.scss'

export default function Blog() {
  const { lang } = useContext(LanguageContext)
  const [posts, setPosts]     = useState([])
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const perPage               = 6
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/blogCategory/blogss`)
      .then(res => {
        if (!mounted) return
        setPosts(res.data.data.category.posts.data || [])
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [lang])

  if (loading) return null

  const q        = search.toLowerCase()
  const filtered = posts.filter(p => {
    const t    = (p.title || '').toLowerCase()
    const body = (p.post?.[lang.toLowerCase()] || '')
                   .replace(/<[^>]+>/g, '')
                   .toLowerCase()
    return t.includes(q) || body.includes(q)
  })

  const total = Math.ceil(filtered.length / perPage)
  const slice = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <section className="blog-section">
      <div className="search-container">
        <input
          type="text"
          placeholder={lang==='KA' ? 'მოძებნეთ სიახლე...' : 'Search articles...'}
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="cards-grid">
        {slice.map(post => {
          const img = post.image?.original
                    || post.images?.[0]?.original_url
                    || 'https://via.placeholder.com/600x350?text=No+Image'
          const date = new Date(post.published_at)
            .toLocaleDateString(lang==='KA'?'ka-GE':'en-US',{day:'2-digit',month:'short',year:'numeric'})
          const txt     = (post.post?.[lang.toLowerCase()]||'').replace(/<[^>]+>/g,'')
          const excerpt = txt.length > 150 ? txt.slice(0,150).trimEnd() + '…' : txt

          return (
            <div className="blog-card" key={post.id}>
              <img src={img} alt={post.title} />
              <div className="card-content">
                <div className="card-date">
                  <FaCalendarAlt /> <span>{date}</span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{excerpt}</p>
                <Link to={`/${lang.toLowerCase()}/blog/${post.slug}`} className="read-more">
                  {lang==='KA'?'გაიგე მეტი':'Read more'} <FaArrowRight />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {total > 1 && (
        <div className="pagination">
          {Array.from({length:total},(_,i)=>(
            <button
              key={i}
              className={page===i+1?'page active':'page'}
              onClick={()=>setPage(i+1)}
            >{i+1}</button>
          ))}
        </div>
      )}
    </section>
  )
}
