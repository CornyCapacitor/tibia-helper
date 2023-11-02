import './Character.css'
import { Navbar } from "./Navbar"

export const Character = () => {
  return (
    <>
      <img className="background-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
      <Navbar />
      <div className="character-page">
        Character page
      </div>
    </>
  )
}