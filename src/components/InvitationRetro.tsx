import React, { useRef, useState } from 'react'
import {
  Heart,
  CalendarDays,
  MapPin,
  Church,
  Utensils,
  Camera,
  Wine,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react'
import type { TimelineEvent } from '../types'
import './InvitationRetro.css'

const timelineEvents: (TimelineEvent & { icon: React.ComponentType<{ size?: number; className?: string }> })[] = [
  {
    time: '09:00',
    title: 'Взимане на Младоженеца',
    subtitle: 'Началото на един незабравим ден',
    description: 'Да започнем празника с най-близките ни хора.',
    tag: 'Младоженец',
    icon: Heart,
  },
  {
    time: '10:00',
    title: 'Взимане на Кумовете',
    subtitle: 'До нас в един от най-важните ни дни',
    description: 'С хората, които избрахме да бъдат до нас — Богомила и Радостин.',
    tag: 'Кумове',
    icon: Wine,
  },
  {
    time: '11:30',
    title: 'Взимане на Булката',
    subtitle: 'Преди официалната част',
    description: 'Последна спирка преди официалната част на празника.',
    tag: 'Булка',
    icon: Heart,
  },
  {
    time: '15:30',
    title: 'Църковен Брак',
    subtitle: 'Обещание за цял живот',
    description: 'Лозенски манастир „Свети Апостоли Петър и Павел“',
    tag: 'Свещен обред',
    highlight: true,
    icon: Church,
  },
  {
    time: '16:30',
    title: 'Коктейл за Добре Дошли',
    subtitle: 'Наздравица за любовта',
    description: 'Чаша в ръка и усмивка на лице във Вила Екатерина.',
    tag: 'Welcome Drink',
    icon: Wine,
  },
  {
    time: '17:00',
    title: 'Изнесена Церемония',
    subtitle: 'Нашето „Да“ пред всички вас',
    description: 'Венчавка. Пред Бог и пред вас си обещахме любов и вярност.',
    tag: 'Церемония',
    highlight: true,
    icon: Heart,
  },
  {
    time: '17:30',
    title: 'Поздравления & Снимки',
    subtitle: 'Споделени мигове, запечатани завинаги',
    description: 'Време за топли прегръдки, пожелания и красиви снимки.',
    tag: 'Снимки',
    icon: Camera,
  },
  {
    time: '18:30',
    title: 'Празнична Вечеря',
    subtitle: 'Да празнуваме любовта!',
    description: 'Добра храна, танци и вечер, която никога няма да забравим.',
    tag: 'Вечеря & Парти',
    icon: Utensils,
  },
]

export const InvitationRetro: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section className="invitation-section" id="invitation">
      <div className="invitation-inner">
        <div className="section-header">
          <div className="section-badge">
            <Heart size={14} className="section-badge-icon" />
            <span>Сватбени спомени</span>
          </div>

          <h2 className="section-title font-serif">Нека си припомним поканата</h2>

          <p className="section-subtitle">
            Поглед назад към поканата и красивата програма на нашия сватбен ден.
          </p>

          <div className="ornament-line">
            <span className="ornament-symbol">❦</span>
          </div>
        </div>

        {/* Vintage Invitation Card */}
        <div className="invitation-card-container">
          <div className="invitation-parchment">
            <div className="parchment-border">
              <span className="parchment-corner corner--tl" />
              <span className="parchment-corner corner--tr" />
              <span className="parchment-corner corner--bl" />
              <span className="parchment-corner corner--br" />

              <p className="parchment-eyebrow">Сватбена покана</p>

              <div className="parchment-we font-serif">Ние,</div>

              <div className="parchment-names">
                <h3 className="font-script">София</h3>
                <div className="parchment-ampersand font-serif">&</div>
                <h3 className="font-script">Алекс</h3>
              </div>

              <p className="parchment-quote font-serif">
                Ви поканихме да бъдете част от деня, в който си казахме „Да“ на нашето завинаги.
              </p>

              <div className="parchment-meta">
                <span className="meta-item">
                  <CalendarDays size={15} />
                  <span>16.10.2026 г.</span>
                </span>
                <span className="meta-bullet">·</span>
                <span className="meta-item">
                  <MapPin size={15} />
                  <span>Вила Екатерина, Вакарел</span>
                </span>
              </div>

              <div className="ornament-line">
                <span className="ornament-symbol">❦</span>
              </div>

              <p className="parchment-kumove">
                До нас в този специален ден бяха нашите любими кумове{' '}
                <strong>Богомила и Радостин</strong>, а празникът нямаше да бъде същият без всеки един от вас!
              </p>
            </div>
          </div>
        </div>

        {/* Wedding Video Player */}
        <div className="wedding-video-container">
          <div className="video-gold-frame">
            <div className="video-inner-frame" onClick={togglePlay}>
              <video
                ref={videoRef}
                src="./video/video.mp4"
                playsInline
                autoPlay
                muted
                loop
                className="video-element"
              />

              <div className="video-overlay">
                <button
                  type="button"
                  className={`video-play-btn ${!isPlaying ? 'video-play-btn--visible' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  aria-label={isPlaying ? 'Пауза' : 'Пусни видеото'}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
                </button>

                <button
                  type="button"
                  className="video-sound-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Включи звука' : 'Спри звука'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  <span>{isMuted ? 'Звук изкл.' : 'Звук вкл.'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Schedule */}
        <div className="timeline-container">
          <div className="timeline-heading">
            <Sparkles size={18} className="timeline-sparkle" />
            <h3 className="timeline-title font-serif">Програмата на деня</h3>
          </div>

          <div className="timeline-list">
            {timelineEvents.map((ev, idx) => (
              <div
                key={idx}
                className={`timeline-entry ${ev.highlight ? 'timeline-entry--highlight' : ''}`}
              >
                <div className="timeline-time-col">
                  <span className="timeline-time">{ev.time}</span>
                  <span className="timeline-tag">{ev.tag}</span>
                </div>

                <div className="timeline-marker">
                  <div className="marker-dot">
                    <ev.icon size={16} />
                  </div>
                  {idx !== timelineEvents.length - 1 && <div className="marker-line" />}
                </div>

                <div className="timeline-content-col">
                  <h4 className="timeline-event-title">{ev.title}</h4>
                  <p className="timeline-event-sub">{ev.subtitle}</p>
                  <p className="timeline-event-desc">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default InvitationRetro
