# Lansman - Landing Page

Modern ve etkili bir landing page projesi.

## Kurulum

```bash
npm install
```

## Çalıştırma

### Frontend (Port 5173)
```bash
npm run dev
```

### Backend API (Port 3001)
```bash
npm run server
```

## Özellikler

- ✅ Video arka plan
- ✅ Geri sayım sayacı
- ✅ Lead toplama formu
- ✅ Anket sistemi
- ✅ Backend API (Express.js)
- ✅ Şifre korumalı Admin Paneli
- ✅ CSV Export

## Admin Paneli

Admin paneline erişmek için:
```
http://localhost:5173/admin
```

**Varsayılan Şifre:** `lansman2024`

Şifreyi değiştirmek için `src/components/Admin.jsx` dosyasındaki `ADMIN_PASSWORD` değişkenini düzenleyin.

## Veri Saklama

Tüm form verileri `leads.json` dosyasında saklanır.

## Docker

```bash
docker-compose up -d
```

## Notlar

- Backend çalışmazsa form verileri kaydedilmez
- Admin paneli için backend gereklidir
- Video dosyası 90MB, yavaş internet bağlantılarında yükleme süresi uzayabilir
