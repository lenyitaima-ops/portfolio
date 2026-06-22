import { useEffect, useRef, useState } from 'react'
import './LookModal.css'

const LookModal = ({ look, onClose }) => {
  const dialogRef = useRef(null)
  const processRef = useRef(null)
  const [processOpen, setProcessOpen] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (look) {
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      if (dialog.open) dialog.close()
      document.body.style.overflow = ''
      setProcessOpen(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [look])

  useEffect(() => {
    const dialog = processRef.current
    if (!dialog) return
    if (processOpen) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [processOpen])

  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return
      if (processOpen) setProcessOpen(false)
      else onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, processOpen])

  const images = look
    ? [look.filePath.main, ...(look.filePath.additional || [])]
    : []

  const processImages = look?.process || []

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
            {look.description && <p>{look.description}</p>}
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
            {processImages.length > 0 && (
              <button className="modal-process-btn" onClick={() => setProcessOpen(true)}>
                Check full Process
              </button>
            )}
          </div>
        </div>
      )}

      <dialog
        className="process-modal"
        ref={processRef}
        onCancel={(e) => { e.preventDefault(); setProcessOpen(false) }}
        onClick={(e) => { if (e.target === processRef.current) setProcessOpen(false) }}
      >
        <div className="process-inner">
          {processImages.map((src, i) => (
            <div className="process-item" key={i}>
              <img src={src} alt={`${look?.name || ''} process ${i + 1}`} />
            </div>
          ))}
        </div>
      </dialog>
    </dialog>
  )
}

export default LookModal
