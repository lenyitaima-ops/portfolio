import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ModelViewer from '../../components/ModelViewer/ModelViewer'
import './PerfumePage.css'

const images = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `/assets/works/fashion/Perfume/image/${n}.jpg`
)

const PerfumePage = () => {
  useEffect(() => {
    document.title = 'Perfume — Fashion'
  }, [])

  return (
    <div className="perfume-page">
      <section className="perfume-section">
        <div className="section-heading">
          <Link className="back-link" to="/fashion">← Fashion</Link>
          <p className="eyebrow">Perfume</p>
          <h2>Perfume</h2>
          <p>A fragrance project — visual identity, posters, and product photography.</p>
        </div>

        <div className="perfume-gallery">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`Perfume ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <ModelViewer />
    </div>
  )
}

export default PerfumePage
