import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

import { Worlds } from "../components/Worlds";

export const WorldsPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219136.jpg" />
      <Navbar />
      <Worlds />
      <Footer />
    </>
  )
}