import { useEffect } from 'react'
import { useLang } from '../../i18n.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import './FashionPage.css'

const FashionPage = () => {
  const { t, lang } = useLang()

  const projects = [
    {
      name: 'RepliFa',
      path: '/fashion/replifa',
      cover: lang === 'zh' ? '/assets/works/fashion/RepliFa/23.jpg' : '/assets/works/fashion/RepliFa/1.jpg',
      caption: t('fashion.replifaCaption'),
    },
    {
      name: lang === 'zh' ? 'Replifa鞋履延伸系列' : 'RepliFa Shoe Collection',
      path: '/fashion/shoes',
      cover: lang === 'zh' ? '/assets/works/fashion/Shoes/6.jpg' : '/assets/works/fashion/Shoes/1.jpg',
      caption: t('fashion.shoesCaption'),
    },
    {
      name: "MER D'HIVER",
      path: '/fashion/perfume',
      cover: '/assets/works/fashion/Perfume/5.jpg',
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
          <p className="eyebrow">{t('fashion.eyebrow')}</p>
          <h2>{t('fashion.projects')}</h2>
          <p>{t('fashion.desc')}</p>
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
