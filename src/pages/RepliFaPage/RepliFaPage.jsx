import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './RepliFaPage.css'

const UNDER_LAYER = 'Under Layer'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Traditional Pattern', label: 'Traditional Pattern' },
  { key: 'Flare Guard', label: 'Flare Guard' },
  { key: 'Overlaped-Collared', label: 'Overlaped-Collared' },
  { key: 'Round-Collared', label: 'Round-Collared' },
  { key: UNDER_LAYER, label: 'Under Layer' },
]

const RepliFaPage = () => {
  const [looks, setLooks] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedLook, setSelectedLook] = useState(null)

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
    // "All" shows every look except the hidden under-layer placeholders.
    if (activeFilter === 'all') {
      return looks.filter((look) => !look.category.includes(UNDER_LAYER))
    }
    return looks.filter((look) => look.category.includes(activeFilter))
  }, [looks, activeFilter])

  return (
    <div className="replifa-page">
      <div className="replifa-top">
        <Link className="back-link" to="/fashion">← Fashion</Link>
      </div>

      <section className="statement" id="collection">
        <div className="section-number">01</div>
        <div>
          <p className="eyebrow">Collection statement</p>
          <h2>RepliFa challenges the established Eurocentred fashion system.</h2>
        </div>
        <p className="large-text">It questions authority at a fundamental level: the philosophy of the body, modes of representation, and the historical forces that have subtly shaped how people understand garments.</p>
      </section>

      <section className="editorial-band" aria-label="Editorial image">
        <img src="/assets/editorial-collage.jpg" alt="Editorial collage from RepliFa lookbook" />
        <div className="band-copy">
          <p>Authenticity is not nostalgia. It is a method of rebuilding visual power from its own cultural logic.</p>
        </div>
      </section>

      <section className="feature-look" id="feature">
        <div className="feature-copy">
          <p className="eyebrow">Featured detail</p>
          <h2>Garment as structure, structure as argument.</h2>
          <p>The collection treats the “摆” not as a decorative extension, but as a structural device that can reshape the body’s outline, alter the language of authority, and carry cultural memory into contemporary styling.</p>
        </div>
        <div className="feature-gallery">
          <img src="/assets/works/fashion/RepliFa/ThePagoda/image/2.jpg" alt="Detail of Look 5 the Pagoda" />
          <img src="/assets/works/fashion/RepliFa/TheDeconstructed/image/2.jpg" alt="Detail of Look 3 the Deconstructed" />
        </div>
      </section>

      <section className="replifa-section" id="replifa">
        <div className="section-heading">
          <p className="eyebrow">Selected looks</p>
          <h2>Eight looks from RepliFa</h2>
          <p>Each look translates historical Chinese garment logic into a contemporary fashion language through structure, silhouette, fabric, and proportion.</p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter looks">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="look-grid">
          {visibleLooks.map((look) => (
            <LookCard key={look.number} look={look} onOpen={setSelectedLook} />
          ))}
        </div>
      </section>

      <LookModal look={selectedLook} onClose={() => setSelectedLook(null)} />
    </div>
  )
}

export default RepliFaPage
