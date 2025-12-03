import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(__dirname, 'leads.json')

// Leads dosyası yoksa oluştur
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ leads: [], surveys: [] }, null, 2))
}

// Lead kaydet
app.post('/api/leads', (req, res) => {
  try {
    const { email, phone, volume } = req.body
    
    if (!email || !phone || !volume) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur' })
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    
    const newLead = {
      id: Date.now(),
      email,
      phone,
      volume,
      createdAt: new Date().toISOString(),
      queueNumber: data.leads.length + 1
    }

    data.leads.push(newLead)
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

    res.json({ 
      success: true, 
      queueNumber: newLead.queueNumber,
      message: 'Kaydınız alındı!' 
    })
  } catch (error) {
    console.error('Lead kayıt hatası:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
})

// Anket kaydet
app.post('/api/surveys', (req, res) => {
  try {
    const { email, hasExperience, expectation } = req.body
    
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    
    const newSurvey = {
      id: Date.now(),
      email,
      hasExperience,
      expectation,
      createdAt: new Date().toISOString()
    }

    data.surveys.push(newSurvey)
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

    res.json({ 
      success: true,
      message: 'Anket kaydedildi!' 
    })
  } catch (error) {
    console.error('Anket kayıt hatası:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
})

// Tüm leadleri getir (admin için)
app.get('/api/leads', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    res.json(data)
  } catch (error) {
    console.error('Veri okuma hatası:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server çalışıyor: http://localhost:${PORT}`)
  console.log(`📊 Veriler kaydediliyor: ${DATA_FILE}`)
})
