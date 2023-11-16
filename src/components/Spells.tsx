/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  // Switches
  const [nameSwitch, setNameSwitch] = useState(true);
  const [formulaSwitch, setFormulaSwitch] = useState(false);
  const [levelSwitch, setLevelSwitch] = useState(false);
  const [manaSwitch, setManaSwitch] = useState(false);
  const [priceSwitch, setPriceSwitch] = useState(false);
  const [groupAttackSwitch, setGroupAttackSwitch] = useState(false);
  const [groupHealingSwitch, setGroupHealingSwitch] = useState(false);
  const [groupSupportSwitch, setGroupSupportSwitch] = useState(false);
  const [instantSwitch, setInstantSwitch] = useState(false);
  const [runeSwitch, setRuneSwitch] = useState(false);
  const [premiumOnlySwitch, setPremiumOnlySwitch] = useState(false);

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

  const sortListBy = (value: string) => {
    console.log(`Sorting the table by ${value}`)

    if (value === "name") {
      type NameComparision = { name: string }
      if (nameSwitch === false) {
        // A to Z
        const currentSortFunction = (a: NameComparision, b: NameComparision) => a.name.localeCompare(b.name);
        spells?.sort(currentSortFunction);
        setNameSwitch(!nameSwitch)
        return
      } else if (nameSwitch === true) {
        // Z to A
        const currentSortFunction = (a: NameComparision, b: NameComparision) => b.name.localeCompare(a.name);
        spells?.sort(currentSortFunction);
        setNameSwitch(!nameSwitch)
        return
      }
    } else if (value === "formula") {
      type FormulaComparision = { formula: string }
      if (formulaSwitch === false) {
        // A to Z
        const currentSortFunction = (a: FormulaComparision, b: FormulaComparision) => a.formula.localeCompare(b.formula);
        spells?.sort(currentSortFunction);
        setFormulaSwitch(!formulaSwitch)
        return
      } else if (formulaSwitch === true) {
        // Z to A
        const currentSortFunction = (a: FormulaComparision, b: FormulaComparision) => b.formula.localeCompare(a.formula);
        spells?.sort(currentSortFunction);
        setFormulaSwitch(!formulaSwitch)
        return
      }
    } else if (value === "level") {
      type LevelComparision = { level: number }
      if (levelSwitch === false) {
        // Highest to Lowest
        const currentSortFunction = (a: LevelComparision, b: LevelComparision) => b.level - a.level;
        spells?.sort(currentSortFunction);
        setLevelSwitch(!levelSwitch);
        return
      } else if (levelSwitch === true) {
        // Lowest to Highest
        const currentSortFunction = (a: LevelComparision, b: LevelComparision) => a.level - b.level;
        spells?.sort(currentSortFunction);
        setLevelSwitch(!levelSwitch);
        return
      }
    } else if (value === "mana") {
      type ManaComparision = { mana: number }
      if (manaSwitch === false) {
        // Highest to Lowest
        const currentSortFunction = (a: ManaComparision, b: ManaComparision) => b.mana - a.mana;
        spells?.sort(currentSortFunction);
        setManaSwitch(!manaSwitch);
        return
      } else if (manaSwitch === true) {
        // Lowest to Highest
        const currentSortFunction = (a: ManaComparision, b: ManaComparision) => a.mana - b.mana;
        spells?.sort(currentSortFunction);
        setManaSwitch(!manaSwitch);
        return
      }
    } else if (value === "price") {
      type PriceComparision = { price: number }
      if (priceSwitch === false) {
        // Highest to Lowest
        const currentSortFunction = (a: PriceComparision, b: PriceComparision) => b.price - a.price;
        spells?.sort(currentSortFunction);
        setPriceSwitch(!priceSwitch);
        return
      } else if (priceSwitch === true) {
        // Lowest to Highest
        const currentSortFunction = (a: PriceComparision, b: PriceComparision) => a.price - b.price;
        spells?.sort(currentSortFunction);
        setPriceSwitch(!priceSwitch);
        return
      }
    } else if (value === "group_attack") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type GroupAttackComparision = { group_attack: boolean | any }
      if (groupAttackSwitch === false) {
        // True to false
        const currentSortFunction = (a: GroupAttackComparision, b: GroupAttackComparision) => b.group_attack - a.group_attack;
        spells?.sort(currentSortFunction);
        setGroupAttackSwitch(!groupAttackSwitch);
        return
      } else if (groupAttackSwitch === true) {
        // False to true
        const currentSortFunction = (a: GroupAttackComparision, b: GroupAttackComparision) => a.group_attack - b.group_attack;
        spells?.sort(currentSortFunction);
        setGroupAttackSwitch(!groupAttackSwitch);
        return
      }
    } else if (value === "group_healing") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type GroupHealingComparision = { group_healing: boolean | any }
      if (groupHealingSwitch === false) {
        // True to false
        const currentSortFunction = (a: GroupHealingComparision, b: GroupHealingComparision) => b.group_healing - a.group_healing;
        spells?.sort(currentSortFunction);
        setGroupHealingSwitch(!groupHealingSwitch);
        return
      } else if (groupHealingSwitch === true) {
        // False to true
        const currentSortFunction = (a: GroupHealingComparision, b: GroupHealingComparision) => a.group_healing - b.group_healing;
        spells?.sort(currentSortFunction);
        setGroupHealingSwitch(!groupHealingSwitch);
        return
      }
    } else if (value === "group_support") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type GroupSupportComparision = { group_support: boolean | any }
      if (groupSupportSwitch === false) {
        // True to false
        const currentSortFunction = (a: GroupSupportComparision, b: GroupSupportComparision) => b.group_support - a.group_support;
        spells?.sort(currentSortFunction);
        setGroupSupportSwitch(!groupSupportSwitch);
        return
      } else if (groupSupportSwitch === true) {
        // False to true
        const currentSortFunction = (a: GroupSupportComparision, b: GroupSupportComparision) => a.group_support - b.group_support;
        spells?.sort(currentSortFunction);
        setGroupSupportSwitch(!groupSupportSwitch);
        return
      }
    } else if (value === "type_instant") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type InstantComparision = { type_instant: boolean | any }
      if (instantSwitch === false) {
        // True to false
        const currentSortFunction = (a: InstantComparision, b: InstantComparision) => b.type_instant - a.type_instant;
        spells?.sort(currentSortFunction);
        setInstantSwitch(!instantSwitch);
        return
      } else if (instantSwitch === true) {
        // False to true
        const currentSortFunction = (a: InstantComparision, b: InstantComparision) => a.type_instant - b.type_instant;
        spells?.sort(currentSortFunction);
        setInstantSwitch(!instantSwitch);
        return
      }
    } else if (value === "type_rune") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type RuneComparision = { type_rune: boolean | any }
      if (runeSwitch === false) {
        // True to false
        const currentSortFunction = (a: RuneComparision, b: RuneComparision) => b.type_rune - a.type_rune;
        spells?.sort(currentSortFunction);
        setRuneSwitch(!runeSwitch);
        return
      } else if (runeSwitch === true) {
        // False to true
        const currentSortFunction = (a: RuneComparision, b: RuneComparision) => a.type_rune - b.type_rune;
        spells?.sort(currentSortFunction);
        setRuneSwitch(!runeSwitch);
        return
      }
    } else if (value === "premium_only") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type PremiumOnlyComparision = { premium_only: boolean | any }
      if (premiumOnlySwitch === false) {
        // True to false
        const currentSortFunction = (a: PremiumOnlyComparision, b: PremiumOnlyComparision) => b.premium_only - a.premium_only;
        spells?.sort(currentSortFunction);
        setPremiumOnlySwitch(!premiumOnlySwitch);
        return
      } else if (premiumOnlySwitch === true) {
        // False to true
        const currentSortFunction = (a: PremiumOnlyComparision, b: PremiumOnlyComparision) => a.premium_only - b.premium_only;
        spells?.sort(currentSortFunction);
        setPremiumOnlySwitch(!premiumOnlySwitch);
        return
      }
    }
  }

  const renderSpells: SpellsRender = (value) => {
    return value.map(({ name, spell_id, formula, level, mana, price, group_attack, group_healing, group_support, type_instant, type_rune, premium_only }: Spells) => (
      <div key={name} className="spell">
        <div className="spell-detail"><Link className="gold-hover" to={'/spells/' + spell_id}>{name}</Link></div>
        <div className="spell-detail-id">{spell_id}</div>
        <div className="spell-detail"><img src={`https://static.tibia.com/images/library/${spell_id}.png`} /></div>
        <div className="spell-detail">{formula}</div>
        <div className="spell-detail">{level === 0 ? <span style={{ color: "#ff3838" }}>&#10007;</span> : <>{level}</>}</div>
        <div className="spell-detail">{mana !== -1 ? <>{mana}</> : <>Varies</>}</div>
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
            <div className="spells-scrollable">
              <div className="spell-list">
                <div className="spell">
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("name")}>Name:</span></div>
                  <div className="spell-detail-id"><span className="gold-hover" onClick={() => sortListBy("name")}>Spell id:</span></div>
                  <div className="spell-detail">Spell image:</div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("formula")}>Formula:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("level")}>Level required:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("mana")}>Mana required:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("price")}>Price:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("group_attack")}>Attack spell:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("group_healing")}>Healing spell:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("group_support")}>Support spell:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("type_instant")}>Instant spell:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("type_rune")}>Rune:</span></div>
                  <div className="spell-detail"><span className="gold-hover" onClick={() => sortListBy("premium_only")}>Premium only:</span></div>
                </div>
                {renderSpells(spells ?? [])}
              </div>
            </div>
          </>
          :
          <>Loading spells...</>}
      </div>
    </>
  )
}