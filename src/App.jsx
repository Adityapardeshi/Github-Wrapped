import './App.css'
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { Background } from './components/Background'

function App() {
  return (
    <>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <Card />
      </div>
    </>
  )
}

export default App
