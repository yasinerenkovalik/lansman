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
      const response = await fetch('/api/leads', {
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
      console.error('Backend çalışmıyor, localStorage kullanılıyor:', error)
      
      // Backend yoksa localStorage'a kaydet
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
      await fetch('/api/surveys', {
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
      console.error('Backend çalışmıyor, localStorage kullanılıyor:', error)
      
      // Backend yoksa localStorage'a kaydet
      const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
      surveys.push({
        ...surveyData,
        email: userEmail,
        id: Date.now(),
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('surveys', JSON.stringify(surveys))
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
