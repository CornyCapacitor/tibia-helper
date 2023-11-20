import { Footer } from "../components/Footer";
import { Home } from "../components/Home";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

export const HomePage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Anniversary%20(25%20Years)/Tibia_Artwork_25Years.jpg&fileId=83672&x=1920&y=1080&a=true" />
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}