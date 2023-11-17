/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import { Footer } from './Footer';
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
    console.log(`Sorting the table by: ${value}`);

    if (value === "name") {
      type NameComparision = { name: string }
      if (nameSwitch === false) {
        // A to Z
        const currentSortFunction = (a: NameComparision, b: NameComparision) => a.name.localeCompare(b.name);
        worldsData?.sort(currentSortFunction);
        setNameSwitch(!nameSwitch)
        return
      } else if (nameSwitch === true) {
        // Z to A
        const currentSortFunction = (a: NameComparision, b: NameComparision) => b.name.localeCompare(a.name);
        worldsData?.sort(currentSortFunction);
        setNameSwitch(!nameSwitch)
        return
      }
    } else if (value === "status") {
      type StatusComparision = { status: string }
      if (statusSwitch === false) {
        // Online to Offline
        const currentSortFunction = (a: StatusComparision, b: StatusComparision) => b.status.localeCompare(a.status)
        worldsData?.sort(currentSortFunction);
        setStatusSwitch(!statusSwitch)
        return
      } else if (statusSwitch === true) {
        // Offline to Online
        const currentSortFunction = (a: StatusComparision, b: StatusComparision) => a.status.localeCompare(b.status)
        worldsData?.sort(currentSortFunction);
        setStatusSwitch(!statusSwitch)
        return
      }
    } else if (value === "players_online") {
      type PlayersComparision = { players_online: number }
      if (playersOnlineSwitch === false) {
        // Highest to Lowest
        const currentSortFunction = (a: PlayersComparision, b: PlayersComparision) => b.players_online - a.players_online;
        worldsData?.sort(currentSortFunction);
        setPlayersOnlineSwitch(!playersOnlineSwitch);
        return
      } else if (playersOnlineSwitch === true) {
        // Lowest to Highest
        const currentSortFunction = (a: PlayersComparision, b: PlayersComparision) => a.players_online - b.players_online;
        worldsData?.sort(currentSortFunction);
        setPlayersOnlineSwitch(!playersOnlineSwitch);
        return
      }
    } else if (value === "location") {
      type LocationComparision = { location: string }
      if (locationSwitch === false) {
        // A to Z
        const currentSortFunction = (a: LocationComparision, b: LocationComparision) => a.location.localeCompare(b.location)
        worldsData?.sort(currentSortFunction);
        setLocationSwitch(!locationSwitch);
        return
      } else if (locationSwitch === true) {
        // Z to A
        const currentSortFunction = (a: LocationComparision, b: LocationComparision) => b.location.localeCompare(a.location)
        worldsData?.sort(currentSortFunction);
        setLocationSwitch(!locationSwitch);
        return
      }
    } else if (value === "pvp_type") {
      type PvpTypeComparision = { pvp_type: string }
      if (pvpTypeSwitch === false) {
        // A to Z
        const currentSortFunction = (a: PvpTypeComparision, b: PvpTypeComparision) => a.pvp_type.localeCompare(b.pvp_type)
        worldsData?.sort(currentSortFunction);
        setPvpTypeSwitch(!pvpTypeSwitch);
        return
      } else if (pvpTypeSwitch === true) {
        // Z to A
        const currentSortFunction = (a: PvpTypeComparision, b: PvpTypeComparision) => b.pvp_type.localeCompare(a.pvp_type)
        worldsData?.sort(currentSortFunction);
        setPvpTypeSwitch(!pvpTypeSwitch);
        return
      }
    } else if (value === "premium_only") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type PremiumComparision = { premium_only: boolean | any }
      if (premiumOnlySwitch === false) {
        // True to False
        const currentSortFunction = (a: PremiumComparision, b: PremiumComparision) => b.premium_only - a.premium_only
        worldsData?.sort(currentSortFunction);
        setPremiumOnlySwitch(!premiumOnlySwitch);
        return
      } else if (premiumOnlySwitch === true) {
        // False to True
        const currentSortFunction = (a: PremiumComparision, b: PremiumComparision) => a.premium_only - b.premium_only
        worldsData?.sort(currentSortFunction);
        setPremiumOnlySwitch(!premiumOnlySwitch);
        return
      }
    } else if (value === "transfer_type") {
      type TransferTypeComparision = { transfer_type: string }
      if (transferTypeSwitch === false) {
        // A to Z
        const currentSortFunction = (a: TransferTypeComparision, b: TransferTypeComparision) => a.transfer_type.localeCompare(b.transfer_type)
        worldsData?.sort(currentSortFunction);
        setTransferTypeSwitch(!transferTypeSwitch);
        return
      } else if (transferTypeSwitch === true) {
        // Z to A
        const currentSortFunction = (a: TransferTypeComparision, b: TransferTypeComparision) => b.transfer_type.localeCompare(a.transfer_type)
        worldsData?.sort(currentSortFunction);
        setTransferTypeSwitch(!transferTypeSwitch);
        return
      }
    } else if (value === "battleye_protected") {
      // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
      type BattleyeComparision = { battleye_protected: boolean | any }
      if (battleyeProtectedSwitch === false) {
        // True to False
        const currentSortFunction = (a: BattleyeComparision, b: BattleyeComparision) => a.battleye_protected - b.battleye_protected
        worldsData?.sort(currentSortFunction);
        setBattleyeProtectedSwitch(!battleyeProtectedSwitch);
        return
      } else if (battleyeProtectedSwitch === true) {
        // False to True
        const currentSortFunction = (a: BattleyeComparision, b: BattleyeComparision) => b.battleye_protected - a.battleye_protected
        worldsData?.sort(currentSortFunction);
        setBattleyeProtectedSwitch(!battleyeProtectedSwitch);
        return
      }
    } else if (value === "battleye_date") {
      type BattleyeDateComparision = { battleye_date: string }
      if (battleyeDateSwitch === false) {
        // A to Z
        const currentSortFunction = (a: BattleyeDateComparision, b: BattleyeDateComparision) => a.battleye_date.localeCompare(b.battleye_date)
        worldsData?.sort(currentSortFunction);
        setBattleyeDateSwitch(!battleyeDateSwitch);
        return
      } else if (battleyeDateSwitch === true) {
        // Z to A
        const currentSortFunction = (a: BattleyeDateComparision, b: BattleyeDateComparision) => b.battleye_date.localeCompare(a.battleye_date)
        worldsData?.sort(currentSortFunction);
        setBattleyeDateSwitch(!battleyeDateSwitch);
        return
      }
    } else if (value === "game_world_type") {
      type WorldTypeComparision = { game_world_type: string }
      if (gameWorldTypeSwitch === false) {
        // A to Z
        const currentSortFunction = (a: WorldTypeComparision, b: WorldTypeComparision) => a.game_world_type.localeCompare(b.game_world_type)
        worldsData?.sort(currentSortFunction);
        setGameWorldTypeSwitch(!gameWorldTypeSwitch);
        return
      } else if (gameWorldTypeSwitch === true) {
        // Z to A
        const currentSortFunction = (a: WorldTypeComparision, b: WorldTypeComparision) => b.game_world_type.localeCompare(a.game_world_type)
        worldsData?.sort(currentSortFunction);
        setGameWorldTypeSwitch(!gameWorldTypeSwitch);
        return
      }
    } else if (value === "tournament_world_type") {
      type TournamentWorldComparision = { tournament_world_type: boolean | any }
      if (tournamentWorldTypeSwitch === false) {
        // True to False
        const currentSortFunction = (a: TournamentWorldComparision, b: TournamentWorldComparision) => a.tournament_world_type - b.tournament_world_type
        worldsData?.sort(currentSortFunction);
        setTournamentWorldTypeSwitch(!tournamentWorldTypeSwitch);
        return
      } else if (tournamentWorldTypeSwitch === true) {
        // False to True
        const currentSortFunction = (a: TournamentWorldComparision, b: TournamentWorldComparision) => b.tournament_world_type - a.tournament_world_type
        worldsData?.sort(currentSortFunction);
        setTournamentWorldTypeSwitch(!tournamentWorldTypeSwitch);
        return
      }
    }
  }

  return (
    <>
      <img className="background-image" src="https://nextcloud.cipsoft.com/index.php/apps/files_sharing/publicpreview/JQfrYtjAAm2rEN7?file=/Artworks/Tibia_Artwork_ClientSummer2021.jpg&fileId=83676&x=1920&y=1080&a=true" />
      <Navbar />
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
      <Footer />
    </>
  )
}