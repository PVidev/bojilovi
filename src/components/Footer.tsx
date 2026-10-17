import React from 'react'
import { Heart, ArrowUp, Sparkles, ExternalLink } from 'lucide-react'
import './Footer.css'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-section">
      <div className="footer-glow" />

      <div className="footer-container">
        <div className="footer-monogram font-script">София & Алекс</div>
        <p className="footer-family font-serif">Сем. Божилови</p>
        <p className="footer-date">16 октомври 2026 г. • Вила Екатерина, Вакарел</p>

        <div className="ornament-line">
          <span className="ornament-symbol">❦</span>
        </div>

        {/* User Required Attribution */}
        <div className="footer-attribution">
          <span>Създаден от </span>
          <a
            href="https://pvidev.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author-link"
          >
            <strong>PVidev Dev.</strong>
            <ExternalLink size={13} className="footer-ext-icon" />
          </a>
          <span> Специално за сем. Божилови | Алекс и София Божилови </span>
          <span className="footer-heart-symbol" role="img" aria-label="сърце">
            ❤️
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-scroll-top-btn"
          aria-label="Върни се в началото"
        >
          <ArrowUp size={18} />
          <span>Към началото</span>
        </button>

        <p className="footer-copy">
          © 2026 Сем. Божилови. Всички спомени са запазени с любов.
        </p>
      </div>
    </footer>
  )
}
export default Footer
