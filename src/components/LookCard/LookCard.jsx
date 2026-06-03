import './LookCard.css'

const LookCard = ({ look, onOpen }) => {
  return (
    <article
      className="look-card"
      tabIndex={0}
      role="button"
      aria-label={`Open ${look.number} ${look.title}`}
      onClick={() => onOpen(look)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(look) }}
    >
      <figure>
        <img src={look.image} alt={`${look.number} ${look.title}`} loading="lazy" />
      </figure>
      <div className="look-card-content">
        <small>{look.number}</small>
        <h3>{look.title}</h3>
        <p>{look.summary}</p>
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
