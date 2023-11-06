import { Navbar } from '../components/Navbar'
import './Home.css'

export const Home = () => {
  return (
    <>
      <img className="background-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Anniversary%20(25%20Years)/Tibia_Artwork_25Years.jpg&fileId=83672&x=1920&y=1080&a=true" />
      <Navbar />
      <div className="home-page">
        <header>Welcome to Tibia helper!</header>
        <p>Tibia helper is a fan-made project to allow users filter and scan some in-game information within just a few clicks on this website.
          <br />
          It is designed to be used with ease on every device, so it's accessible literally everywhere without any troubles.
        </p>
        <p style={{ color: "red" }}>The text above is about to be replaced when some serious information will require to be displayed here</p>
      </div>
    </>
  )
}