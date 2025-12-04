# Google Sheets ile Form Verilerini Kaydetme

Backend olmadan form verilerini Google Sheets'e kaydetmek için:

## 1. Google Sheets Oluştur

1. https://sheets.google.com - Yeni sheet oluştur
2. İsim ver: "Lansman Kayıtlar"
3. İlk satıra başlıklar ekle:
   - A1: Tarih
   - B1: Email
   - C1: Telefon
   - D1: Hacim
   - E1: Sıra No

## 2. Google Apps Script Oluştur

1. Sheet'te: Extensions > Apps Script
2. Şu kodu yapıştır:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const rowCount = sheet.getLastRow();
    const queueNumber = rowCount;
    
    sheet.appendRow([
      new Date(),
      data.email,
      data.phone,
      data.volume,
      queueNumber
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        queueNumber: queueNumber
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save > Deploy > New deployment
4. Type: Web app
5. Execute as: Me
6. Who has access: Anyone
7. Deploy
8. Copy URL (örn: https://script.google.com/macros/s/ABC123.../exec)

## 3. Frontend'te URL'i Kullan

`src/App.jsx` dosyasında:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

const handleFormSubmit = async (formData) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    
    if (data.success) {
      setQueueNumber(data.queueNumber)
      setUserEmail(formData.email)
      setShowThankYou(true)
    }
  } catch (error) {
    console.error('Hata:', error)
  }
}
```

## Avantajlar

- ✅ Backend yok, sunucu maliyeti yok
- ✅ Google Sheets'te tüm veriler
- ✅ CSV export kolay
- ✅ Ücretsiz
- ✅ Güvenilir
