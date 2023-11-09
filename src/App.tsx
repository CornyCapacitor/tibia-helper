import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CharactersPage } from './pages/Characters'
import { CreaturesPage } from './pages/Creatures'
import { GuildsPage } from './pages/Guilds'
import { Home } from './pages/Home'
import { HousesPage } from './pages/Houses'
import { SpellPage } from './pages/Spell'
import { SpellsPage } from './pages/Spells'
import { WorldsPage } from './pages/Worlds'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/guilds" element={<GuildsPage />} />
        <Route path="/spells" element={<SpellsPage />} />
        <Route path="/spells/:spell_id" element={<SpellPage />} />
        <Route path="/houses" element={<HousesPage />} />
        <Route path="/creatures" element={<CreaturesPage />} />
      </Routes>

    </>
  )
}

export default App
