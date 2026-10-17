import React from 'react'
import { CalendarDays, MapPin, Heart, Camera, MessageCircleHeart, Sparkles } from 'lucide-react'
import guestPhotosData from '../data/guestPhotos.json'
import './Hero.css'

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const guestPhotoCount = guestPhotosData.length

  return (
    <section className="hero-section" id="hero">
      <div className="hero-decoration hero-decoration--top" />
      <div className="hero-decoration hero-decoration--bottom" />

      <div className="hero-card">
        <div className="hero-eyebrow">
          <Sparkles size={14} className="hero-eyebrow-icon" />
          <span>Сватбена галерия & спомени</span>
          <Sparkles size={14} className="hero-eyebrow-icon" />
        </div>

        <div className="hero-family-title">
          <span className="hero-family-pre">Ние,</span>
          <h2 className="hero-family-name">Сем. Божилови</h2>
        </div>

        <div className="hero-couple-names">
          <h1 className="font-script">София</h1>
          <div className="hero-ampersand-wrapper">
            <span className="hero-line" />
            <span className="hero-ampersand">&</span>
            <span className="hero-line" />
          </div>
          <h1 className="font-script">Алекс</h1>
        </div>

        <div className="ornament-line">
          <span className="ornament-symbol">❦</span>
        </div>

        <p className="hero-tagline font-serif">
          „В деня, в който си казахме „Да“ за нашето завинаги.“
        </p>

        <div className="hero-meta-badges">
          <div className="hero-badge">
            <CalendarDays size={16} className="hero-badge-icon" />
            <span>16 октомври 2026 г.</span>
          </div>
          <div className="hero-badge-sep">✦</div>
          <div className="hero-badge">
            <MapPin size={16} className="hero-badge-icon" />
            <span>Вила Екатерина, Вакарел</span>
          </div>
        </div>

        <div className="hero-cta-group">
          <button
            type="button"
            className="hero-btn hero-btn--primary"
            onClick={() => scrollTo('#guest-photos')}
          >
            <Camera size={18} />
            <span>Снимки от гостите ({guestPhotoCount})</span>
          </button>

          <button
            type="button"
            className="hero-btn hero-btn--outline"
            onClick={() => scrollTo('#wishes')}
          >
            <MessageCircleHeart size={18} />
            <span>Пожелания</span>
          </button>

          <button
            type="button"
            className="hero-btn hero-btn--outline"
            onClick={() => scrollTo('#invitation')}
          >
            <Heart size={18} />
            <span>Припомни си поканата</span>
          </button>
        </div>
      </div>
    </section>
  )
}
export default Hero
