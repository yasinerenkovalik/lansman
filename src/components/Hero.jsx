import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-12-20T23:59:59').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToForm = () => {
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="hero-video"
      >
        <source src="https://res.cloudinary.com/dim2vffww/video/upload/v1764864627/backgraund2_aned4o.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      
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
