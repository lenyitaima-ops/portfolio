import { useRef } from 'react'
import './ContactButton.css'

const EMAIL = 'lenyitaima@gmail.com'

const ContactButton = () => {
  const contactRef = useRef(null)

  const handleContact = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const input = document.createElement('textarea')
      input.value = EMAIL
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    contactRef.current?.showModal()
  }

  const closeContact = () => contactRef.current?.close()

  return (
    <>
      <button className="pill" onClick={handleContact}>Contact</button>

      <dialog
        className="contact-dialog"
        ref={contactRef}
        onClick={(e) => { if (e.target === contactRef.current) closeContact() }}
      >
        <div className="contact-dialog-inner">
          <p className="eyebrow">Contact</p>
          <h2>Email address copied to clipboard</h2>
          <p className="contact-email">{EMAIL}</p>
          <p className="contact-wechat">wechat: Lenyitaima</p>
          <button className="contact-close" onClick={closeContact}>Close</button>
        </div>
      </dialog>
    </>
  )
}

export default ContactButton
