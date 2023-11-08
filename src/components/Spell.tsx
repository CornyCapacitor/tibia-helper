import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from "./Navbar"
import './Spell.css'

export const Spell = () => {
  const { spell_id } = useParams()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [spell, setSpell] = useState<any>();

  const fetchSpell = () => {
    setIsFetched(false);
    fetch(`https://dev.tibiadata.com/v4/spell/${spell_id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data)
        setSpell(data.spell)
        setIsFetched(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsFetched(false);
      });
  }

  useEffect(fetchSpell, [])

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219143.jpg" />
      <Navbar />
      <div className="spell-page">
        {isFetched ?
          <div className="spell-container">
            <div className="spell-name">{spell.name}</div>
            <img className="spell-image" src={`https://static.tibia.com/images/library/${spell_id}.png`} />
            <header className="spell-header">Usage properties</header>
            <div className="spell-info">Formula: {spell.spell_information.formula}</div>
            <div className="spell-info">Damage type: {spell.spell_information.damage_type !== "var." && spell.spell_information.damage_type !== "" ? <span>{spell.spell_information.damage_type}</span> : <span>Physical damage</span>}</div>
            <div className="spell-info">Mana: {spell.spell_information.mana}</div>
            <div className="spell-info">Level required: {spell.spell_information.level}</div>
          </div>
          :
          <>
            Loading {spell_id} data
          </>}
      </div>
    </>
  )
}