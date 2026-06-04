import { useEffect, useRef } from 'react'
import './LookModal.css'

const LookModal = ({ look, onClose }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (look) {
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      if (dialog.open) dialog.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [look])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const images = look
    ? [look.filePath.main, ...(look.filePath.additional || [])]
    : []

  return (
    <dialog
      className="look-modal"
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
    >
      <button className="modal-close" aria-label="Close look details" onClick={onClose}>×</button>
      {look && (
        <div className="modal-inner">
          <div className="modal-images">
            {images.map((src, i) => (
              <figure key={i}>
                <img src={src} alt={`${look.number} ${look.name} ${i + 1}`} />
                {look.imageCaptions && look.imageCaptions[i] && (
                  <figcaption>{look.imageCaptions[i]}</figcaption>
                )}
              </figure>
            ))}
          </div>
          <div className="modal-copy">
            <p className="eyebrow">{look.number}</p>
            <h2>{look.name}</h2>
            {look.medium && <p className="modal-meta">{look.medium}</p>}
            <p>{look.description}</p>
            {look.materials && look.materials.length > 0 && (
              <>
                <h3>Materials</h3>
                <ul>
                  {look.materials.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {look.link && (
              <a className="modal-link" href={look.link} target="_blank" rel="noreferrer">
                {look.linkLabels?.[0] || 'View project'}
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

export default LookModal
