import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import './Creature.css'
import { Navbar } from "./Navbar"

export const Creature = () => {
  const { race } = useParams()
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [creature, setCreature] = useState<any>();
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [showBehaviour, setShowBehaviour] = useState<boolean>(false);
  const [exphpRatio, setExphpRatio] = useState<number>(0);

  const fetchCreature = () => {
    setIsFetched(false);
    fetch(`https://dev.tibiadata.com/v4/creature/${race}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        setIsFetched(true);
        console.log(data.creature)
        setCreature(data.creature)
        console.log()
        setExphpRatio(data.creature.experience_points / data.creature.hitpoints)
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsFetched(false);
      });
  }

  useEffect(fetchCreature, [])

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219130.jpg" />
      <Navbar />
      <div className="creature-page">
        {isFetched ?
          <>
            <span>Return to <Link to="/creatures" className="gold-hover">creatures</Link></span>
            <div className="creature-container">
              <div className="creature-section">
                <div className="creature-name">{creature.name}</div>
                <img className="creature-image" src={creature.image_url} />
                {!showDescription ?
                  <div className="flexcolumn margintop10">
                    <span className="gold-hover" onClick={() => setShowDescription(!showDescription)}>Show description</span>
                  </div>
                  :
                  <div className="flexcolumn gap10 margintop10">
                    <span className="gold-hover" onClick={() => setShowDescription(!showDescription)}>Hide description</span>
                    <span className="creature-description" dangerouslySetInnerHTML={{ __html: creature.description }}></span>
                  </div>
                }
                {!showBehaviour ?
                  <div className="flexcolumn margintop10">
                    <span className="gold-hover" onClick={() => setShowBehaviour(!showBehaviour)}>Show behaviour</span>
                  </div>
                  :
                  <div className="flexcolumn gap10 margintop10">
                    <span className="gold-hover" onClick={() => setShowBehaviour(!showBehaviour)}>Hide behaviour</span>
                    <span>{creature.behaviour}</span>
                  </div>
                }
              </div>
              <div className="creature-section">
                <header className="creature-header">Monster properties</header>
                <div className="creature-info">Hitpoints: {creature.hitpoints}</div>
                <div className="creature-info">Experience: {creature.experience_points}</div>
                <span className="ratio">{`( ${exphpRatio.toFixed(1)} exp/hp )`}</span>
                <div className="creature-info">Immune to:
                  {creature.immune ? creature.immune.map((element: string) => (
                    <span className={element} key={element}>&nbsp;{element},</span>
                  )) : <>&nbsp;none</>}
                </div>
                <div className="creature-info">
                  <span>Resistant to:</span>
                  {creature.strong ? creature.strong.map((element: string) => (
                    <span className={element} key={element}>&nbsp;{element},</span>
                  )) : <>&nbsp;none</>}
                </div>
                <div className="creature-info">Weak to:
                  {creature.weakness ? creature.weakness.map((element: string) => (
                    <span className={element} key={element}>&nbsp;{element},</span>
                  )) : <>&nbsp;none</>}
                </div>
                {creature.see_invisible ?
                  <div className="creature-info">Sees invisible</div>
                  : <></>
                }
                {creature.be_paralysed ?
                  <div className="creature-info">Can be paralysed</div>
                  : <></>
                }
              </div>
              {creature.be_convinced ?
                <div className="creature-section">
                  <header className="creature-header">Convince properties</header>
                  <div className="creature-info">Mana cost: {creature.convinced_mana}</div>
                </div>
                : <></>
              }
              {creature.be_summoned ?
                <div className="creature-section">
                  <header className="creature-header">Summon properties</header>
                  <div className="creature-info">Mana cost: {creature.summoned_mana}</div>
                </div>
                : <></>
              }
              {creature.be_summoned ?
                <div className="creature-section">
                  <header className="creature-header">Summon properties</header>
                  <div className="creature-info">Mana cost: {creature.summoned_mana}</div>
                </div>
                : <></>
              }
              {creature.is_lootable ?
                <div className="creature-section">
                  <header className="creature-header">Loot list</header>
                  <ul className="loot-list">
                    {creature.loot_list.map((item: string) => (
                      <li>{item},</li>
                    ))}
                  </ul>
                </div>
                : <></>
              }
            </div>
          </>
          :
          <>
            Loading {race} data
          </>
        }
      </div>
    </>
  )
}