import { useState } from 'react'
import './LeadForm.css'

function LeadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    volume: ''
  })

  const formatPhone = (value) => {
    // Sadece rakamları al
    const numbers = value.replace(/\D/g, '')
    
    // 10 haneden fazla olmasın
    if (numbers.length > 10) return formData.phone
    
    // Format: (5XX)-XXX-XX-XX
    // Sadece rakamları göster, 3'ten az ise
    if (numbers.length === 0) return ''
    if (numbers.length <= 3) return numbers
    // 4-6 hane: (5XX)-XXX
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)})-${numbers.slice(3)}`
    // 7-8 hane: (5XX)-XXX-XX
    if (numbers.length <= 8) return `(${numbers.slice(0, 3)})-${numbers.slice(3, 6)}-${numbers.slice(6)}`
    // 9-10 hane: (5XX)-XXX-XX-XX
    return `(${numbers.slice(0, 3)})-${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8)}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData({
        ...formData,
        [name]: formatPhone(value)
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Telefonu sadece rakam olarak gönder
    const cleanPhone = formData.phone.replace(/\D/g, '')
    
    // 5 ile başlamalı ve 10 hane olmalı
    if (!cleanPhone.startsWith('5') || cleanPhone.length !== 10) {
      alert('Lütfen geçerli bir telefon numarası giriniz (5 ile başlamalı, 10 hane)')
      return
    }
    
    onSubmit({
      ...formData,
      phone: cleanPhone
    })
  }

  return (
    <section id="lead-form" className="lead-form">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Erken Erişim Listesine Katıl</h2>
          <p className="form-subtitle">
            İlk 1.000 operatör arasına gir. Bilgilerini bırak, sıralamanda öne geç.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">E-posta Adresi *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon Numarası (Telegram/SMS) *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(5XX)-XXX-XX-XX"
              required
              title="5 ile başlayan 10 haneli telefon numarası giriniz"
            />
            <small style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>
              5 ile başlayan 10 haneli numara (örn: (555)-123-45-67)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="volume">Aylık çevirebileceğiniz işlem hacmi tahmini nedir? *</label>
            <select
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              required
            >
              <option value="">Seçiniz...</option>
              <option value="5k-20k">5.000 - 20.000 TL</option>
              <option value="20k-50k">20.000 - 50.000 TL</option>
              <option value="50k+">50.000 TL ve üzeri</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            KAYIT OL VE SIRANA GİR
          </button>

          <p className="form-note">
            🔒 Bilgileriniz güvende. Sadece erken erişim için kullanılacaktır.
          </p>
        </form>
      </div>
    </section>
  )
}

export default LeadForm
