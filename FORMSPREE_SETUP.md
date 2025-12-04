# Formspree ile Backend'siz Form

En kolay yöntem - 5 dakikada hazır!

## 1. Formspree Hesabı Aç

1. https://formspree.io - Sign up (ücretsiz)
2. New Form oluştur
3. Form ID'yi kopyala (örn: `xpznqwer`)

## 2. Frontend'te Kullan

```javascript
const handleFormSubmit = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      setQueueNumber(Math.floor(Math.random() * 500) + 100)
      setUserEmail(formData.email)
      setShowThankYou(true)
    }
  } catch (error) {
    console.error('Hata:', error)
  }
}
```

## 3. Verileri İndir

- Formspree dashboard'dan tüm kayıtları görebilirsin
- CSV export var
- Email bildirimleri alabilirsin

## Avantajlar

- ✅ 5 dakikada hazır
- ✅ Backend yok
- ✅ Ücretsiz plan: 50 form/ay
- ✅ Spam koruması
- ✅ Email bildirimleri

Hangisini tercih edersin?
