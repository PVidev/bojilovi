import React, { useState, useEffect } from 'react'
import { Sparkles, Camera, ZoomIn, Clock } from 'lucide-react'
import initialWeddingPhotos from '../data/weddingPhotos.json'
import type { PhotoItem } from '../types'
import Lightbox from './Lightbox'
import './WeddingPhotosGallery.css'

export const WeddingPhotosGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(initialWeddingPhotos as PhotoItem[])
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null)

  // Dynamically attempt to fetch any updated photos.json from public/wedding_img/
  useEffect(() => {
    fetch('./wedding_img/photos.json')
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error('Not found')
      })
      .then((data: PhotoItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data)
        }
      })
      .catch(() => {
        // Fallback to imported data
      })
  }, [])

  const handleOpenLightbox = (photo: PhotoItem) => {
    setActivePhoto(photo)
  }

  const handleNavigate = (index: number) => {
    setActivePhoto(photos[index])
  }

  return (
    <section className="wedding-photos-section" id="wedding-photos">
      <div className="wedding-photos-inner">
        <div className="section-header">
          <div className="section-badge section-badge--gold">
            <Sparkles size={14} className="section-badge-icon" />
            <span>Официална фотосесия & церемония</span>
          </div>

          <h2 className="section-title font-serif">Снимки от сватбата</h2>

          <p className="section-subtitle">
            Професионалните кадри, запечатали магията на нашия сватбен ден.
          </p>

          <div className="ornament-line">
            <span className="ornament-symbol">❦</span>
          </div>
        </div>

        {photos.length === 0 ? (
          /* COMING SOON CARD */
          <div className="coming-soon-card">
            <div className="coming-soon-glow" />
            <div className="coming-soon-icon-frame">
              <Camera size={44} className="coming-soon-camera" />
              <div className="coming-soon-pulse" />
            </div>

            <h3 className="coming-soon-title font-serif">Очаквайте скоро!</h3>

            <p className="coming-soon-desc">
              Нашият фотограф в момента обработва официалните снимки с изключително внимание към всеки красив детайл.
            </p>

            <div className="coming-soon-status">
              <div className="status-indicator">
                <span className="status-dot" />
                <span>Обработка на кадрите от фотографа</span>
              </div>
              <div className="status-details">
                <div className="status-item">
                  <Clock size={16} />
                  <span>Публикуване веднага след завършване на обработката</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PHOTOS GRID (WHEN PHOTOS ARE PRESENT) */
          <div className="wedding-photos-grid">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="wedding-photo-card"
                onClick={() => handleOpenLightbox(photo)}
              >
                <div className="wedding-photo-media">
                  <img
                    src={photo.url}
                    alt={photo.title || 'Сватбена снимка'}
                    loading="lazy"
                    className="wedding-photo-img"
                  />
                  <div className="wedding-photo-overlay">
                    <div className="wedding-photo-action">
                      <ZoomIn size={22} />
                    </div>
                    <span className="wedding-photo-tag">{photo.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photo={activePhoto}
        photos={photos}
        onClose={() => setActivePhoto(null)}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
export default WeddingPhotosGallery
