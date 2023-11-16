import { ReactNode, useEffect, useState } from 'react';
import './Houses.css';
import { Navbar } from "./Navbar";

type Name = string;

type Data = {
  name: string,
  house_id: number,
  size: number,
  rent: number,
  rented: boolean,
  auctioned: boolean,
  auction: {
    current_bid: number,
    finished: boolean,
    time_left: string,
  }
}

type NamesRender = (value: Name[]) => ReactNode;

type DataRender = (value: Data[]) => ReactNode;

export const Houses = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [worldNames, setWorldNames] = useState<Name[]>();
  const [townNames] = useState<Name[]>(["Ab'Dendriel", "Ankrahmun", "Carlin", "Darashia", "Edron", "Farmine", "Gray Beach", "Issavi",
    "Kazordoon", "Liberty Bay", "Moonfall", "Port Hope", "Rathleton", "Silvertides", "Svargrond", "Thais", "Venore", "Yalahar"
  ]);
  const [selectedWorld, setSelectedWorld] = useState<string>("");
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [houses, setHouses] = useState<Data[] | null>(null);
  const [guildhalls, setGuildhalls] = useState<Data[] | null>(null);

  const fetchHouses = () => {
    setIsFetched(false);
    if (!selectedWorld || !selectedTown) {
      console.error("Town or World not provided")
    } else {
      fetch(`https://dev.tibiadata.com/v4/houses/${selectedWorld}/${selectedTown}`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw new Error(`HTTP Error: ${response.status}`);
          }
        })
        .then((data) => {
          setIsFetched(true);
          setHouses(data.houses.house_list)
          setGuildhalls(data.houses.guildhall_list)
          console.log("Houses:")
          console.log(data.houses.house_list);
          console.log("Guildhalls")
          console.log(data.houses.guildhall_list);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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

  useEffect(fetchWorldNames, [])

  const renderOptions: NamesRender = (value) => {
    return value.map((option) => (
      <option value={option} key={option}>{option}</option>
    ));
  }

  const renderData: DataRender = (value) => {
    return value.map(({ name, house_id, size, rent, rented, auctioned, auction }: Data) => (
      <div key={house_id} className="house">
        <div className="house-name">{name}</div>
        <div className="house-detail">{house_id}</div>
        <div className="house-detail">{size}</div>
        <div className="house-detail">{rent}</div>
        <div className="house-detail">{rented ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
        <div className="flexrownogap">
          {auctioned ? <>
            <div className="house-detail">{auction.current_bid} gp</div>
            <div className="house-detail">{auction.time_left !== "" ? <>{auction.time_left}</> : <>No data</>}</div>
            <div className="house-detail">{auction.finished ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
          </> : <div className="house-auctioned">Not auctioned</div>}
        </div>
      </div>
    ))
  }

  return (
    <>
      <img className="background-image" src="https://wallpapercave.com/wp/wp7219204.jpg" />
      <Navbar />
      <div className="houses-page">
        <span>Select below both world and town names, and press search button to search houses in that town</span>
        <div className="houses-search">
          <div className="flexrow">
            <select className="select-bar" value={selectedWorld} onChange={(e) => setSelectedWorld(e.target.value)}>
              <option value="" disabled>Choose world</option>
              {renderOptions(worldNames ?? [])}
            </select>
          </div>
          {selectedWorld ?
            <div className="flexrow">
              <select className="select-bar" value={selectedTown} onChange={(e) => setSelectedTown(e.target.value)}>
                <option value="" disabled>Choose town</option>
                {renderOptions(townNames ?? [])}
              </select>
            </div>
            : <></>}
          {selectedWorld && selectedTown ?
            <div className="flexrow">
              <button className="search-button" onClick={() => fetchHouses()}>Search</button>
            </div>
            : <></>}
        </div>
        {isFetched && houses || guildhalls ?
          <>
            <a href="#guildhallskip"><span id="houseskip" className="gold-hover">Skip to guildhalls</span></a>
            {houses ?
              <>
                <div>
                  <header className="table-header">Houses</header>
                  <div className="houses-scrollable">
                    <div className="house">
                      <div className="house-name">Name:</div>
                      <div className="house-detail">House id:</div>
                      <div className="house-detail">Size:</div>
                      <div className="house-detail">Rent:</div>
                      <div className="house-detail">Rented:</div>
                      <div className="house-auctioned">
                        <span className="auction-status-header">Auction status:</span>
                        <div className="auction-status-children-container">
                          <div className="auction-status-child">Current bid:</div>
                          <div className="auction-status-child">Time left:</div>
                          <div className="auction-status-child">Finished:</div>
                        </div>
                      </div>
                    </div>
                    {renderData(houses ?? [])}
                  </div>
                </div>
              </> : <>No house information for selected world/town combiation</>}
            {guildhalls ?
              <>
                <a href="#houseskip"><span id="guildhallskip" className="gold-hover">Skip to houses</span></a>
                <div>
                  <header className="table-header">Guildhalls</header>
                  <div className="houses-scrollable">
                    <div className="house">
                      <div className="house-name">Name:</div>
                      <div className="house-detail">House id:</div>
                      <div className="house-detail">Size:</div>
                      <div className="house-detail">Rent:</div>
                      <div className="house-detail">Rented:</div>
                      <div className="house-auctioned">
                        <span className="auction-status-header">Auction status:</span>
                        <div className="flexrownogap">
                          <div className="auction-status-child">Current bid:</div>
                          <div className="auction-status-child">Time left:</div>
                          <div className="auction-status-child">Finished:</div>
                        </div>
                      </div>
                    </div>
                    {guildhalls ? renderData(guildhalls ?? []) : <></>}
                  </div>
                </div>
              </> : <>No guildhall information for selected world/town combination</>}
          </>
          :
          <>
            {isFetched && !houses && !guildhalls ?
              <>
                No house/guildhall information for selected world/town combination
              </> : <></>}
          </>}
      </div>
    </>
  )
}