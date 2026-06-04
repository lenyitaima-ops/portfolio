import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  useEffect(() => {
    document.title = 'RepliFa — Len Yitai Ma'
  }, [])

  return (
    <div className="home-page">
      <section className="hero" aria-label="RepliFa cover">
        <div className="hero-media">
          <img src="/assets/hero-cover.jpg" alt="RepliFa Fashion BFA Thesis Collection cover image" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Fashion BFA Thesis Collection</p>
          <h1>REPLIFA</h1>
          <p className="hero-subtitle">A fashion portfolio exploring authentic Chinese aesthetics, garment structure, and the body beyond a Eurocentred fashion system.</p>
          <div className="hero-actions">
            <Link to="/fashion" className="button primary">View Works</Link>
            <a href="#about" className="button secondary">Read Concept</a>
          </div>
        </div>
        <div className="scroll-note">Scroll</div>
      </section>

      <section className="split-section" id="about">
        <div className="split-image">
          <img src="/assets/about-architecture.jpg" alt="Designer in front of traditional Chinese architecture" />
        </div>
        <div className="split-copy">
          <p className="eyebrow">Designer</p>
          <h2>Len Yitai Ma</h2>
          <p>With over eight years of experience in wearing and researching traditional Chinese Han dress, the designer’s understanding of authentic Chinese aesthetics extends beyond clothing itself.</p>
          <p>It reaches into traditional architecture, pattern systems, accessories, footwear, headwear, ritual context, and academic knowledge — forming the foundation of this design practice.</p>
          <dl className="meta-list">
            <div><dt>Practice</dt><dd>Traditional dress research / garment design / footwear</dd></div>
            <div><dt>Focus</dt><dd>Hanfu structure, cultural context, and contemporary reconstruction</dd></div>
          </dl>
        </div>
      </section>
    </div>
  )
}

export default HomePage
