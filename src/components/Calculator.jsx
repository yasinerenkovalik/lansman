import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [amount, setAmount] = useState('')
  const commission = amount ? (parseFloat(amount) * 0.025).toFixed(2) : '0.00'
  const total = amount ? (parseFloat(amount) + parseFloat(commission)).toFixed(2) : '0.00'

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Sadece sayı ve nokta kabul et
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  return (
    <section className="calculator-section">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Kazanç Hesaplayıcı</h2>
          <p>İşlem hacminizi girin, %2.5 komisyon kazancınızı görün</p>
        </div>

        <div className="calculator-content">
          <div className="input-group">
            <label htmlFor="amount">İşlem Hacmi (TL)</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Örn: 100000"
              className="amount-input"
            />
          </div>

          <div className="results-grid">
            <div className="result-card">
              <div className="result-label">İşlem Hacmi</div>
              <div className="result-value">
                {amount ? formatNumber(amount) : '0,00'} <span className="currency">TL</span>
              </div>
            </div>

            <div className="result-card highlight">
              <div className="result-label">Komisyon Kazancı (%2.5)</div>
              <div className="result-value profit">
                {formatNumber(commission)} <span className="currency">TL</span>
              </div>
            </div>

            <div className="result-card">
              <div className="result-label">Toplam Eline Geçecek</div>
              <div className="result-value total">
                {formatNumber(total)} <span className="currency">TL</span>
              </div>
            </div>
          </div>

          <div className="calculator-note">
            💡 <strong>Örnek:</strong> 100.000 TL işlem hacmi = 2.500 TL net kazanç
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
