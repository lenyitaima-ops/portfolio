import { useEffect, useMemo, useState } from 'react'
import { looks } from '../../data/looks'
import LookCard from '../../components/LookCard/LookCard'
import LookModal from '../../components/LookModal/LookModal'
import './LooksPage.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'power', label: 'Power' },
  { key: 'structure', label: 'Structure' },
  { key: 'material', label: 'Material' },
  { key: 'minimal', label: 'Minimal' },
]

const LooksPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedLook, setSelectedLook] = useState(null)

  useEffect(() => {
    document.title = 'Looks — RepliFa'
  }, [])

  const visibleLooks = useMemo(
    () => looks.filter((look) => activeFilter === 'all' || look.category.includes(activeFilter)),
    [activeFilter]
  )

  return (
    <div className="looks-page">
      <section className="looks-section" id="looks">
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

export default LooksPage
