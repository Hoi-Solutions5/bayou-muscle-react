import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const posts = [
  {
    id: 1,
    title: 'How to Combine Nutrition and Training for Maximum Results',
    cat: 'Nutrition',
    date: 'March 15, 2025',
    author: 'Dr. Sarah Miles',
    excerpt: "Achieving your fitness goals isn't just about working out — it's about combining smart nutrition with strategic training. In this guide, we break down the science of nutrient timing and how to fuel your sessions.",
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Creatine Supplementation',
    cat: 'Supplements',
    date: 'February 28, 2025',
    author: 'James Thornton',
    excerpt: 'Creatine is one of the most researched supplements in sports nutrition. Here\'s everything you need to know about loading, timing, and choosing the right form.',
    img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 3,
    title: '5 Signs You\'re Overtraining (And What To Do About It)',
    cat: 'Training',
    date: 'February 10, 2025',
    author: 'Marcus Lee',
    excerpt: 'More isn\'t always better. Learn to recognise the warning signs of overtraining syndrome before it derails your progress and your health.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Protein Timing: Does It Actually Matter?',
    cat: 'Nutrition',
    date: 'January 22, 2025',
    author: 'Dr. Sarah Miles',
    excerpt: 'The "anabolic window" has been debated for years. New research reveals what actually matters when it comes to protein intake and muscle synthesis.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Building a Home Gym: What You Actually Need',
    cat: 'Lifestyle',
    date: 'January 5, 2025',
    author: 'Emma Clarke',
    excerpt: 'Skip the gimmicks. These are the only pieces of equipment you need to build a seriously effective home training setup — without breaking the bank.',
    img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Why Sleep is the Most Underrated Performance Tool',
    cat: 'Recovery',
    date: 'December 18, 2024',
    author: 'Marcus Lee',
    excerpt: 'You can train hard and eat well, but without quality sleep, you\'re leaving serious gains on the table. Here\'s the science of sleep and recovery.',
    img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80',
    readTime: '5 min read',
    featured: false,
  },
];

const categories = ['All', 'Nutrition', 'Supplements', 'Training', 'Lifestyle', 'Recovery'];

export default function Blog({ onNavigate }) {
  const [activecat, setActivecat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = posts.find(p => p.featured);
  const filtered = posts.filter(p => {
    const matchesCat = activecat === 'All' || p.cat === activecat;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch && !p.featured;
  });

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="blog-hero-content">
          <p className="section-subheading" style={{ color: 'var(--color-primary)' }}>Bayou Muscle Blog</p>
          <h1 className="blog-hero-title">News, Stories &<br />Articles for a Stronger You</h1>
          {/* Search */}
          <div className="blog-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="blog-featured">
          <div className="blog-featured-inner">
            <div className="blog-featured-img">
              <img src={featured.img} alt={featured.title} />
              <span className="blog-featured-tag">Featured</span>
            </div>
            <div className="blog-featured-content">
              <span className="blog-post-cat">{featured.cat}</span>
              <h2 className="blog-featured-title">{featured.title}</h2>
              <p className="blog-featured-excerpt">{featured.excerpt}</p>
              <div className="blog-post-meta">
                <span className="blog-meta-author">By {featured.author}</span>
                <span className="blog-meta-sep">·</span>
                <span>{featured.date}</span>
                <span className="blog-meta-sep">·</span>
                <span>{featured.readTime}</span>
              </div>
              <a href="#" className="read-more" style={{ marginTop: 8, display: 'inline-block' }}>
                Read Article →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <div className="blog-filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-cat-btn${activecat === cat ? ' active' : ''}`}
            onClick={() => setActivecat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <section className="blog-grid-section">
        {filtered.length === 0 ? (
          <div className="no-products" style={{ padding: '80px 0' }}>
            No articles found. Try a different search or category.
          </div>
        ) : (
          <div className="blog-posts-grid">
            {filtered.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-img">
                  <img src={post.img} alt={post.title} loading="lazy" />
                  <span className="blog-card-cat">{post.cat}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-post-meta">
                    <span>{post.date}</span>
                    <span className="blog-meta-sep">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-meta-author">By {post.author}</span>
                    <a href="#" className="read-more">Read More</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter strip */}
      <section className="blog-newsletter">
        <div className="blog-newsletter-inner">
          <div>
            <h3 className="blog-newsletter-title">Get Articles Delivered to Your Inbox</h3>
            <p className="blog-newsletter-sub">Join 15,000+ subscribers. No spam, just quality content.</p>
          </div>
          <div className="blog-newsletter-form">
            <input type="email" placeholder="Your email address" className="cta-email-input" />
            <button className="cta-subscribe-btn" style={{ background: 'var(--color-primary)', color: 'var(--color-black)' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
