import { useState, useEffect, useRef } from 'react'
import './Hero.css'

function Hero() {
  const videoRef = useRef(null)
  const [videoError, setVideoError] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  })

  useEffect(() => {
    if (videoRef.current && !videoError) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Video autoplay hatası:', err)
          // Kullanıcı etkileşimi sonrası tekrar dene
          document.addEventListener('click', () => {
            videoRef.current?.play()
          }, { once: true })
        })
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToForm = () => {
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {!videoError ? (
        <>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className="hero-video"
            src={import.meta.env.VITE_VIDEO_URL || "/background.mp4"}
            onError={() => setVideoError(true)}
          />
          <div className="hero-overlay"></div>
        </>
      ) : (
        <div className="hero-background">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      )}
      <div className="hero-container">
        <div className="hero-badge">🔒 Sadece Davetliler İçin</div>
        
        <div className="hero-text-box">
          <h1 className="hero-title">
            Finansal Özgürlüğün<br />
            <span className="gradient-text">Kapalı Kapısı Aralanıyor</span>
          </h1>
          
          <h2 className="hero-subtitle">
            Türkiye'nin ilk "Yüksek Hacimli Görev Dağıtım Ağı" kuruluyor.<br />
            Bankaların yıllık verdiğini, <strong>aylık kazanma potansiyeli</strong>.
          </h2>
        </div>

        <div className="hero-highlight">
          ⚡ Sadece ilk <span className="highlight-number">1.000 Operatör</span> kabul edilecektir
        </div>

        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Gün</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.hours}</span>
            <span className="countdown-label">Saat</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.minutes}</span>
            <span className="countdown-label">Dakika</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeLeft.seconds}</span>
            <span className="countdown-label">Saniye</span>
          </div>
        </div>

        <button className="cta-button" onClick={scrollToForm}>
          ERKEN ERİŞİM LİSTESİNE KATIL
        </button>

        <div className="hero-visual">
          <div className="dashboard-blur">
            <div className="balance-indicator">
              <span className="balance-label">Anlık Bakiye</span>
              <span className="balance-amount">₺ 47,250.00</span>
              <span className="balance-change">+₺2,150 (Son 24 saat)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
