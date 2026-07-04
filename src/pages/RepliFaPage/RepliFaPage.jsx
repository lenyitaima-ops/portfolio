import { useEffect, useMemo, useRef, useState } from 'react'
import { createAnimatable, animate, stagger } from 'animejs'
import { useLang } from '../../i18n.jsx'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './RepliFaPage.css'

const UNDER_LAYER = 'Under Layer'

const bandImages = [
  '/assets/works/fashion/RepliFa/2.jpg',
  '/assets/works/fashion/RepliFa/3.jpg',
  '/assets/works/fashion/RepliFa/4.jpg',
  '/assets/works/fashion/RepliFa/5.jpg',
]

const galleryImages = [
  '/assets/works/fashion/RepliFa/2.jpg',
  '/assets/works/fashion/RepliFa/3.jpg',
  '/assets/works/fashion/RepliFa/4.jpg',
  '/assets/works/fashion/RepliFa/5.jpg',
  '/assets/works/fashion/RepliFa/8.jpg',
  '/assets/works/fashion/RepliFa/9.jpg',
  '/assets/works/fashion/RepliFa/10.jpg',
  '/assets/works/fashion/RepliFa/11.jpg',
  '/assets/works/fashion/RepliFa/12.jpg',
  '/assets/works/fashion/RepliFa/13.jpg',
  '/assets/works/fashion/RepliFa/14.jpg',
  '/assets/works/fashion/RepliFa/15.jpg',
  '/assets/works/fashion/RepliFa/16.jpg',
  '/assets/works/fashion/RepliFa/17.jpg',
  '/assets/works/fashion/RepliFa/18.jpg',
  '/assets/works/fashion/RepliFa/19.jpg',
  '/assets/works/fashion/RepliFa/20.jpg',
  '/assets/works/fashion/RepliFa/21.jpg',
  '/assets/works/fashion/RepliFa/22.jpg',
]

const filters = [
  { key: 'all', tkey: 'replifa.filter.all' },
  { key: 'Overlaped-Collared', tkey: 'replifa.filter.overlaped' },
  { key: 'Round-Collared', tkey: 'replifa.filter.round' },
  { key: 'Flare Guard', tkey: 'replifa.filter.flare' },
  { key: 'Traditional Pattern', tkey: 'replifa.filter.pattern' },
  { key: UNDER_LAYER, tkey: 'replifa.filter.underlayer' },
]

const RepliFaPage = () => {
  const { t, lang } = useLang()
  const [looks, setLooks] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedLook, setSelectedLook] = useState(null)
  const bandRef = useRef(null)
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const videoSectionRef = useRef(null)
  const videoManualPause = useRef(false)
  const featureVideoRef = useRef(null)
  const featureSectionRef = useRef(null)
  const featureManualPause = useRef(false)

  const toggleVideo = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { videoManualPause.current = false; v.play() }
    else { videoManualPause.current = true; v.pause() }
  }

  const toggleFeatureVideo = () => {
    const v = featureVideoRef.current
    if (!v) return
    if (v.paused) { featureManualPause.current = false; v.play() }
    else { featureManualPause.current = true; v.pause() }
  }

  // Pause each video once its section scrolls out of view, resume when visible —
  // but never auto-resume a video the user has manually paused.
  useEffect(() => {
    const items = [
      { section: videoSectionRef.current, v: videoRef.current, manual: videoManualPause },
      { section: featureSectionRef.current, v: featureVideoRef.current, manual: featureManualPause },
    ].filter((i) => i.section && i.v)
    if (items.length === 0) return

    let frame = 0
    const check = () => {
      frame = 0
      items.forEach(({ section, v, manual }) => {
        const rect = section.getBoundingClientRect()
        const inView = rect.bottom > 0 && rect.top < window.innerHeight
        if (!inView) {
          v.pause()
        } else if (!manual.current) {
          v.play().catch(() => {})
        }
      })
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(check)
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const band = bandRef.current
    const track = trackRef.current
    if (!band || !track) return

    // createAnimatable smoothly tweens the track toward each target x,
    // giving the scroll motion easing/inertia instead of a hard 1:1 follow.
    const animatable = createAnimatable(track, {
      x: { duration: 1800, ease: 'out(2)' },
    })

    let frame = 0
    const update = () => {
      frame = 0
      const rect = band.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      // 0 when the band first enters from the bottom, 1 when it has left the top.
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / total, 0), 1)
      const maxShift = track.scrollWidth - band.clientWidth
      if (maxShift > 0) animatable.x(-progress * maxShift)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      animatable.revert?.()
    }
  }, [])

  useEffect(() => {
    const statement = document.querySelector('#collection')
    if (!statement) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate('#collection .statement-copy > *', {
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
    observer.observe(statement)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.title = 'RepliFa — Len Yitai Ma'

    const loadLooks = async () => {
      try {
        const response = await fetch('/assets/works/project.json')
        const data = await response.json()
        setLooks(data.projects)
      } catch (error) {
        console.error('Error loading looks:', error)
      }
    }

    loadLooks()
  }, [])

  const visibleLooks = useMemo(() => {
    // Footwear lives on its own page, so it never shows in the RepliFa grid.
    const looksOnly = looks.filter((look) => !look.category.includes('Footwear'))
    // "All" shows every look except the hidden under-layer placeholders.
    if (activeFilter === 'all') {
      return looksOnly.filter((look) => !look.category.includes(UNDER_LAYER))
    }
    return looksOnly.filter((look) => look.category.includes(activeFilter))
  }, [looks, activeFilter])

  return (
    <div className="replifa-page">
      <section className="replifa-video" ref={videoSectionRef} onClick={toggleVideo}>
        <video
          ref={videoRef}
          src="/assets/works/fashion/RepliFa/Teaser.mp4"
          autoPlay
          loop
          playsInline
          onLoadedMetadata={(e) => { e.currentTarget.volume = 0.3 }}
        />
      </section>

      <section className="statement" id="collection">
        <div className="statement-media">
          <img src="/assets/works/fashion/RepliFa/7.jpeg" alt="RepliFa garment reference" />
          <img src="/assets/works/fashion/RepliFa/6.jpg" alt="RepliFa garment reference" />
        </div>
        <div className="statement-copy">
          <p className="eyebrow">{t('replifa.statementEyebrow')}</p>
          <h2>{t('replifa.statementH2')}</h2>
          <p className="large-text">{t('replifa.statementBody')}</p>
        </div>
      </section>

      <section className="editorial-band" aria-label="Editorial image" ref={bandRef}>
        <div className="band-track" ref={trackRef}>
          {bandImages.map((src, i) => (
            <img key={i} src={src} alt={`RepliFa editorial ${i + 1}`} />
          ))}
        </div>
        <div className="band-copy">
          <p>{t('replifa.bandCopy')}</p>
        </div>
      </section>

      <section className="feature-look" id="feature" ref={featureSectionRef}>
        <div className="feature-copy">
          <p className="eyebrow">{t('replifa.featureEyebrow')}</p>
          <p>{t('replifa.featureBody')}</p>
        </div>
        <div className="feature-gallery" onClick={toggleFeatureVideo}>
          <video
            ref={featureVideoRef}
            src="/assets/works/fashion/RepliFa/Teaser2.mp4"
            autoPlay
            loop
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.volume = 0.3 }}
          />
        </div>
      </section>

      <section className="replifa-section" id="replifa">
        <div className="section-heading">
          <div className="section-heading-text">
            <h2>{t('replifa.looksH2')}</h2>
            <p>{t('replifa.looksDesc')}</p>
          </div>
          <div className="section-actions">
            <a className="download-btn" href={lang === 'zh' ? '/assets/works/fashion/RepliFa/pdfs/fullLookChinese.pdf' : '/assets/works/fashion/RepliFa/pdfs/fullLook.pdf'} download>{t('replifa.downloadLookbook')}</a>
            <a className="download-btn" href={lang === 'zh' ? '/assets/works/fashion/RepliFa/pdfs/portfolioChinese.pdf' : '/assets/works/fashion/RepliFa/pdfs/portfolio.pdf'} download>{t('replifa.downloadPortfolio')}</a>
          </div>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter looks">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {t(f.tkey)}
            </button>
          ))}
        </div>

        <div className="look-grid">
          {visibleLooks.map((look) => (
            <LookCard key={look.number} look={look} onOpen={setSelectedLook} />
          ))}
        </div>
      </section>

      <section className="replifa-gallery" aria-label="RepliFa gallery">
        <p className="gallery-heading">{t('replifa.moreImages')}</p>
        {galleryImages.map((src, i) => (
          <img key={i} src={src} alt={`RepliFa ${i + 1}`} />
        ))}
      </section>

      <LookModal look={selectedLook} onClose={() => setSelectedLook(null)} />
    </div>
  )
}

export default RepliFaPage
