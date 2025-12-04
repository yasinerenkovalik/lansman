import './SocialButtons.css'

function SocialButtons() {
  const socials = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: 'https://wa.me/905XXXXXXXXX', // Telefon numarasını değiştir
      color: '#25D366'
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: 'https://t.me/username', // Username'i değiştir
      color: '#0088cc'
    }
  ]

  return (
    <div className="social-buttons">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
          style={{ '--social-color': social.color }}
          title={social.name}
        >
          <span className="social-icon">{social.icon}</span>
          <span className="social-name">{social.name}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialButtons
