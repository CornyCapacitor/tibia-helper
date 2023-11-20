import { Footer } from "../components/Footer";
import { Houses } from "../components/Houses";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const HousesPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219204.jpg" />
      <Navbar />
      <Houses />
      <Footer />
    </>
  )
}