# Deployment Talimatları

## Video Sorunu Çözümü

Video dosyası çok büyük olduğu için build'de sorun çıkıyor. İki çözüm:

### Çözüm 1: CDN Kullan (Önerilen)

1. Videoyu bir CDN'e yükle:
   - Cloudflare R2 (ücretsiz)
   - AWS S3 + CloudFront
   - Bunny CDN
   - YouTube (unlisted video)

2. `src/components/Hero.jsx` dosyasında video URL'ini değiştir:
```jsx
const VIDEO_URL = 'https://your-cdn.com/background.mp4'
```

### Çözüm 2: Sunucuda Manuel Kopyala

Build sonrası videoyu manuel kopyala:

```bash
npm run build
cp src/assets/backgraund2.mp4 dist/assets/
```

Sonra `Hero.jsx`'te:
```jsx
src="/assets/backgraund2.mp4"
```

### Çözüm 3: YouTube Embed (En Kolay)

Videoyu YouTube'a unlisted olarak yükle ve embed et:

```jsx
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0"
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '100vh',
    transform: 'translate(-50%, -50%) scale(1.5)',
    border: 'none',
    pointerEvents: 'none'
  }}
/>
```

## Şu Anki Durum

Video yüklenemezse otomatik olarak animasyonlu particle efekti gösteriliyor.
