import { useEffect, useState } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { useLang } from '../../i18n.jsx'
import './PhotographyPage.css'

const PhotographyPage = () => {
  const { lang, t } = useLang()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    document.title = 'Photography — Len Yitai Ma'

    const load = async () => {
      try {
        const res = await fetch('/assets/works/project.json')
        const data = await res.json()
        setProjects(data.photography || [])
      } catch (error) {
        console.error('Error loading photography:', error)
      }
    }

    load()
  }, [])

  return (
    <div className="photography-page">
      <section className="photography-section">
        <div className="section-heading">
          <h2>{t('photography.title')}</h2>
          <p>{t('photography.desc')}</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              project={{
                name: lang === 'zh' && project.nameZh ? project.nameZh : project.name,
                path: `/photography/${project.slug}`,
                cover: project.cover,
                caption: lang === 'zh' && project.captionZh ? project.captionZh : project.caption,
              }}
              key={project.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default PhotographyPage
