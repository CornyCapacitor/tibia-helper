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
  battleye_protected: boolean,
  battleye_date: string,
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
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [generalData, setGeneralData] = useState<GeneralData>();
  const [worldsData, setWorldsData] = useState<World[]>();

  // Fetch the data
  const fetchWorlds = () => {
    setIsFetched(false);
    fetch("https://dev.tibiadata.com/v4/worlds")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
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
        setIsFetched(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsFetched(false);
      });
  }

  useEffect(fetchWorlds, []);

  const renderWorldList: WorldsRender = (value) => {
    return value.map(({ name, status, players_online, location, pvp_type, premium_only, transfer_type, battleye_protected, battleye_date, game_world_type, tournament_world_type }: World) => (
      <div key={name} className="world">
        <div className="world-component">{name}</div>
        <div className="world-component">{status}</div>
        <div className="world-component">{players_online}</div>
        <div className="world-location">{location}</div>
        <div className="world-pvp-type">{pvp_type}</div>
        <div className="world-component">{premium_only ? <span style={{ color: "lightgreen" }}>&#10003;</span> : <span style={{ color: "red" }}>&#10007;</span>}</div>
        <div className="world-component">{transfer_type}</div>
        <div className="world-component">{battleye_protected ? <span style={{ color: "lightgreen" }}>&#10003;</span> : <span style={{ color: "red" }}>&#10007;</span>}</div>
        <div className="world-component">{battleye_date ? <>{battleye_date}</> : <span style={{ color: "red" }}>&#10007;</span>}</div>
        <div className="world-component">{game_world_type}</div>
        <div className="world-component">{tournament_world_type ? <span style={{ color: "lightgreen" }}>&#10003;</span> : <span style={{ color: "red" }}>&#10007;</span>}</div>
      </div>
    ));
  }

  return (
    <>
      <img className="background-image" src="https://c.wallhere.com/images/dc/db/bf0f2b38fab4fe5804ce04563ae2-1706939.jpg!d" />
      <Navbar />
      <div className="worlds-page">
        <div className="worlds-page-display">
          <div className="worlds-table">
            {isFetched ?
              <div className="general-data">
                <div>Total players online: <span className="highlight-data">{generalData?.players_online}</span></div>
                <div>Record players recorded at: <span className="highlight-data">{generalData?.record_date.substring(0, 10)}</span></div>
                <div>Record players online: <span className="highlight-data">{generalData?.record_players}</span></div>
              </div>
              :
              <div className="general-data">
                <span className="loading">Loading timestamp...</span>
              </div>}
            <div className="world">
              <div className="world-component">Name:</div>
              <div className="world-component">Status:</div>
              <div className="world-component">Players online:</div>
              <div className="world-location">Location:</div>
              <div className="world-pvp-type">Pvp type:</div>
              <div className="world-component">Premium only:</div>
              <div className="world-component">Transfer type:</div>
              <div className="world-component">Battleye protected:</div>
              <div className="world-component">Battleye date:</div>
              <div className="world-component">Game world type:</div>
              <div className="world-component">Tournament world type:</div>
            </div>
            {isFetched ?
              renderWorldList(worldsData ?? [])
              :
              <div className="general-data">
                <span className="loading">Loading worlds...</span>
              </div>}
          </div>
          <button onClick={fetchWorlds} className="refresh">Refresh</button>
        </div>
      </div>

    </>
  )
}