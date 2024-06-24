import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TCanvas from './components/TCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TCanvas/>
    </>
  )
}

export default App
