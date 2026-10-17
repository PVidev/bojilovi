import React, { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import type { PhotoItem } from '../types'
import './Lightbox.css'

interface LightboxProps {
  photo: PhotoItem
  photos: PhotoItem[]
  onClose: () => void
  onNavigate: (index: number) => void
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const currentIndex = photos.findIndex((p) => p.id === photo.id)
  const touchStartXRef = useRef<number | null>(null)

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    onNavigate(prevIndex)
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const nextIndex = (currentIndex + 1) % photos.length
    onNavigate(nextIndex)
  }

  // Handle Touch Swipes for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const diff = touchStartXRef.current - e.changedTouches[0].clientX
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
    touchStartXRef.current = null
  }

  useEffect(() => {
    // Disable background scroll while lightbox is open
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length
        onNavigate(prevIndex)
      }
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % photos.length
        onNavigate(nextIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Completely restore native mobile & desktop scrolling
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('overflow')
    }
  }, [currentIndex, photos.length, onClose, onNavigate])

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lightbox-header">
          <div className="lightbox-counter">
            <span className="lightbox-badge">
              {photo.table ? `Маса ${photo.table}` : photo.category || 'Снимка'}
            </span>
            <span className="lightbox-count">
              {currentIndex + 1} от {photos.length}
            </span>
          </div>

          <div className="lightbox-actions">
            <a
              href={photo.url}
              download={photo.filename}
              className="lightbox-action-btn"
              title="Изтегли снимката"
              aria-label="Изтегли снимката"
            >
              <Download size={20} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="lightbox-action-btn lightbox-action-btn--close"
              title="Затвори (Esc)"
              aria-label="Затвори"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="lightbox-media-wrapper">
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-btn--prev"
            onClick={handlePrev}
            aria-label="Предишна снимка"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={photo.url}
            alt={photo.title || 'Сватбена снимка'}
            className="lightbox-image"
          />

          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-btn--next"
            onClick={handleNext}
            aria-label="Следваща снимка"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {photo.title && (
          <div className="lightbox-footer">
            <p className="lightbox-title">{photo.title}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lightbox
