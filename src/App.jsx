import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import LeadForm from './components/LeadForm'
import ThankYou from './components/ThankYou'

function App() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [queueNumber, setQueueNumber] = useState(0)

  const handleFormSubmit = (formData) => {
    // Simüle edilmiş sıra numarası
    const randomQueue = Math.floor(Math.random() * 500) + 100
    setQueueNumber(randomQueue)
    setShowThankYou(true)
    
    // Burada backend'e veri gönderilecek
    console.log('Form Data:', formData)
  }

  const handleSurveySubmit = (surveyData) => {
    console.log('Survey Data:', surveyData)
    // Backend'e anket verisi gönderilecek
  }

  if (showThankYou) {
    return <ThankYou queueNumber={queueNumber} onSurveySubmit={handleSurveySubmit} />
  }

  return (
    <div className="app">
      <Hero />
      <Features />
      <LeadForm onSubmit={handleFormSubmit} />
    </div>
  )
}

export default App
