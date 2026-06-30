import { useEffect } from 'react'
import { useLang } from '../../i18n.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import './FashionPage.css'

const FashionPage = () => {
  const { t } = useLang()

  const projects = [
    {
      name: 'RepliFa',
      path: '/fashion/replifa',
      cover: '/assets/works/fashion/RepliFa/1.jpg',
      caption: t('fashion.replifaCaption'),
    },
    {
      name: 'RepliFa Shoe Collection',
      path: '/fashion/shoes',
      cover: '/assets/works/fashion/Shoes/1.jpg',
      caption: t('fashion.shoesCaption'),
    },
    {
      name: "MER D'HIVER",
      path: '/fashion/perfume',
      cover: '/assets/works/fashion/Perfume/image/1.jpg',
      caption: t('fashion.perfumeCaption'),
    },
  ]

  useEffect(() => {
    document.title = 'Fashion — Len Yitai Ma'
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
            <ProjectCard project={project} key={project.name} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FashionPage
