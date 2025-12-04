# Verileri Export Etme

Tüm form verileri tarayıcının localStorage'ında saklanıyor. Export etmek için:

## 1. Tarayıcı Konsolunu Aç (F12)

## 2. Console sekmesinde şu komutu çalıştır:

```javascript
// Tüm verileri al
const leads = JSON.parse(localStorage.getItem('leads') || '[]')
const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')

// CSV formatında export
const csvLeads = [
  ['Tarih', 'Email', 'Telefon', 'Hacim', 'Sıra'],
  ...leads.map(l => [l.createdAt, l.email, l.phone, l.volume, l.queueNumber])
].map(row => row.join(',')).join('\n')

// İndir
const blob = new Blob([csvLeads], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'leads.csv'
a.click()
```

## 3. Ya da JSON olarak:

```javascript
const data = {
  leads: JSON.parse(localStorage.getItem('leads') || '[]'),
  surveys: JSON.parse(localStorage.getItem('surveys') || '[]')
}

const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'lansman-data.json'
a.click()
```

## 4. Admin Panelinde Export Butonu

Admin paneline gidip "CSV İndir" butonuna bas: http://localhost:5173/admin

## Otomatik Email İstersen

Formspree kullan:
1. https://formspree.io - Kayıt ol
2. Form ID al
3. `src/App.jsx`'te `FORMSPREE_ID` değiştir
4. Her kayıt email'e gelecek
