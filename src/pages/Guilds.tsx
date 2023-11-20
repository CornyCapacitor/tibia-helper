import { Footer } from "../components/Footer";
import { Guilds } from "../components/Guilds";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const GuildsPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
      <Navbar />
      <Guilds />
      <Footer />
    </>
  )
}