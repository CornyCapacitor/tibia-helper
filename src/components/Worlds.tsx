import { ReactNode, useEffect, useState } from 'react';
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

type WorldsRender = (value: World[]) => ReactNode;

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

  const renderWorldList: WorldsRender = (value) => {
    return value.map(({ name, status, players_online, location, pvp_type, premium_only, transfer_type, battleeye_protected, battleeye_date, game_world_type, tournament_world_type }: World) => (
      <div key={name} className="world">
        <div className="world-component">{name}</div>
        <div className="world-component">{status}</div>
        <div className="world-component">{players_online}</div>
        <div className="world-location">{location}</div>
        <div className="world-pvp-type">{pvp_type}</div>
        <div className="world-component">{premium_only}</div>
        <div className="world-component">{transfer_type}</div>
        <div className="world-component">{battleeye_protected}</div>
        <div className="world-component">{battleeye_date}</div>
        <div className="world-component">{game_world_type}</div>
        <div className="world-component">{tournament_world_type}</div>
      </div>
    ));
  }

  return (
    <>
      <img className="background-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
      <Navbar />
      <div className="worlds-page">
        <div className="worlds-table">
          <div className="world">
            <div className="world-component">Name:</div>
            <div className="world-component">Status:</div>
            <div className="world-component">Players online:</div>
            <div className="world-location">Location:</div>
            <div className="world-pvp-type">Pvp type:</div>
            <div className="world-component">Premium only:</div>
            <div className="world-component">Transfer type:</div>
            <div className="world-component">Battleeye protected:</div>
            <div className="world-component">Battleeye date:</div>
            <div className="world-component">Game world type:</div>
            <div className="world-component">Tournament world type:</div>
          </div>
          {renderWorldList(worldsData ?? [])}
        </div>
      </div>

    </>
  )
}