import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ContactButton from '../ContactButton/ContactButton'
import './Header.css'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header" id="top">
      <Link className="brand" to="/" aria-label="Len Yitai Ma home">
        <span>Len Yitai Ma</span>
      </Link>
      <button
        className="nav-toggle"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary navigation" onClick={() => setOpen(false)}>
        <div className="nav-dropdown">
          <span className="nav-trigger" onClick={(e) => e.stopPropagation()}>Works</span>
          <div className="nav-menu">
            <NavLink to="/fashion">Fashion</NavLink>
            <NavLink to="/photography">Photography</NavLink>
          </div>
        </div>
        <NavLink to="/contact">Credits</NavLink>
        <ContactButton />
      </nav>
    </header>
  )
}

export default Header
