import { Creature } from "../components/Creature";
import { ScrollToTop } from "../components/SctollToTop";

export const CreaturePage = () => {
  ScrollToTop();
  return (
    <>
      <Creature />
    </>
  )
}