import { Navbar } from '../components/Navbar'
import './Home.css'

export const Home = () => {
  return (
    <>
      <img className="background-image" src="https://tibiopedia.pl/images/static/artcorner/MastroDaro1626199358.jpg" />
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