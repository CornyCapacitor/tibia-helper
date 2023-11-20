import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    console.log(`Sorting the table by ${value}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortSwitch = (switchValue: boolean, key: string, compareFn: (a: any, b: any) => number) => {
      const sortOrder = switchValue ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a: any, b: any) => sortOrder * compareFn(a[key], b[key]);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const applySorting = (switchValue: boolean, key: string, compareFn: (a: any, b: any) => number, switchSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
      const sortFunction = sortSwitch(switchValue, key, compareFn);
      spells?.sort(sortFunction);
      switchSetter(!switchValue);
    };

    switch (value) {
      case "name":
        applySorting(nameSwitch, "name", (a, b) => String(a).localeCompare(String(b)), setNameSwitch);
        break;
      case "formula":
        applySorting(formulaSwitch, "formula", (a, b) => String(a).localeCompare(String(b)), setFormulaSwitch);
        break;
      case "level":
        applySorting(levelSwitch, "level", (a, b) => a - b, setLevelSwitch);
        break;
      case "mana":
        applySorting(manaSwitch, "mana", (a, b) => a - b, setManaSwitch);
        break;
      case "price":
        applySorting(priceSwitch, "price", (a, b) => a - b, setPriceSwitch);
        break;
      case "group_attack":
        applySorting(groupAttackSwitch, "group_attack", (a, b) => a - b, setGroupAttackSwitch);
        break;
      case "group_healing":
        applySorting(groupHealingSwitch, "group_healing", (a, b) => a - b, setGroupHealingSwitch);
        break;
      case "group_support":
        applySorting(groupSupportSwitch, "group_support", (a, b) => a - b, setGroupSupportSwitch);
        break;
      case "type_instant":
        applySorting(instantSwitch, "type_instant", (a, b) => a - b, setInstantSwitch);
        break;
      case "type_rune":
        applySorting(runeSwitch, "type_rune", (a, b) => a - b, setRuneSwitch);
        break;
      case "premium_only":
        applySorting(premiumOnlySwitch, "premium_only", (a, b) => a - b, setPremiumOnlySwitch);
        break;
      default:
        break;
    }
  };


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