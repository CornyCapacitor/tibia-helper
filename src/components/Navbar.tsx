import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <header>Tibia Helper</header>
        <div className="links">
          <div className="link"><Link to="/">Home</Link></div>
        </div>
      </div>
    </nav>
  )
}