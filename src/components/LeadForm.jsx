import { useState } from 'react'
import './LeadForm.css'

function LeadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    volume: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Sadece rakam al
      const numbers = value.replace(/\D/g, '')
      setFormData({
        ...formData,
        [name]: numbers
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
    onSubmit(formData)
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
              placeholder="5XXXXXXXXXX"
              pattern="5[0-9]{10}"
              maxLength="11"
              required
              title="500 ile başlayan 11 haneli telefon numarası giriniz"
            />
            <small style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>
              500 ile başlayan 11 haneli numara (örn: 5551234567)
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
