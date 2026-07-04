import { Link } from 'react-router-dom'
import './ProjectCard.css'

const renderName = (name) =>
  name.split(/([\u4e00-\u9fff]+)/).map((part, i) =>
    /[\u4e00-\u9fff]/.test(part) ? <span className="cjk" key={i}>{part}</span> : part
  )

const ProjectCard = ({ project }) => {
  return (
    <Link className="project-card" to={project.path}>
      <figure>
        {project.cover ? (
          <img src={project.cover} alt={project.name} loading="lazy" />
        ) : (
          <div className="project-placeholder" />
        )}
      </figure>
      <div className="project-card-content">
        <h3>{renderName(project.name)}</h3>
        <small>{project.caption}</small>
      </div>
    </Link>
  )
}

export default ProjectCard
