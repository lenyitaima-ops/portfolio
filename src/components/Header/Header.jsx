import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <header className="site-header" id="top">
      <Link className="brand" to="/" aria-label="RepliFa home">
        <span>REPLIFA</span>
        <small>Len Yitai Ma · {year}</small>
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
        <a className="pill" href="mailto:lenyitaima@gmail.com">Contact</a>
      </nav>
    </header>
  )
}

export default Header
