import { Characters } from "../components/Characters";
import { ScrollToTop } from "../components/SctollToTop";

export const CharactersPage = () => {
  ScrollToTop();
  return (
    <>
      <Characters />
    </>
  )
}