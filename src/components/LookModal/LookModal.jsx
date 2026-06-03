import { useEffect, useRef } from 'react'
import './LookModal.css'

const LookModal = ({ look, onClose }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (look && !dialog.open) dialog.showModal()
    if (!look && dialog.open) dialog.close()
  }, [look])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

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
            <img src={look.image} alt={`${look.number} ${look.title}`} />
            <img src={look.detail} alt={`${look.number} ${look.title} detail`} />
          </div>
          <div className="modal-copy">
            <p className="eyebrow">{look.number}</p>
            <h2>{look.title}</h2>
            <p>{look.summary}</p>
            <h3>Materials</h3>
            <ul>
              {look.materials.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default LookModal
