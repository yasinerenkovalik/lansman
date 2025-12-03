import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import LeadForm from './components/LeadForm'
import ThankYou from './components/ThankYou'
import Admin from './components/Admin'
import SocialButtons from './components/SocialButtons'

function LandingPage({ onFormSubmit }) {
  return (
    <div className="app">
      <Hero />
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
      const response = await fetch('http://localhost:3001/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.success) {
        setQueueNumber(data.queueNumber)
        setUserEmail(formData.email)
        setShowThankYou(true)
      } else {
        alert('Bir hata oluştu, lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      alert('Sunucuya bağlanılamadı. Lütfen server.js çalıştırın.')
    }
  }

  const handleSurveySubmit = async (surveyData) => {
    try {
      await fetch('http://localhost:3001/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...surveyData,
          email: userEmail
        })
      })
    } catch (error) {
      console.error('Anket gönderme hatası:', error)
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
