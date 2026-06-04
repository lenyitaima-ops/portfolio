import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './FashionPage.css'

const projects = [
  {
    name: 'RepliFa',
    path: '/fashion/replifa',
    cover: '/assets/works/fashion/RepliFa/TheNew/image/1.jpg',
    caption: 'Fashion BFA Thesis Collection',
  },
  {
    name: 'Perfume',
    path: '/fashion/perfume',
    cover: '/assets/works/fashion/Perfume/image/1.jpg',
    caption: 'Fragrance project',
  },
]

const FashionPage = () => {
  useEffect(() => {
    document.title = 'Fashion — RepliFa'
  }, [])

  return (
    <div className="fashion-page">
      <section className="fashion-section">
        <div className="section-heading">
          <p className="eyebrow">Fashion</p>
          <h2>Projects</h2>
          <p>Select a project to explore its looks, materials, and structure.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <Link className="project-card" to={project.path} key={project.name}>
              <figure>
                {project.cover ? (
                  <img src={project.cover} alt={project.name} loading="lazy" />
                ) : (
                  <div className="project-placeholder" />
                )}
              </figure>
              <div className="project-card-content">
                <h3>{project.name}</h3>
                <small>{project.caption}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FashionPage
