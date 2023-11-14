import { Link } from 'react-router-dom'
import './Home.css'
import { Navbar } from './Navbar'

export const Home = () => {
  return (
    <>
      <img className="background-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Anniversary%20(25%20Years)/Tibia_Artwork_25Years.jpg&fileId=83672&x=1920&y=1080&a=true" />
      <Navbar />
      <div className="home-page">
        <div className="about">
          <header className="about-header">Welcome to Tibia helper!</header>
          <p>Tibia helper is a fan-made project to allow users filter and scan some in-game information within just a few clicks on this website.
            <br />
            It is designed to be used with ease on every device, so it's accessible literally everywhere without any troubles.
          </p>
        </div>
        <div className="home-right-section">
          <img className="section-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Artworks/Tibia_Artwork_ClientSummer2021.jpg&fileId=83676&x=1920&y=1080&a=true" />
          <span className="right-section-header"><Link className="gold" to="/worlds">Worlds</Link></span>
          <span className="right-section-description">Check the world list, find yours and check it's properties!</span>
        </div>
        <div className="home-left-section">
          <img className="section-image" src="https://wallpapercave.com/wp/wp7219191.jpg" />
          <span className="left-section-header"><Link className="gold" to="/characters">Characters</Link></span>
          <span className="left-section-description">Find other players information and discover their secrets!</span>
        </div>
        <div className="home-right-section">
          <img className="section-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
          <span className="right-section-header"><Link className="gold" to="/guilds">Guilds</Link></span>
          <span className="right-section-description">Discover other guild's information and reveal it's members!</span>
        </div>
        <div className="home-left-section">
          <img className="section-image" src="https://wallpapercave.com/wp/wp7219143.jpg" />
          <span className="left-section-header"><Link className="gold" to="/spells">Spells</Link></span>
          <span className="left-section-description">Reveal mysteries about in-game spells and claim their knowledge!</span>
        </div>
        <div className="home-right-section">
          <img className="section-image" src="https://wallpapercave.com/wp/wp7219204.jpg" />
          <span className="right-section-header"><Link className="gold" to="/houses">Houses</Link></span>
          <span className="right-section-description">Interested in buying yourself a house? This section is made for you!</span>
        </div>
        <div className="home-left-section">
          <img className="section-image" src="https://wallpapercave.com/wp/wp7219130.jpg" />
          <span className="left-section-header"><Link className="gold" to="/creatures">Creatures</Link></span>
          <span className="left-section-description">Gain knowledge about monsters to hunt them even more effectively!</span>
        </div>
      </div>
    </>
  )
}