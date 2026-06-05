import './LookCard.css'

const LookCard = ({ look, onOpen }) => {
  return (
    <article
      className="look-card"
      tabIndex={0}
      role="button"
      aria-label={`Open ${look.number} ${look.name}`}
      onClick={() => onOpen(look)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(look) }}
    >
      <figure>
        <img src={look.filePath.additional?.[0] || look.filePath.main} alt={`${look.number} ${look.name}`} loading="lazy" />
      </figure>
      <div className="look-card-content">
        <small>{look.number}</small>
        <h3>{look.name}</h3>
        <div className="tag-list">
          {look.category.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default LookCard
