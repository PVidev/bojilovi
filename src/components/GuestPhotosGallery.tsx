import React, { useState, useMemo } from 'react'
import { Camera, Filter, ZoomIn, Heart, ChevronDown } from 'lucide-react'
import guestPhotosData from '../data/guestPhotos.json'
import type { PhotoItem } from '../types'
import Lightbox from './Lightbox'
import './GuestPhotosGallery.css'

const PAGE_SIZE = 12

export const GuestPhotosGallery: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number | 'all'>('all')
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null)
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE)
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set())

  // Raw photos with any deleted/failed images excluded
  const rawPhotos: PhotoItem[] = guestPhotosData as PhotoItem[]
  const photos = useMemo(() => {
    return rawPhotos.filter((p) => !failedIds.has(p.id))
  }, [rawPhotos, failedIds])

  // Compute table statistics
  const tableCounts = useMemo(() => {
    const counts: Record<number, number> = {}
    photos.forEach((p) => {
      if (p.table) {
        counts[p.table] = (counts[p.table] || 0) + 1
      }
    })
    return counts
  }, [photos])

  const availableTables = useMemo(() => {
    return Object.keys(tableCounts)
      .map(Number)
      .sort((a, b) => a - b)
  }, [tableCounts])

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (selectedTable === 'all') return photos
    return photos.filter((p) => p.table === selectedTable)
  }, [photos, selectedTable])

  // Paginated visible photos
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount)
  }, [filteredPhotos, visibleCount])

  const handleTableChange = (table: number | 'all') => {
    setSelectedTable(table)
    setVisibleCount(PAGE_SIZE)
  }

  const handleOpenLightbox = (photo: PhotoItem) => {
    setActivePhoto(photo)
  }

  const handleNavigate = (index: number) => {
    setActivePhoto(filteredPhotos[index])
  }

  const handleImageError = (id: string) => {
    setFailedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  return (
    <section className="guest-gallery-section" id="guest-photos">
      <div className="guest-gallery-inner">
        <div className="section-header">
          <div className="section-badge">
            <Camera size={14} className="section-badge-icon" />
            <span>Уловени моменти от нашите гости</span>
          </div>

          <h2 className="section-title font-serif">Снимки от гостите</h2>

          <p className="section-subtitle">
            Истинските, спонтанни и незабравими емоции, запечатани от вашите телефони и камери.
          </p>

          <div className="ornament-line">
            <span className="ornament-symbol">❦</span>
          </div>
        </div>

        {/* Table Filter Tabs */}
        <div className="table-filters">
          <button
            type="button"
            className={`filter-chip ${selectedTable === 'all' ? 'filter-chip--active' : ''}`}
            onClick={() => handleTableChange('all')}
          >
            <Filter size={14} />
            <span>Всички маси ({photos.length})</span>
          </button>

          {availableTables.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-chip ${selectedTable === t ? 'filter-chip--active' : ''}`}
              onClick={() => handleTableChange(t)}
            >
              <span>Маса {t}</span>
              <span className="filter-count">{tableCounts[t]}</span>
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="photos-grid">
          {displayedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => handleOpenLightbox(photo)}
            >
              <div className="photo-card-media">
                <img
                  src={photo.url}
                  alt={photo.title || 'Снимка от гост'}
                  loading="lazy"
                  className="photo-card-img"
                  onError={() => handleImageError(photo.id)}
                />
                <div className="photo-card-overlay">
                  <div className="photo-card-action">
                    <ZoomIn size={22} />
                  </div>
                  <span className="photo-card-table-badge">
                    {photo.table ? `Маса ${photo.table}` : 'Гости'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (12 at a time) */}
        {visibleCount < filteredPhotos.length && (
          <div className="load-more-container">
            <button
              type="button"
              className="load-more-btn"
              onClick={handleLoadMore}
            >
              <span>Покажи още снимки</span>
              <span className="load-more-badge">
                ({Math.min(visibleCount, filteredPhotos.length)} от {filteredPhotos.length})
              </span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="empty-filter-state">
            <p>Няма намерени снимки за избраната маса.</p>
          </div>
        )}

        <div className="guest-gallery-note">
          <Heart size={16} className="note-heart" />
          <span>
            Благодарим на всеки един от вас, че сподели тези прекрасни кадри с нас!
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <Lightbox
          photo={activePhoto}
          photos={filteredPhotos}
          onClose={() => setActivePhoto(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  )
}
export default GuestPhotosGallery
