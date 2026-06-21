import { useEffect, useState } from 'react'
import './PhotographyPage.css'

const PhotographyPage = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    document.title = 'Photography — Len Yitai Ma'

    const load = async () => {
      try {
        const res = await fetch('/assets/works/project.json')
        const data = await res.json()
        setPhotos(data.photography || [])
      } catch (error) {
        console.error('Error loading photography:', error)
      }
    }

    load()
  }, [])

  // Fade each photo in as it scrolls into view.
  useEffect(() => {
    if (photos.length === 0) return
    const items = document.querySelectorAll('.photography-page .photo-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [photos])

  // Fade each photo in as it scrolls into view.
  useEffect(() => {
    if (photos.length === 0) return
    const items = document.querySelectorAll('.photo-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [photos])

  // Group photos into full-screen bands of 1-2 images for a spacious layout.
  const groups = []
  const pattern = [2, 1, 2, 1]
  let i = 0
  let p = 0
  while (i < photos.length) {
    const size = pattern[p % pattern.length]
    groups.push(photos.slice(i, i + size))
    i += size
    p += 1
  }

  return (
    <div className="photography-page">
      {groups.map((group, gi) => (
        <section className={`photo-band ${group.length === 1 ? 'single' : 'pair'}`} key={gi}>
          {group.map((src, idx) => (
            <figure className="photo-item" key={idx}>
              <img src={src} alt={`Photograph ${gi + 1}-${idx + 1}`} loading="lazy" />
            </figure>
          ))}
        </section>
      ))}
    </div>
  )
}

export default PhotographyPage
