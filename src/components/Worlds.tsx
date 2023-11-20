import { ReactNode, useEffect, useState } from 'react';
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

  // Switches
  const [nameSwitch, setNameSwitch] = useState(true);
  const [statusSwitch, setStatusSwitch] = useState(false);
  const [playersOnlineSwitch, setPlayersOnlineSwitch] = useState(false);
  const [locationSwitch, setLocationSwitch] = useState(false);
  const [pvpTypeSwitch, setPvpTypeSwitch] = useState(false);
  const [premiumOnlySwitch, setPremiumOnlySwitch] = useState(false);
  const [transferTypeSwitch, setTransferTypeSwitch] = useState(false);
  const [battleyeProtectedSwitch, setBattleyeProtectedSwitch] = useState(false);
  const [battleyeDateSwitch, setBattleyeDateSwitch] = useState(false);
  const [gameWorldTypeSwitch, setGameWorldTypeSwitch] = useState(false);
  const [tournamentWorldTypeSwitch, setTournamentWorldTypeSwitch] = useState(false);

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
        const fetchedGeneralData = {
          players_online: data.worlds.players_online,
          record_date: data.worlds.record_date,
          record_players: data.worlds.record_players,
        }
        setGeneralData(fetchedGeneralData);

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
        <div className="wider-world-component">{location}</div>
        <div className="wider-world-component">{pvp_type}</div>
        <div className="world-component">{premium_only ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="world-component">{transfer_type}</div>
        <div className="world-component">{battleye_protected ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="world-component">{battleye_date ? <>{battleye_date}</> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="world-component">{game_world_type}</div>
        <div className="world-component">{tournament_world_type ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
      </div>
    ));
  }

  const sortListBy = (value: string) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortSwitch = (switchValue: boolean, sortFunction: (a: any, b: any) => number) => {
      worldsData?.sort(switchValue ? (a, b) => sortFunction(b, a) : sortFunction);
      return !switchValue;
    };

    switch (value) {
      case "name":
        setNameSwitch(sortSwitch(nameSwitch, (a, b) => a.name.localeCompare(b.name)));
        break;
      case "status":
        setStatusSwitch(sortSwitch(statusSwitch, (a, b) => b.status.localeCompare(a.status)));
        break;
      case "players_online":
        setPlayersOnlineSwitch(sortSwitch(playersOnlineSwitch, (a, b) => b.players_online - a.players_online));
        break;
      case "location":
        setLocationSwitch(sortSwitch(locationSwitch, (a, b) => a.location.localeCompare(b.location)));
        break;
      case "pvp_type":
        setPvpTypeSwitch(sortSwitch(pvpTypeSwitch, (a, b) => a.pvp_type.localeCompare(b.pvp_type)));
        break;
      case "premium_only":
        setPremiumOnlySwitch(sortSwitch(premiumOnlySwitch, (a, b) => b.premium_only - a.premium_only));
        break;
      case "transfer_type":
        setTransferTypeSwitch(sortSwitch(transferTypeSwitch, (a, b) => a.transfer_type.localeCompare(b.transfer_type)));
        break;
      case "battleye_protected":
        setBattleyeProtectedSwitch(sortSwitch(battleyeProtectedSwitch, (a, b) => a.battleye_protected - b.battleye_protected));
        break;
      case "battleye_date":
        setBattleyeDateSwitch(sortSwitch(battleyeDateSwitch, (a, b) => a.battleye_date.localeCompare(b.battleye_date)));
        break;
      case "game_world_type":
        setGameWorldTypeSwitch(sortSwitch(gameWorldTypeSwitch, (a, b) => a.game_world_type.localeCompare(b.game_world_type)));
        break;
      case "tournament_world_type":
        setTournamentWorldTypeSwitch(sortSwitch(tournamentWorldTypeSwitch, (a, b) => a.tournament_world_type - b.tournament_world_type));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="worlds-page">
        <div className="worlds-page-display">
          {isFetched ?
            <div className="general-data">
              <div>Total players online: <span className="highlight-data">{generalData?.players_online}</span></div>
              <div>Record players recorded at: <span className="highlight-data">{generalData?.record_date.substring(0, 10)}</span></div>
              <div>Record players online: <span className="highlight-data">{generalData?.record_players}</span></div>
            </div>
            :
            <div className="general-data">
              <span className="loading">Loading worlds...</span>
            </div>}
          <button onClick={fetchWorlds} className="refresh">Refresh</button>
          <div className="heaeder">

          </div>
          <div className="worlds-scrollable">
            <div className="worlds-table">
              <div className="table-headers">
                <div className="world">
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("name")}>Name:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("status")}>Status:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("players_online")}>Players online:</span></div>
                  <div className="wider-world-component"><span className="clickable-header" onClick={() => sortListBy("location")}>Location:</span></div>
                  <div className="wider-world-component"><span className="clickable-header" onClick={() => sortListBy("pvp_type")}>Pvp type:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("premium_only")}>Premium only:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("transfer_type")}>Transfer type:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("battleye_protected")}>Battleye protected:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("battleye_date")}>Battleye date:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("game_world_type")}>Game world type:</span></div>
                  <div className="world-component"><span className="clickable-header" onClick={() => sortListBy("tournamend_world_type")}>Tournament world type:</span></div>
                </div>
              </div>
              {isFetched ?
                renderWorldList(worldsData ?? [])
                : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}