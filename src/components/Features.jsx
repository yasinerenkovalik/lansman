import './Features.css'

function Features() {
  const features = [
    {
      icon: '🚀',
      title: '30 Dakikada Kesinlik',
      description: 'Beklemek yok. Yaptığın işlemin karşılığı 30 dakikalık sayaç sonunda cüzdanında.',
      highlight: 'Anında ödeme garantisi'
    },
    {
      icon: '🛡️',
      title: '%100 Şeffaf',
      description: 'Gizli kesinti yok. Net %2.5 Komisyon, şeffaf kazanç.',
      highlight: 'Tam şeffaflık'
    },
    {
      icon: '💰',
      title: 'Yüksek Hacim',
      description: 'Bankaların yıllık verdiği faizi aylık kazanma potansiyeli. Sınırsız işlem hacmi.',
      highlight: 'Sınırsız kazanç'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">
                {feature.description}
              </p>
              <p className="feature-highlight">✓ {feature.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
