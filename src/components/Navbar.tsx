import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <header>Tibia Helper</header>
        <div className="links">
          <div className="link"><Link to="/">Home</Link></div>
          <div className="link"><Link to="/worlds">Worlds</Link></div>
          <div className="link"><Link to="/characters">Characters</Link></div>
          <div className="link"><Link to="/guilds">Guilds</Link></div>
          <div className="link"><Link to="/spells">Spells</Link></div>
          <div className="link"><Link to="/houses">Houses</Link></div>
          <div className="link"><Link to="/creatures">Creatures</Link></div>
        </div>
      </div>
    </nav>
  )
}