import { useEffect, useState } from 'react'
import { animate, stagger } from 'animejs'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './ShoesPage.css'

const ShoesPage = () => {
  const [shoes, setShoes] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.title = 'Shoe Collection — Len Yitai Ma'

    animate('.shoes-hero-copy > *', {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(110, { start: 200 }),
      duration: 850,
      ease: 'out(3)',
    })

    const loadShoes = async () => {
      try {
        const response = await fetch('/assets/works/project.json')
        const data = await response.json()
        setShoes(data.projects.filter((p) => p.category.includes('Footwear')))
      } catch (error) {
        console.error('Error loading shoes:', error)
      }
    }

    loadShoes()
  }, [])

  // Pause + hide card videos while a look is open in the lightroom. Playing
  // videos sit on their own GPU layer that backdrop-filter can't blur, so they
  // must be hidden for the modal's frosted backdrop to read correctly.
  useEffect(() => {
    const videos = document.querySelectorAll('.shoes-grid video')
    videos.forEach((v) => {
      if (selected) {
        v.pause()
        v.style.visibility = 'hidden'
      } else {
        v.style.visibility = ''
        v.play().catch(() => {})
      }
    })
  }, [selected])

  return (
    <div className="shoes-page">
      <section className="shoes-hero" aria-label="RepliFa Shoe Collection cover">
        <div className="shoes-hero-media">
          <img src="/assets/works/fashion/Shoes/0.jpg" alt="RepliFa Shoe Collection" />
        </div>
        <div className="shoes-hero-overlay">
          <div className="shoes-hero-copy">
            <h1>RepliFa</h1>
            <p className="shoes-hero-sub">Shoe Collection</p>
          </div>
        </div>
      </section>

      <section className="shoes-intro">
        <img src="/assets/works/fashion/Shoes/2.jpg" alt="Mawangdui Han tomb excavation" />
        <div className="shoes-intro-copy">
          <p>The Mawangdui Han tombs preserve a rich and complete aesthetic system. Among its most representative elements, the forked-toe shoe stands out as one of the earliest footwear forms and one of the most influential prototypes in the later development of Chinese footwear.</p>
        </div>
      </section>

      <section className="shoes-split">
        <div className="shoes-split-left">
          <img src="/assets/works/fashion/Shoes/5.jpg" alt="Forked-toe shoes from Mawangdui Han tombs" />
        </div>
        <div className="shoes-split-right">
          <div className="shoes-split-rotated">
            <img src="/assets/works/fashion/Shoes/4.png" alt="Forked-toe shoe detail" />
          </div>
          <div className="shoes-split-rotated">
            <img src="/assets/works/fashion/Shoes/3.png" alt="Forked-toe shoe" />
          </div>
        </div>
      </section>

      <section className="shoes-section" id="shoes">
        <div className="section-heading">
          <h2>RepliFa Shoe Collection</h2>
          <p>Footwear developed alongside the RepliFa collection.</p>
        </div>

        <div className="shoes-grid">
          {shoes.map((shoe) => (
            <LookCard key={shoe.name} look={shoe} onOpen={setSelected} />
          ))}
        </div>
      </section>

      <LookModal look={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default ShoesPage
