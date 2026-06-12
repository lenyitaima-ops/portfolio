import { Link, NavLink, useLocation } from 'react-router-dom'
import ContactButton from '../ContactButton/ContactButton'
import './Header.css'

const Header = () => {
  const { pathname } = useLocation()
  const lightHeader = pathname === '/' || pathname === '/fashion/shoes'

  return (
    <header className={`site-header ${lightHeader ? 'is-home' : ''}`} id="top">
      <Link className="brand" to="/" aria-label="Len Yitai Ma home">
        <span>Len Yitai Ma</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <div className="nav-dropdown">
          <span className="nav-trigger">Works</span>
          <div className="nav-menu">
            <NavLink to="/fashion">Fashion</NavLink>
            <NavLink to="/photography">Photography</NavLink>
          </div>
        </div>
        <ContactButton />
      </nav>
    </header>
  )
}

export default Header
