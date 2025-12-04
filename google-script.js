function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Kayıtlar') || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'lead') {
      const rowCount = sheet.getLastRow();
      const queueNumber = rowCount;
      
      sheet.appendRow([
        new Date().toLocaleString('tr-TR'),
        data.email,
        data.phone,
        data.volume,
        '',
        '',
        queueNumber
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          queueNumber: queueNumber
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'survey') {
      // Email'e göre satırı bul ve güncelle
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === data.email) {
          sheet.getRange(i + 1, 5).setValue(data.hasExperience === 'yes' ? 'Var' : 'Yok');
          sheet.getRange(i + 1, 6).setValue(data.expectation);
          break;
        }
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Google Sheets API çalışıyor!');
}
