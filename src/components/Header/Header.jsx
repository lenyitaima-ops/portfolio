import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../../i18n.jsx'
import ContactButton from '../ContactButton/ContactButton'
import './Header.css'

const Header = () => {
  const headerRef = useRef(null)
  const { pathname } = useLocation()
  const { t, setLang } = useLang()
  const lightHeader = pathname === '/' || pathname === '/fashion/shoes'

  // Expose the header's real height as --header-h so pages can offset content
  // below the fixed header. It updates on resize and when the text (e.g. the
  // language switch) changes the header's height.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <header ref={headerRef} className={`site-header ${lightHeader ? 'is-home' : ''}`} id="top">
      <Link className="brand" to="/" aria-label="Len Yitai Ma home">
        <span>{t('brand')}</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <div className="nav-dropdown">
          <span className="nav-trigger">{t('nav.works')}</span>
          <div className="nav-menu">
            <NavLink to="/fashion">{t('nav.fashion')}</NavLink>
            <NavLink to="/photography">{t('nav.photography')}</NavLink>
          </div>
        </div>
        <ContactButton />
        <div className="nav-dropdown lang">
          <span className="nav-trigger">{t('nav.language')}</span>
          <div className="nav-menu">
            <button type="button" onClick={() => setLang('en')}>English</button>
            <button type="button" onClick={() => setLang('zh')}>中文</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
