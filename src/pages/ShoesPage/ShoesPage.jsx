import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './ShoesPage.css'

const ShoesPage = () => {
  const [shoes, setShoes] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.title = 'Shoe Collection — Len Yitai Ma'

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

  return (
    <div className="shoes-page">
      <section className="shoes-intro">
        <img src="/assets/works/fashion/Shoes/2.jpg" alt="Mawangdui Han tomb excavation" />
        <Link className="back-link shoes-back" to="/fashion">← Fashion</Link>
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
            <img src="/assets/works/fashion/Shoes/4.jpg" alt="Forked-toe shoe detail" />
          </div>
          <div className="shoes-split-rotated">
            <img src="/assets/works/fashion/Shoes/3.jpg" alt="Forked-toe shoe" />
          </div>
        </div>
      </section>

      <section className="feature-look">
        <div className="feature-copy">
          <p className="eyebrow">Section three</p>
          <h2>Feature heading placeholder.</h2>
          <p>Placeholder copy — content coming soon.</p>
        </div>
        <div className="feature-gallery">
          <div className="project-placeholder" />
          <div className="project-placeholder" />
        </div>
      </section>

      <section className="shoes-section" id="shoes">
        <div className="section-heading">
          <p className="eyebrow">Footwear</p>
          <h2>RepliFa Shoe Collection</h2>
          <p>Footwear developed alongside the RepliFa collection.</p>
        </div>

        <div className="shoes-grid">
          {shoes.map((shoe) => (
            <LookCard key={shoe.number} look={shoe} onOpen={setSelected} />
          ))}
        </div>
      </section>

      <LookModal look={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default ShoesPage
