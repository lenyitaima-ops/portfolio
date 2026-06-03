import { useEffect, useMemo, useState } from 'react'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './FashionPage.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'power', label: 'Power' },
  { key: 'structure', label: 'Structure' },
  { key: 'material', label: 'Material' },
  { key: 'minimal', label: 'Minimal' },
]

const FashionPage = () => {
  const [looks, setLooks] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedLook, setSelectedLook] = useState(null)

  useEffect(() => {
    document.title = 'Fashion — RepliFa'

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

  const visibleLooks = useMemo(
    () => looks.filter((look) => activeFilter === 'all' || look.category.includes(activeFilter)),
    [looks, activeFilter]
  )

  return (
    <div className="fashion-page">
      <section className="fashion-section" id="fashion">
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

export default FashionPage
