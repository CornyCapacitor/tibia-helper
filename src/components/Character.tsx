/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from 'react';
import './Character.css';
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

type OtherCharactersDataRender = (value: OtherCharactersData[]) => ReactNode;

export const Character = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>("");
  const [generalData, setGeneralData] = useState<any>();
  const [characterData, setCharacterData] = useState<CharacterData>();
  const [otherCharactersData, setOtherCharactersData] = useState<OtherCharactersData[]>();
  const [accountData, setAccountData] = useState<any>();

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
        setGeneralData(data);
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
      <div key={name}>
        <span className="other-character" onClick={() => charNameClicked(name)}>{name}</span>
      </div>
    ))
  }

  return (
    <>
      <img className="background-image" src="https://i.redd.it/gcs5d4co5z891.png" />
      <Navbar />
      <div className="character-page">
        <div className="character-search">
          <input type="textbox" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
          <button onClick={fetchCharacter}>Search</button>
          <button onClick={() => console.log(accountData)}>Whole data</button>
          <button onClick={() => console.log(otherCharactersData)}>Other characters data</button>
          <button onClick={() => console.log(accountData)}>Account data</button>
        </div>
        {isFetched ?
          <>
            <div className="data-details">
              {isFetched && characterData ?
                <div className="character-info">
                  <header className="header">Character details:</header>
                  <span className="character-detail">Name: {characterData.name}</span>
                  <span className="character-detail">Sex: {characterData.sex}</span>
                  <span>Title: {characterData.title}</span>
                  <span>Unlocked titles: {characterData.unlocked_titles}</span>
                  <span>Vocation: {characterData.vocation}</span>
                  <span>Level: {characterData.level}</span>
                  <span>Achievement points: {characterData.achievement_points}</span>
                  <span>World: {characterData.world}</span>
                  <span>Residence: {characterData.residence}</span>
                  {characterData.guild.name && characterData.guild.rank ? <div>
                    <span>Guild name: {characterData.guild.rank}</span>
                    <span>Guild rank: {characterData.guild.rank}</span>
                  </div> : <span>Guild: not in a guild</span>}
                  <span>Last login: {characterData.last_login.substring(0, 10)}</span>
                  <span>Account status: {characterData.account_status}</span>
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

              {isFetched && accountData.created && accountData.loyalty_title ?
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
          <>
            Fill the textbox with character name and press search button
          </>}
      </div>
    </>
  )
}