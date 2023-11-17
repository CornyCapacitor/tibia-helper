import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Creatures.css';
import { Footer } from './Footer';
import { Navbar } from "./Navbar";

type Creature = {
  name: string,
  race: string,
  image_url: string,
  featured: true,
}

type CreaturesRender = (value: Creature[]) => ReactNode;

export const Creatures = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>("");
  const [boostedCreature, setBoostedCreature] = useState<Creature>();
  const [creatures, setCreatures] = useState<Creature[]>();

  const fetchCreatures = () => {
    setIsFetched(false);
    fetch(`https://dev.tibiadata.com/v4/creatures`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        setIsFetched(true);
        setBoostedCreature(data.creatures.boosted)
        setCreatures(data.creatures.creature_list)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(fetchCreatures, [])

  const renderBoostedCreature = () => {
    return (
      <div className="creature" key={boostedCreature?.race}>
        <div className="centered">
          <div className="creature-detail-header">Name:</div>
          <div className="creature-detail"><Link className="gold-hover" to={'/creatures/' + boostedCreature?.race}>{boostedCreature?.name}</Link></div>
        </div>
        <img className="creature-image" src={boostedCreature?.image_url} />
      </div>
    )
  }

  const renderCreatures: CreaturesRender = (value) => {
    return value.map(({ name, image_url, race }: Creature) => (
      <div className="creature" key={race} id={race}>
        <div className="centered">
          <div className="creature-detail-header">Name:</div>
          <div className="creature-detail"><Link className="gold-hover" to={'/creatures/' + race}>{name}</Link></div>
        </div>
        <img className="creature-image" src={image_url} alt={`Image of ${name}`} />
      </div>
    ))
  }

  const renderOptions: CreaturesRender = (value) => {
    return value.map(({ race, name }: Creature) => (
      <option key={race} value={race}>{name}</option>
    ))
  }

  const scrollTo = () => {
    console.log("Scrolling by selectValue: " + selectValue)
    const selectedMonster = document.getElementById(selectValue) as HTMLDivElement;

    selectedMonster?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })

    const addingHighlight = () => {
      selectedMonster?.classList.add("highlighted");
    }

    const removingHighlight = () => {
      selectedMonster?.classList.remove("highlighted");
    }

    addingHighlight();
    setTimeout(() => removingHighlight(), 2500)
    setSelectValue("");
  }

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219130.jpg" />
      <Navbar />
      <div className="creatures-page">
        {isFetched ?
          <>
            <div className="flex">
              <span className="creatures-section-header">Today boosted creatures:</span>
              {renderBoostedCreature()}
            </div>
            <div className="flex help-bar">
              <span className="creatures-section-header">Scroll down or choose one of option below to find desired creature.<br />When found, click it's name to reveal more information</span>
              <div className="search-container">
                <select className="select-bar" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                  <option value="" disabled>Choose a creature</option>
                  {renderOptions(creatures ?? [])}
                </select>
                <button onClick={() => scrollTo()} className="creature-search-button">Find creature!</button>
              </div>
            </div>
            <div className="flex">
              <span className="creatures-section-header">List of all creatures:</span>
              <div className="creatures-table">
                {renderCreatures(creatures ?? [])}
              </div>
            </div>
          </>
          : <>Loading creatures data</>}
      </div>
      <Footer />
    </>
  )
}