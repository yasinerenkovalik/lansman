import { useState } from 'react'
import './ThankYou.css'

function ThankYou({ queueNumber, onSurveySubmit }) {
  const [surveyData, setSurveyData] = useState({
    hasExperience: '',
    expectation: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setSurveyData({
      ...surveyData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSurveySubmit(surveyData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="thank-you">
        <div className="thank-you-container">
          <div className="success-icon">✅</div>
          <h1 className="thank-you-title">Tebrikler!</h1>
          <p className="thank-you-message">
            Önceliğiniz artırıldı. Sistem açıldığında ilk haberdar olacaksınız.
          </p>
          <div className="priority-badge">
            🚀 Öncelikli Erişim Kazandınız
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="thank-you">
      <div className="thank-you-container">
        <div className="success-icon">🎉</div>
        <h1 className="thank-you-title">Kaydınız Alındı!</h1>
        <div className="queue-info">
          <p className="queue-text">Sırada</p>
          <p className="queue-number">#{queueNumber}</p>
          <p className="queue-text">kişisiniz</p>
        </div>

        <div className="priority-section">
          <h2 className="priority-title">
            Önceliğinizi Artırın ve Sıralamada Öne Geçin
          </h2>
          <p className="priority-subtitle">
            Aşağıdaki 2 soruyu cevaplayın, sisteme erken girin.
          </p>

          <form onSubmit={handleSubmit} className="survey-form">
            <div className="form-group">
              <label>Daha önce P2P, Arbitraj veya Kripto Transfer işlemi yaptınız mı?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="hasExperience"
                    value="yes"
                    checked={surveyData.hasExperience === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  <span>Evet</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="hasExperience"
                    value="no"
                    checked={surveyData.hasExperience === 'no'}
                    onChange={handleChange}
                    required
                  />
                  <span>Hayır</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="expectation">Sistemden beklentiniz nedir?</label>
              <textarea
                id="expectation"
                name="expectation"
                value={surveyData.expectation}
                onChange={handleChange}
                placeholder="Beklentilerinizi kısaca yazın..."
                rows="4"
                required
              />
            </div>

            <button type="submit" className="priority-button">
              ÖNCELİĞİMİ ARTIR
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
