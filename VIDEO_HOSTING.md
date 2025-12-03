# Video Hosting Çözümleri

Video dosyası 18MB ve Coolify/Docker build'de sorun çıkarıyor. Çözümler:

## 1. Cloudflare R2 (Önerilen - Ücretsiz)

1. Cloudflare hesabı aç: https://dash.cloudflare.com
2. R2 > Create Bucket
3. `backgraund2.mp4` dosyasını yükle
4. Public URL al
5. Coolify'da Environment Variable ekle:
   ```
   VITE_VIDEO_URL=https://pub-xxxxx.r2.dev/background.mp4
   ```

## 2. Bunny CDN (Hızlı ve Ucuz)

1. https://bunny.net hesabı aç
2. Storage > Create Zone
3. Video yükle
4. Pull Zone oluştur
5. URL'i environment variable olarak ekle

## 3. GitHub Releases (Basit)

1. GitHub repo > Releases > Create Release
2. Video dosyasını asset olarak ekle
3. Raw URL'i kopyala:
   ```
   https://github.com/yasinerenkovalik/lansman/releases/download/v1.0/background.mp4
   ```
4. Coolify'da:
   ```
   VITE_VIDEO_URL=https://github.com/yasinerenkovalik/lansman/releases/download/v1.0/background.mp4
   ```

## 4. Vercel Blob (Kolay)

```bash
npm i -g vercel
vercel blob upload src/assets/backgraund2.mp4
```

URL'i kopyala ve environment variable olarak ekle.

## Coolify'da Environment Variable Ekleme

1. Coolify Dashboard > Projen > Environment Variables
2. Ekle:
   - Key: `VITE_VIDEO_URL`
   - Value: `https://your-cdn-url.com/background.mp4`
3. Redeploy

## Şu Anki Durum

Video yüklenemezse otomatik olarak animasyonlu particle efekti gösteriliyor.
