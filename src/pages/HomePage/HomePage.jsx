import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import { useLang } from '../../i18n.jsx'
import './HomePage.css'

const HomePage = () => {
  const { t } = useLang()
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
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <h1>RepliFa</h1>
            {t('home.tagline') && <p className="hero-tagline">{t('home.tagline')}</p>}
            <p className="hero-subtitle">{t('home.subtitle')}</p>
          <div className="hero-actions">
            <Link to="/fashion" className="button primary">{t('home.cta')}</Link>
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
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h2>{t('about.name')}</h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <dl className="meta-list">
            <div><dt>{t('about.practiceLabel')}</dt><dd>{t('about.practiceValue')}</dd></div>
            <div><dt>{t('about.softwareLabel')}</dt><dd>{t('about.softwareValue')}</dd></div>
          </dl>
        </div>
      </section>
    </div>
  )
}

export default HomePage
