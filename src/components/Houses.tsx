import { ReactNode, useEffect, useState } from 'react';
import './Houses.css';
import { Navbar } from "./Navbar";

type WorldName = string;

type WorldNamesRender = (value: WorldName[]) => ReactNode;

export const Houses = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [worldNames, setWorldNames] = useState<WorldName[]>();
  const [selectedWorld, setSelectedWorld] = useState<string>("");
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [houses, setHouses] = useState<any[]>();

  const fetchHouses = () => {
    setIsFetched(false);

    fetch(`https://dev.tibiadata.com/v4/houses/${worldName}/${townName}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        setIsFetched(true);
        setSelectedWorld("");
        setSelectedTown("");
        setHouses(data)
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const fetchWorldNames = () => {
    fetch(`https://dev.tibiadata.com/v4/worlds`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`)
        }
      })
      .then((data) => {
        setWorldNames(data.worlds.regular_worlds.map((world: { name: string; }) => world.name))
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  const renderWorldNames: WorldNamesRender = (value) => {
    return value.map((world) => (
      <option value={world} key={world}>{world}</option>
    ));
  }

  useEffect(fetchWorldNames, [])

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219204.jpg" />
      <Navbar />
      <div className="houses-page">
        <span>Fill the textboxes with world and town name, and press search button to search houses in that town</span>
        <div className="houses-search">
          <select className="select-bar" value={selectedWorld} onChange={(e) => setSelectedWorld(e.target.value)}>
            <option value="" disabled>Choose world</option>
            {renderWorldNames(worldNames ?? [])}
          </select>
          <button className="search-button" onClick={() => console.log(selectedWorld)}>Search</button>
        </div>
        {isFetched ? <>Fetched</> : <></>}
      </div>
    </>
  )
}