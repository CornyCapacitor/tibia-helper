import { useState } from 'react';
import './Guilds.css';

type Guildhall = {
  name: string,
  world: string,
  paid_until: string,
}

type Members = {
  name: string,
  title: string,
  rank: string,
  vocation: string,
  level: number,
  joined: string,
  status: string,
}

type GuildData = {
  name: string,
  world: string,
  logo_url: string,
  description: string,
  active: boolean,
  founded: string,
  open_applications: boolean,
  homepage: string,
  in_war: boolean,
  disband_date: string,
  disband_condition: string,
  players_online: number,
  players_offline: number,
  members_total: number,
  members_invited: number,
  invites: null | string | number,
  guildhalls?: Guildhall[],
  members?: Members[],
}

export const Guilds = () => {
  const [guildName, setGuildName] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [guildData, setGuildData] = useState<GuildData>();

  // Switches
  const [nameSwitch, setNameSwitch] = useState(false);
  const [titleSwitch, setTitleSwitch] = useState(false);
  const [rankSwitch, setRankSwitch] = useState(false);
  const [vocationSwitch, setVocationSwitch] = useState(false);
  const [levelSwitch, setLevelSwitch] = useState(false);
  const [joinedSwitch, setJoinedSwitch] = useState(false);
  const [statusSwitch, setStatusSwitch] = useState(false);

  const fetchGuild = () => {
    setIsFetched(false);

    const preparedGuildName = guildName.toUpperCase()
    setGuildName("");

    if (!guildName) {
      console.log("No guild name provided")
      return
    }
    fetch(`https://dev.tibiadata.com/v4/guild/${preparedGuildName}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        setIsFetched(true);
        setGuildData(data.guild)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const sortListBy = (value: string) => {
    console.log(`Sorting the table by: ${value}`);

    const sortSwitch = (switchValue: boolean, key: string) => {
      const sortOrder = switchValue ? -1 : 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a: any, b: any) => {
        if (typeof a[key] === 'string') {
          return sortOrder * String(a[key]).localeCompare(String(b[key]));
        } else if (typeof a[key] === 'number') {
          return sortOrder * (a[key] - b[key]);
        }
        return 0;
      };
    };

    const applySorting = (switchValue: boolean, key: string, switchSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
      const sortFunction = sortSwitch(switchValue, key);
      guildData?.members?.sort(sortFunction);
      switchSetter(!switchValue);
    };

    switch (value) {
      case "name":
        applySorting(nameSwitch, "name", setNameSwitch);
        break;
      case "title":
        applySorting(titleSwitch, "title", setTitleSwitch);
        break;
      case "rank":
        applySorting(rankSwitch, "rank", setRankSwitch);
        break;
      case "vocation":
        applySorting(vocationSwitch, "vocation", setVocationSwitch);
        break;
      case "level":
        applySorting(levelSwitch, "level", setLevelSwitch);
        break;
      case "joined":
        applySorting(joinedSwitch, "joined", setJoinedSwitch);
        break;
      case "status":
        applySorting(statusSwitch, "status", setStatusSwitch);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="guilds-page">
        <span>Fill the textbox with guild name and press search button</span>
        <div className="guild-search">
          <input type="textbox" value={guildName} onChange={(e) => setGuildName(e.target.value)} className="search-bar" />
          <button onClick={fetchGuild} className="search-button">Search</button>
        </div>
        {isFetched && guildData ?
          <div className="guilds-page-container">
            <div className="guild-result-container">
              <div className="guild-info">
                <header className="header">Guild details:</header>
                <span className="guild-detail">Name: {guildData.name}</span>
                <span className="guild-detail">World: {guildData.world}</span>
                <span className="guild-detail">Description: {guildData.description}</span>
                <span className="guild-detail">Active: {guildData.active ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>} </span>
                <span className="guild-detail">Founded: {guildData.founded}</span>
                <span className="guild-detail">Open applications: {guildData.open_applications ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</span>
                <span className="guild-detail">Homepage: <a href={guildData.homepage}>{guildData.homepage ? <>{guildData.homepage}</> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</a></span>
                <span className="guild-detail">In war: {guildData.in_war ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</span>
                <span className="guild-detail">Disband date: {guildData.disband_date ? <>{guildData.disband_date}</> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</span>
                <span className="guild-detail">Disband condition: {guildData.disband_condition ? <>{guildData.disband_condition}</> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</span>
                <span className="guild-detail">Players online: {guildData.players_online}</span>
                <span className="guild-detail">Total members: {guildData.members_total}</span>
                <span className="guild-detail">Members invited: {guildData.members_invited}</span>
                <span className="guild-detail">Invites: {guildData.invites ? <>{guildData.invites}</> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</span>
              </div>
              <div className="guildhall-info">
                <header className="header">Guildhalls:</header>
                {guildData.guildhalls?.map(({ name, world, paid_until }: Guildhall) => (
                  <div key={name}>
                    <div className="guild-detail">Guildhall name: {name}</div>
                    <div className="guild-detail">World: {world}</div>
                    <div className="guild-detail">Paid until: {paid_until}</div>
                  </div>
                ))}
              </div>
              <div className="guild-image-info">
                <img className="guild-image" src={guildData.logo_url} />
              </div>
            </div>
            <>
              <div className="members-info">
                <header className="members-header">Members:</header>
                <div className="members-scrollable">
                  <div className="members-list">
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("name")}>Name:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("title")}>Title:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("rank")}>Rank:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("vocation")}>Vocation:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("level")}>Level:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("joined")}>Joined:</span></div>
                    <div className="members-detail"><span className="gold-hover" onClick={() => sortListBy("status")}>Status:</span></div>
                  </div>
                  {guildData.members?.map(({ name, title, rank, vocation, level, joined, status }: Members) => (
                    <div className="members-list" key={name}>
                      <div className="members-detail">{name}</div>
                      <div className="members-detail">{title ? <>{title}</> : <>No title selected</>}</div>
                      <div className="members-detail">{rank}</div>
                      <div className="members-detail">{vocation}</div>
                      <div className="members-detail">{level}</div>
                      <div className="members-detail">{joined}</div>
                      <div className="members-detail">{status === "online" ? <span style={{ color: "#3dff3d" }}>{status}</span> : <span style={{ color: "#ff3838" }}>{status}</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>
          :
          <>Example: <span className="gold-hover" onClick={() => setGuildName("Hill")}>Hill</span></>}
      </div >
    </>
  )
}