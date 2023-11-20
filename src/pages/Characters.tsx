import { Characters } from "../components/Characters";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const CharactersPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219191.jpg" />
      <Navbar />
      <Characters />
      <Footer />
    </>
  )
}