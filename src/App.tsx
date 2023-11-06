import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CharactersPage } from './pages/Characters'
import { GuildsPage } from './pages/Guilds'
import { Home } from './pages/Home'
import { WorldsPage } from './pages/Worlds'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/guilds" element={<GuildsPage />} />
      </Routes>

    </>
  )
}

export default App
