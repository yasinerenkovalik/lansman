import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import Features from './components/Features'
import LeadForm from './components/LeadForm'
import ThankYou from './components/ThankYou'
import Admin from './components/Admin'
import SocialButtons from './components/SocialButtons'

// Formspree form ID
const FORMSPREE_ID = 'xqarlola'

function LandingPage({ onFormSubmit }) {
  return (
    <div className="app">
      <Hero />
      <Calculator />
      <Features />
      <LeadForm onSubmit={onFormSubmit} />
      <SocialButtons />
    </div>
  )
}

function App() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [queueNumber, setQueueNumber] = useState(0)
  const [userEmail, setUserEmail] = useState('')

  const handleFormSubmit = async (formData) => {
    try {
      // Formspree'ye gönder (email olarak gelecek)
      if (FORMSPREE_ID !== 'YOUR_FORMSPREE_ID') {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            _subject: 'Yeni Lansman Kaydı'
          })
        })
      }

      // localStorage'a kaydet
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      const queueNum = leads.length + 1
      leads.push({ ...formData, queueNumber: queueNum, createdAt: new Date().toISOString() })
      localStorage.setItem('leads', JSON.stringify(leads))
      
      setQueueNumber(queueNum)
      setUserEmail(formData.email)
      setShowThankYou(true)
    } catch (error) {
      console.error('Hata:', error)
      
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      const newLead = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        queueNumber: leads.length + 1
      }
      leads.push(newLead)
      localStorage.setItem('leads', JSON.stringify(leads))
      
      setQueueNumber(newLead.queueNumber)
      setUserEmail(formData.email)
      setShowThankYou(true)
    }
  }

  const handleSurveySubmit = async (surveyData) => {
    try {
      // Formspree'ye gönder
      if (FORMSPREE_ID !== 'YOUR_FORMSPREE_ID') {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...surveyData,
            email: userEmail,
            _subject: 'Lansman Anketi'
          })
        })
      }
      
      const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
      surveys.push({
        ...surveyData,
        email: userEmail,
        id: Date.now(),
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('surveys', JSON.stringify(surveys))
    } catch (error) {
      console.error('Hata:', error)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            showThankYou 
              ? <ThankYou queueNumber={queueNumber} onSurveySubmit={handleSurveySubmit} />
              : <LandingPage onFormSubmit={handleFormSubmit} />
          } 
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
