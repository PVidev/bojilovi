import React, { useState, useEffect } from 'react'
import { Heart, Menu, X, Sparkles, Camera } from 'lucide-react'
import './Navbar.css'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Таймер', href: '#timer', icon: Sparkles },
    { label: 'Поканата', href: '#invitation', icon: Heart },
    { label: 'Снимки от гости', href: '#guest-photos', icon: Camera },
    { label: 'Официални снимки', href: '#wedding-photos', icon: Sparkles },
    { label: 'Пожелания', href: '#wishes', icon: Heart },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="navbar-brand-sub">Сем. Божилови</span>
          <span className="navbar-brand-names font-script">София & Алекс</span>
        </a>

        <nav className="navbar-desktop">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Затвори менюто' : 'Отвори менюто'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar-mobile-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <item.icon size={18} className="navbar-mobile-icon" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
export default Navbar
