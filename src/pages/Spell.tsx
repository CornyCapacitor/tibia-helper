import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";
import { Spell } from "../components/Spell";

export const SpellPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219143.jpg" />
      <Navbar />
      <Spell />
    </>
  )
}