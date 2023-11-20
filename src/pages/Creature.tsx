import { Creature } from "../components/Creature";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const CreaturePage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219130.jpg" />
      <Navbar />
      <Creature />
    </>
  )
}