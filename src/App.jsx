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
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxw0cBvfJHgLlRR5ruWETYJ01bL9DD2p8jWBtpH7lU1FcdmSGbfivi4mPTqQa4qDeL7/exec'
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lead',
          ...formData
        }),
        mode: 'no-cors'
      })

      // no-cors mode'da response okunamaz, direkt başarılı kabul et
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      const queueNum = leads.length + 1
      leads.push({ ...formData, queueNumber: queueNum })
      localStorage.setItem('leads', JSON.stringify(leads))
      
      setQueueNumber(queueNum)
      setUserEmail(formData.email)
      setShowThankYou(true)
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
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxw0cBvfJHgLlRR5ruWETYJ01bL9DD2p8jWBtpH7lU1FcdmSGbfivi4mPTqQa4qDeL7/exec'
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'survey',
          ...surveyData,
          email: userEmail
        }),
        mode: 'no-cors'
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
