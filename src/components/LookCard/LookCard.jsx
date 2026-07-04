import { useEffect, useRef } from 'react'
import { useLang } from '../../i18n.jsx'
import './LookCard.css'

const CATEGORY_KEYS = {
  'Overlaped-Collared': 'replifa.filter.overlaped',
  'Round-Collared': 'replifa.filter.round',
  'Flare Guard': 'replifa.filter.flare',
  'Traditional Pattern': 'replifa.filter.pattern',
  'Under Layer': 'replifa.filter.underlayer',
  'Footwear': 'shoes.tag',
}

const LookCard = ({ look, onOpen }) => {
  const { lang, t } = useLang()
  const videoRef = useRef(null)

  // Mobile Chrome can block autoplay when React fails to reflect `muted` onto
  // the DOM property. Force it and trigger play() explicitly to be safe.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const attempt = () => { video.play().catch(() => {}) }
    attempt()
    video.addEventListener('canplay', attempt, { once: true })
    return () => video.removeEventListener('canplay', attempt)
  }, [look.cardVideo])

  const displayNumber = lang === 'zh' && look.numberZh ? look.numberZh : look.number
  const displayName = lang === 'zh' && look.nameZh ? look.nameZh : look.name
  const tagLabel = (tag) => (lang === 'zh' && CATEGORY_KEYS[tag] ? t(CATEGORY_KEYS[tag]) : tag)
  return (
    <article
      className="look-card"
      tabIndex={0}
      role="button"
      aria-label={`Open ${look.number} ${look.name}`}
      onClick={() => onOpen(look)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(look) }}
    >
      <figure>
        {look.cardVideo ? (
          <video
            ref={videoRef}
            src={look.cardVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-label={`${look.name} preview`}
          />
        ) : (
          <img src={look.filePath.additional?.[0] || look.filePath.main} alt={`${look.number} ${look.name}`} loading="lazy" />
        )}
      </figure>
      <div className="look-card-content">
        <small>{displayNumber}</small>
        <h3>{displayName}</h3>
        <div className="tag-list">
          {look.category.map((tag) => (
            <span className="tag" key={tag}>{tagLabel(tag)}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default LookCard
