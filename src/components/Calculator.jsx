import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [amount, setAmount] = useState('')
  const [dailyTransactions, setDailyTransactions] = useState('')
  
  const commission = amount ? (parseFloat(amount) * 0.025).toFixed(2) : '0.00'
  const total = amount ? (parseFloat(amount) + parseFloat(commission)).toFixed(2) : '0.00'
  
  // Günlük işlem sayısı aralığından ortalama al
  const getAverageTransactions = (range) => {
    if (!range) return 0
    const [min, max] = range.split('-').map(Number)
    return (min + max) / 2
  }
  
  const avgTransactions = getAverageTransactions(dailyTransactions)
  const dailyEarnings = commission && avgTransactions ? (parseFloat(commission) * avgTransactions).toFixed(2) : '0.00'
  const monthlyEarnings = dailyEarnings ? (parseFloat(dailyEarnings) * 30).toFixed(2) : '0.00'

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Sadece sayı ve nokta kabul et
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleTransactionsChange = (e) => {
    setDailyTransactions(e.target.value)
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
          <div className="inputs-row">
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

            <div className="input-group">
              <label htmlFor="transactions">Günlük İşlem Sayısı</label>
              <select
                id="transactions"
                value={dailyTransactions}
                onChange={handleTransactionsChange}
                className="transactions-select"
              >
                <option value="">Seçiniz...</option>
                <option value="1-3">1-3 işlem</option>
                <option value="3-5">3-5 işlem</option>
                <option value="5-7">5-7 işlem</option>
                <option value="7-10">7-10 işlem</option>
                <option value="10-15">10+ işlem</option>
              </select>
            </div>
          </div>

          <div className="results-grid">
            <div className="result-card">
              <div className="result-label">İşlem Başı Komisyon</div>
              <div className="result-value">
                {formatNumber(commission)} <span className="currency">TL</span>
              </div>
            </div>

            <div className="result-card highlight">
              <div className="result-label">Günlük Kazanç</div>
              <div className="result-value profit">
                {formatNumber(dailyEarnings)} <span className="currency">TL</span>
              </div>
            </div>

            <div className="result-card highlight-strong">
              <div className="result-label">Aylık Kazanç (30 Gün)</div>
              <div className="result-value monthly">
                {formatNumber(monthlyEarnings)} <span className="currency">TL</span>
              </div>
            </div>
          </div>

          <div className="calculator-note">
            💡 <strong>Örnek:</strong> 100.000 TL işlem × 5 işlem/gün = 12.500 TL günlük, 375.000 TL aylık kazanç
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
