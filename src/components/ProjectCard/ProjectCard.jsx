import { Link } from 'react-router-dom'
import './ProjectCard.css'

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
        <h3>{project.name}</h3>
        <small>{project.caption}</small>
      </div>
    </Link>
  )
}

export default ProjectCard
