import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import './HomePage.css'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Len Yitai Ma'

    animate('.hero-copy > *', {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(110, { start: 200 }),
      duration: 850,
      ease: 'out(3)',
    })

    const about = document.querySelector('#about')
    if (!about) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate('.split-copy > *', {
            opacity: [0, 1],
            translateY: [24, 0],
            delay: stagger(110, { start: 100 }),
            duration: 850,
            ease: 'out(3)',
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(about)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-page">
      <section className="hero" aria-label="RepliFa cover">
        <div className="hero-media">
          <picture>
            <source media="(max-width: 760px)" srcSet="/assets/hero-cover-mobile.jpg" />
            <img src="/assets/hero-cover.jpg" alt="RepliFa Fashion BFA Thesis Collection cover image" />
          </picture>
        </div>
        <div className="hero-overlay">
          <div className="hero-copy">
            <p className="eyebrow">Fashion BFA Thesis Collection</p>
            <h1>RepliFa</h1>
            <p className="hero-subtitle">A fashion portfolio exploring authentic Chinese aesthetics, garment structure, and the body beyond a eurocentric fashion system.</p>
          <div className="hero-actions">
            <Link to="/fashion" className="button primary">View Project</Link>
          </div>
          </div>
        </div>
        <div className="scroll-note">Scroll</div>
      </section>

      <section className="split-section" id="about">
        <div className="split-image">
          <img src="/assets/IMG_5375.jpg" alt="Designer in front of traditional Chinese architecture" />
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
