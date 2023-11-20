import { Creatures } from "../components/Creatures";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const CreaturesPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219130.jpg" />
      <Navbar />
      <Creatures />
      <Footer />
    </>
  )
}