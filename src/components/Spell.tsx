import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
          <>
            <span>Return to <Link to="/spells" className="gold-hover">spells</Link></span>
            <div className="spell-container">
              <div className="spell-name">{spell.name}</div>
              <img className="spell-image" src={`https://static.tibia.com/images/library/${spell_id}.png`} />

              <header className="spell-header">Usage properties</header>

              <div className="spell-info">Formula: {spell.spell_information.formula}</div>
              {spell.spell_information.damage_type !== "var." && spell.spell_information.damage_type !== "" ?
                <div className="spell-info">Element:
                  <span className={spell.spell_information.damage_type}>&nbsp;{spell.spell_information.damage_type}</span></div> : <></>
              }
              <div className="spell-info">Mana: {spell.spell_information.mana}</div>
              <div className="spell-info">Soul points: {spell.spell_information.soul_points}</div>
              <div className="spell-info">Cooldown: {spell.spell_information.cooldown_alone} seconds</div>

              <header className="spell-header">Requirement properties</header>

              <div className="spell-info">Vocation: {spell.spell_information.vocation.map((vocation: string) => (<span key={vocation}>&nbsp;{vocation}</span>))}</div>
              <div className="spell-info">Level required: {spell.spell_information.level}</div>
              <div className="spell-info">Premium: {spell.spell_information.premium_only ? <span style={{ color: "#3dff3d" }}>&nbsp;&#10003;</span> : <span style={{ color: "#ff3838" }}>&nbsp;&#10007;</span>}</div>

              {spell.has_rune_information ?
                <>
                  <header className="spell-header">Rune properties</header>

                  <div className="spell-info">Vocation: {spell.rune_information.vocation.map((vocation: string) => (<span key={vocation}>&nbsp;{vocation}</span>))}</div>
                  <div className="spell-info">Level required: {spell.rune_information.level}</div>
                  <div className="spell-info">Magic level: {spell.rune_information.magic_level}</div>
                </>
                : <></>}

              <div className="spell-header">Other properties</div>

              <div className="spell-info">Cost: {spell.spell_information.price} gp</div>
              <div className="spell-info flexcolumn">Places to buy: {spell.spell_information.city.map((city: string) => (
                <div key={city}>{city},</div>
              ))}</div>
            </div>
          </>
          :
          <>
            Loading {spell_id} data
          </>}
      </div>
    </>
  )
}