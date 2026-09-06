import './App.css'
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { Background } from './components/Background'
import { Home } from './components/Home'

function App() {
  return (
    <>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Home/>
        {/* <Navbar />
        <Card /> */}
      </div>
    </>
  )
}

export default App
