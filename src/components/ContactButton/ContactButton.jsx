import { useRef } from 'react'
import { useLang } from '../../i18n.jsx'
import './ContactButton.css'

const EMAIL = 'lenyitaima@gmail.com'

const ContactButton = () => {
  const contactRef = useRef(null)
  const { t } = useLang()

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
      <button className="pill" onClick={handleContact}>{t('nav.contact')}</button>

      <dialog
        className="contact-dialog"
        ref={contactRef}
        onClick={(e) => { if (e.target === contactRef.current) closeContact() }}
      >
        <div className="contact-dialog-inner">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2>{t('contact.copied')}</h2>
          <p className="contact-email">{EMAIL}</p>
          <p className="contact-wechat">{t('contact.wechat')}</p>
          <button className="contact-close" onClick={closeContact}>{t('contact.close')}</button>
        </div>
      </dialog>
    </>
  )
}

export default ContactButton
