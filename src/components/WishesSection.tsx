import React, { useState, useMemo } from 'react'
import {
  Heart,
  MessageSquare,
  Search,
  Sparkles,
  CheckCircle2,
  Quote,
  ChevronDown,
} from 'lucide-react'
import guestsRaw from '../data/guests.json'
import type { Guest } from '../types'
import './WishesSection.css'

const PAGE_SIZE = 9

export const WishesSection: React.FC = () => {
  const [filterType, setFilterType] = useState<'withMessage' | 'attending' | 'notAttending'>('withMessage')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE)

  const allGuests: Guest[] = guestsRaw as Guest[]

  // Compute counts
  const counts = useMemo(() => {
    const withMsg = allGuests.filter((g) => g.message && g.message.trim().length > 0)
    const attending = withMsg.filter((g) => g.attending)
    const notAttending = withMsg.filter((g) => !g.attending)
    return {
      withMsg: withMsg.length,
      attending: attending.length,
      notAttending: notAttending.length,
    }
  }, [allGuests])

  // Filtered list
  const filteredList = useMemo(() => {
    let list = allGuests

    if (filterType === 'withMessage') {
      list = list.filter((g) => g.message && g.message.trim().length > 0)
    } else if (filterType === 'attending') {
      list = list.filter((g) => g.attending && g.message && g.message.trim().length > 0)
    } else if (filterType === 'notAttending') {
      list = list.filter((g) => !g.attending && g.message && g.message.trim().length > 0)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.partner?.name && g.partner.name.toLowerCase().includes(q)) ||
          g.message.toLowerCase().includes(q)
      )
    }

    return list
  }, [allGuests, filterType, searchQuery])

  // Paginated displayed list (9 at a time)
  const displayedList = useMemo(() => {
    return filteredList.slice(0, visibleCount)
  }, [filteredList, visibleCount])

  const handleFilterChange = (type: 'withMessage' | 'attending' | 'notAttending') => {
    setFilterType(type)
    setVisibleCount(PAGE_SIZE)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  return (
    <section className="wishes-section" id="wishes">
      <div className="wishes-inner">
        <div className="section-header">
          <div className="section-badge">
            <Heart size={14} className="section-badge-icon" />
            <span>Топли думи & благопожелания</span>
          </div>

          <h2 className="section-title font-serif">Нашите пожелания</h2>

          <p className="section-subtitle">
            Всички красиви пожелания от тези, които бяха до нас, и тези, които празнуваха с нас духом.
          </p>

          <div className="ornament-line">
            <span className="ornament-symbol">❦</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="wishes-controls">
          <div className="wishes-tabs">
            <button
              type="button"
              className={`wish-tab ${filterType === 'withMessage' ? 'wish-tab--active' : ''}`}
              onClick={() => handleFilterChange('withMessage')}
            >
              <MessageSquare size={15} />
              <span>Пожелания ({counts.withMsg})</span>
            </button>

            <button
              type="button"
              className={`wish-tab ${filterType === 'attending' ? 'wish-tab--active' : ''}`}
              onClick={() => handleFilterChange('attending')}
            >
              <CheckCircle2 size={15} />
              <span>Присъствали ({counts.attending})</span>
            </button>

            <button
              type="button"
              className={`wish-tab ${filterType === 'notAttending' ? 'wish-tab--active' : ''}`}
              onClick={() => handleFilterChange('notAttending')}
            >
              <Sparkles size={15} />
              <span>Бяха с нас духом ({counts.notAttending})</span>
            </button>
          </div>

          <div className="wishes-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Търси гост или дума..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="wishes-search-input"
            />
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="wishes-grid">
          {displayedList.map((g) => (
            <div
              key={g.id}
              className={`wish-card ${!g.attending ? 'wish-card--spirit' : ''}`}
            >
              <div className="wish-card-header">
                <div className="wish-card-author-info">
                  <span className="wish-author-name">{g.name}</span>
                  {g.partner?.hasPartner && g.partner?.name && (
                    <span className="wish-partner-name">
                      & {g.partner.name}
                    </span>
                  )}
                </div>

                <span
                  className={`wish-status-badge ${
                    g.attending ? 'status--attending' : 'status--spirit'
                  }`}
                >
                  {g.attending ? 'Присъствал' : 'С нас духом'}
                </span>
              </div>

              <div className="wish-card-body">
                {g.message && g.message.trim().length > 0 ? (
                  <div className="wish-quote-wrapper">
                    <Quote size={20} className="wish-quote-icon" />
                    <p className="wish-text font-serif">„{g.message}“</p>
                  </div>
                ) : (
                  <p className="wish-text-empty">
                    Сподели радостта на младоженците в празничния ден.
                  </p>
                )}
              </div>

              <div className="wish-card-footer">
                <span className="wish-heart-icon">❤</span>
                <span className="wish-target">За Алекс и София Божилови</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (9 at a time) */}
        {visibleCount < filteredList.length && (
          <div className="wishes-load-more-container">
            <button
              type="button"
              className="wishes-load-more-btn"
              onClick={handleLoadMore}
            >
              <span>Покажи още пожелания</span>
              <span className="wishes-load-more-badge">
                ({Math.min(visibleCount, filteredList.length)} от {filteredList.length})
              </span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}

        {filteredList.length === 0 && (
          <div className="wishes-empty">
            <p>Няма намерени пожелания с тези критерии.</p>
          </div>
        )}
      </div>
    </section>
  )
}
export default WishesSection
