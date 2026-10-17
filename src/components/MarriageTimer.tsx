import React, { useState, useEffect } from 'react'
import { Heart, Church, Clock, Sparkles } from 'lucide-react'
import './MarriageTimer.css'

// Church wedding ceremony: 16 October 2026 at 15:30 (Bulgarian time)
const CHURCH_WEDDING_DATE = new Date('2026-10-16T15:30:00')

interface ElapsedTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
}

function calculateElapsedTime(): ElapsedTime {
  const now = new Date()
  const diffMs = now.getTime() - CHURCH_WEDDING_DATE.getTime()

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalSeconds }
}

export const MarriageTimer: React.FC = () => {
  const [elapsed, setElapsed] = useState<ElapsedTime>(calculateElapsedTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(calculateElapsedTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Approximate heartbeats shared together (~75 bpm)
  const estimatedHeartbeats = Math.floor(elapsed.totalSeconds * 1.25)

  const timeUnits = [
    { value: elapsed.days, label: elapsed.days === 1 ? 'ден' : 'дни', en: 'Days' },
    { value: elapsed.hours, label: elapsed.hours === 1 ? 'час' : 'часа', en: 'Hours' },
    { value: elapsed.minutes, label: elapsed.minutes === 1 ? 'минута' : 'минути', en: 'Minutes' },
    { value: elapsed.seconds, label: elapsed.seconds === 1 ? 'секунда' : 'секунди', en: 'Seconds' },
  ]

  return (
    <section className="timer-section" id="timer">
      <div className="timer-inner">
        <div className="timer-header">
          <div className="timer-badge">
            <Heart size={14} className="timer-badge-heart" />
            <span>Време заедно като семейство</span>
            <Heart size={14} className="timer-badge-heart" />
          </div>

          <h2 className="timer-title font-serif">Официално женени от</h2>

          <div className="timer-church-info">
            <Church size={18} className="timer-church-icon" />
            <span>Църковен брак • 16 октомври 2026 г., 15:30 ч.</span>
          </div>
          <p className="timer-church-sub">
            Лозенски манастир „Свети Апостоли Петър и Павел“
          </p>

          <div className="ornament-line">
            <span className="ornament-symbol">❦</span>
          </div>
        </div>

        <div className="timer-grid">
          {timeUnits.map((unit, idx) => (
            <div key={idx} className="timer-card">
              <div className="timer-card-glass">
                <span className="timer-card-value font-serif">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </span>
                <span className="timer-card-label">{unit.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="timer-love-counter">
          <div className="love-counter-box">
            <Sparkles size={16} className="love-sparkle" />
            <span>
              Споделени усмивки, прегръдки и над{' '}
              <strong>{estimatedHeartbeats.toLocaleString('bg-BG')}</strong> удара на сърцата в един ритъм!
            </span>
            <Sparkles size={16} className="love-sparkle" />
          </div>
        </div>

        <div className="timer-milestones">
          <div className="milestone-item">
            <Clock size={16} className="milestone-icon" />
            <span>16.10.2026 | 15:30 — Свещен венчален обред</span>
          </div>
          <div className="milestone-item">
            <Heart size={16} className="milestone-icon" />
            <span>Кумове: Богомила и Радостин</span>
          </div>
        </div>
      </div>
    </section>
  )
}
export default MarriageTimer
