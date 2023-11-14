/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from 'react';
import './Characters.css';
import { Navbar } from "./Navbar";

type CharacterData = {
  name: string,
  sex: string,
  title: string,
  unlocked_titles: number,
  vocation: string,
  level: number,
  achievement_points: number,
  world: string,
  residence: string,
  guild: {
    name: string,
    rank: string,
  }
  last_login: string,
  account_status: string,
}

type OtherCharactersData = {
  name: string,
  world: string,
  status: string,
  deleted: boolean,
  main: boolean,
  traded: boolean,
}

type AccountInformation = {
  created: string,
  loyalty_title: string,
}

type OtherCharactersDataRender = (value: OtherCharactersData[]) => ReactNode;

export const Characters = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>("");
  const [characterData, setCharacterData] = useState<CharacterData>();
  const [otherCharactersData, setOtherCharactersData] = useState<OtherCharactersData[]>();
  const [accountData, setAccountData] = useState<AccountInformation>();

  // Fetch the data
  const fetchCharacter = () => {
    setIsFetched(false);
    if (!characterName) {
      console.log("No character name provided")
      return
    }
    fetch(`https://dev.tibiadata.com/v4/character/${characterName}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      })
      .then((data) => {
        setCharacterName("");
        console.log(data)
        setCharacterData(data.character.character)
        setOtherCharactersData(data.character.other_characters)
        setAccountData(data.character.account_information)
        setIsFetched(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        fetchCharacter();
      });
  }

  const charNameClicked: (value: string) => void = (value: string) => {
    setCharacterName(value)
  }

  const renderOtherCharactersData: OtherCharactersDataRender = (value) => {
    return value.map(({ name }: OtherCharactersData) => (
      <span key={name} className="other-character" onClick={() => charNameClicked(name)}><span className="gold-hover">{name}</span></span>
    ))
  }

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219191.jpg" />
      <Navbar />
      <div className="character-page">
        <span>Fill the textbox with character name and press search button</span>
        <div className="character-search">
          <input type="textbox" value={characterName} onChange={(e) => setCharacterName(e.target.value)} className="search-bar" />
          <button onClick={fetchCharacter} className="search-button">Search</button>
        </div>
        {isFetched ?
          <>
            <div className="data-details">
              {isFetched && characterData ?
                <div className="character-info">
                  <header className="header">Character details:</header>
                  <span className="character-detail">Name: {characterData.name}</span>
                  <span className="character-detail">Sex: {characterData.sex}</span>
                  <span className="character-detail">Title: {characterData.title}</span>
                  <span className="character-detail">Unlocked titles: {characterData.unlocked_titles}</span>
                  <span className="character-detail">Vocation: {characterData.vocation}</span>
                  <span className="character-detail">Level: {characterData.level}</span>
                  <span className="character-detail">Achievement points: {characterData.achievement_points}</span>
                  <span className="character-detail">World: {characterData.world}</span>
                  <span className="character-detail">Residence: {characterData.residence}</span>
                  {characterData.guild.name && characterData.guild.rank ? <div>
                    <span className="character-detail">Guild rank: {characterData.guild.rank} of the <a target="_blank" href={"https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=" + characterData.guild.name}><span className="gold-fragment">{characterData.guild.name}</span></a></span>
                  </div> : <span className="character-detail">Guild: not in a guild</span>}
                  <span className="character-detail">Last login: {characterData.last_login.substring(0, 10)}</span>
                  <span className="character-detail">Account status: {characterData.account_status}</span>
                </div>
                :
                <>
                  Failed to fetch character data
                </>
              }

              {isFetched && otherCharactersData ?
                <div className="other-characters">
                  <header className="header">Characters on this account:</header>
                  {renderOtherCharactersData(otherCharactersData) ?? []}
                </div>
                :
                <div className="other-characters">
                  <header className="header">There are no other characters on this account</header>
                </div>
              }

              {isFetched && accountData?.created && accountData?.loyalty_title ?
                <div className="account-details">
                  <header className="header">Account details:</header>
                  <div>Created at: {accountData.created.substring(0, 10)}</div>
                  <div>Loyalty title: {accountData.loyalty_title}</div>
                </div>
                :
                <div className="account-details">
                  <header className="header">There is no data about this acount</header>
                </div>
              }
            </div>
          </>
          :
          <>Example: <span className="gold-hover" onClick={() => setCharacterName("Mateusz Dragon Wielki")}>Mateusz Dragon Wielki</span></>}
      </div>
    </>
  )
}