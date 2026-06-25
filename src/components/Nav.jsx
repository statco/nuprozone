import { useState, useEffect } from 'react'
import './Nav.css'

export default function Nav({ t, lang, toggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.wholesale, href: '#why' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__logo">
          <img src="/logo.png" alt="NUPROZ" height="44" />
        </a>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <button className="nav__lang" onClick={toggleLang}>{t.nav.lang}</button>
          </li>
        </ul>

        <button
          className="nav__burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}
