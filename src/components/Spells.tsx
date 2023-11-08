import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import './Spells.css';

type Spells = {
  name: string,
  spell_id: string,
  formula: string,
  level: number,
  mana: number,
  price: number,
  group_attack: boolean,
  group_healing: boolean,
  group_support: boolean,
  type_instant: boolean,
  type_rune: boolean,
  premium_only: boolean;
}

type SpellsRender = (value: Spells[]) => ReactNode;

export const Spells = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [spells, setSpells] = useState<Spells[]>();

  const fetchSpells = () => {
    setIsFetched(false);
    fetch("https://dev.tibiadata.com/v4/spells")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        // Fetch all spells list
        setSpells(data.spells.spell_list)
        setIsFetched(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsFetched(false);
      });
  }

  useEffect(fetchSpells, []);

  const renderSpells: SpellsRender = (value) => {
    return value.map(({ name, spell_id, formula, level, mana, price, group_attack, group_healing, group_support, type_instant, type_rune, premium_only }: Spells) => (
      <div key={name} className="spell">
        <div className="spell-detail"><span className="gold-hover">{name}</span></div>
        <div className="spell-detail-id">{spell_id}</div>
        <div className="spell-detail"><img src={`https://static.tibia.com/images/library/${spell_id}.png`} /></div>
        <div className="spell-detail">{formula}</div>
        <div className="spell-detail">{level === 0 ? <span style={{ color: "#ff3838" }}>&#10007;</span> : <>{level}</>}</div>
        <div className="spell-detail">{mana}</div>
        <div className="spell-detail">{price === 0 ? <span style={{ color: "#ff3838" }}>&#10007;</span> : <>{price}</>}</div>
        <div className="spell-detail">{group_attack ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="spell-detail">{group_healing ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="spell-detail">{group_support ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="spell-detail">{type_instant ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="spell-detail">{type_rune ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="spell-detail">{premium_only ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
      </div>
    ))
  }

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219143.jpg" />
      <Navbar />
      <div className="spells-page">
        {isFetched && spells ?
          <>
            <span>
              Click spell name for more information
            </span>
            <div className="spell-list">
              <div className="spell">
                <div className="spell-detail"><span className="gold-hover">Name:</span></div>
                <div className="spell-detail-id"><span className="gold-hover">Spell id:</span></div>
                <div className="spell-detail">Spell image:</div>
                <div className="spell-detail"><span className="gold-hover">Formula:</span></div>
                <div className="spell-detail"><span className="gold-hover">Level required:</span></div>
                <div className="spell-detail"><span className="gold-hover">Mana required:</span></div>
                <div className="spell-detail"><span className="gold-hover">Price:</span></div>
                <div className="spell-detail"><span className="gold-hover">Group attack:</span></div>
                <div className="spell-detail"><span className="gold-hover">Group healing:</span></div>
                <div className="spell-detail"><span className="gold-hover">Group support:</span></div>
                <div className="spell-detail"><span className="gold-hover">Instant:</span></div>
                <div className="spell-detail"><span className="gold-hover">Rune:</span></div>
                <div className="spell-detail"><span className="gold-hover">Premium only:</span></div>
              </div>
              {renderSpells(spells ?? [])}
            </div>
          </>
          :
          <>Loading spells...</>}
      </div>
    </>
  )
}