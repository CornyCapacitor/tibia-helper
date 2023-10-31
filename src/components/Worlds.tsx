import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import './Worlds.css';

type World = {
  name: string,
  status: string,
  players_online: number,
  location: string,
  pvp_type: string,
  premium_only: boolean,
  transfer_type: string,
  battleeye_protected: boolean,
  battleeye_date: string,
  game_world_type: string,
  tournament_world_type: string,
}

type GeneralData = {
  players_online: number,
  record_date: string,
  record_players: number,
}

export const Worlds = () => {
  const [generalData, setGeneralData] = useState<GeneralData>();
  const [worldsData, setWorldsData] = useState<World[]>();

  // Fetch the data
  const fetchWorlds = () => {
    fetch("https://dev.tibiadata.com/v4/worlds")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data)
        // generalData
        const fetchedGeneralData = {
          players_online: data.worlds.players_online,
          record_date: data.worlds.record_date,
          record_players: data.worlds.record_players,
        }

        setGeneralData(fetchedGeneralData);

        // worldsData
        const fetchedWorldsData = data.worlds.regular_worlds
        setWorldsData(fetchedWorldsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(fetchWorlds, []);

  return (
    <>
      <img className="background-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
      <Navbar />
      <div className="worlds-page">
        <button onClick={() => console.log(worldsData)}>Log the worlds</button>
        <button onClick={() => console.log(generalData)}>Log the general data</button>
      </div>
    </>
  )
}