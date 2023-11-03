import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Character } from './components/Character'
import { Home } from './pages/Home'
import { WorldsPage } from './pages/Worlds'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/character" element={<Character />} />
      </Routes>

    </>
  )
}

export default App
