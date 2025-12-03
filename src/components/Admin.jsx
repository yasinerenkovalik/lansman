import { useState, useEffect } from 'react'
import './Admin.css'

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [data, setData] = useState({ leads: [], surveys: [] })
  const [loading, setLoading] = useState(false)

  const ADMIN_PASSWORD = 'lansman2024' // Şifreyi değiştirebilirsin

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchData()
    } else {
      alert('Yanlış şifre!')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/leads')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
      alert('Backend çalışmıyor. npm run server ile başlatın.')
    }
    setLoading(false)
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Sıra', 'Email', 'Telefon', 'Hacim', 'Tarih'].join(','),
      ...data.leads.map(lead => 
        [lead.queueNumber, lead.email, lead.phone, lead.volume, new Date(lead.createdAt).toLocaleString('tr-TR')].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h1>🔒 Admin Girişi</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Giriş Yap</button>
          </form>
          <p className="login-hint">Varsayılan şifre: lansman2024</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="admin-loading">Yükleniyor...</div>
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>📊 Admin Panel</h1>
        <div className="header-actions">
          <button onClick={fetchData} className="refresh-btn">
            🔄 Yenile
          </button>
          <button onClick={exportToCSV} className="export-btn">
            📥 CSV İndir
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Çıkış
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Toplam Kayıt</h3>
          <p className="stat-number">{data.leads.length}</p>
        </div>
        <div className="stat-card">
          <h3>Anket Tamamlayan</h3>
          <p className="stat-number">{data.surveys.length}</p>
        </div>
        <div className="stat-card">
          <h3>Dönüşüm Oranı</h3>
          <p className="stat-number">
            {data.leads.length > 0 
              ? Math.round((data.surveys.length / data.leads.length) * 100) 
              : 0}%
          </p>
        </div>
      </div>

      <div className="admin-section">
        <h2>📋 Kayıtlar ({data.leads.length})</h2>
        {data.leads.length === 0 ? (
          <p className="empty-message">Henüz kayıt yok</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Sıra</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th>Hacim</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map(lead => (
                  <tr key={lead.id}>
                    <td>#{lead.queueNumber}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>
                      <span className="badge">
                        {lead.volume === '5k-20k' && '5-20K TL'}
                        {lead.volume === '20k-50k' && '20-50K TL'}
                        {lead.volume === '50k+' && '50K+ TL'}
                      </span>
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleString('tr-TR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h2>📝 Anketler ({data.surveys.length})</h2>
        {data.surveys.length === 0 ? (
          <p className="empty-message">Henüz anket yok</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Deneyim</th>
                  <th>Beklenti</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {data.surveys.map(survey => (
                  <tr key={survey.id}>
                    <td>{survey.email}</td>
                    <td>
                      {survey.hasExperience === 'yes' 
                        ? <span className="badge success">✅ Var</span>
                        : <span className="badge">❌ Yok</span>
                      }
                    </td>
                    <td className="expectation-cell">{survey.expectation}</td>
                    <td>{new Date(survey.createdAt).toLocaleString('tr-TR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
