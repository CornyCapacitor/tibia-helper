import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/SctollToTop";

import { Worlds } from "../components/Worlds";

export const WorldsPage = () => {
  ScrollToTop();
  return (
    <>
      <img className="background-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Artworks/Tibia_Artwork_ClientSummer2021.jpg&fileId=83676&x=1920&y=1080&a=true" />
      <Navbar />
      <Worlds />
      <Footer />
    </>
  )
}