import './App.css'
import { useState } from 'react'
import { Card } from './components/Card'
import { Background } from './components/Background'
import { Home } from './components/Home'

function App() {
  const [wrappedData, setWrappedData] = useState(null)
  const [showCards, setShowCards] = useState(false)

  const handleSubmitSuccess = (data) => {
    setWrappedData(data)
    setShowCards(true)
  }

  if (showCards && wrappedData) {
    return (
      <>
        <Background />
        <div className="relative z-10">
          <Card wrappedData={wrappedData} />
        </div>
      </>
    )
  }

  return (
    <>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Home onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </>
  )
}

export default App
