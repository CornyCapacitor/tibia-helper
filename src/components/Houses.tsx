/* eslint-disable @typescript-eslint/no-explicit-any */
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
  auction?: {
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

  // Houses switches
  const [houseNameSwitch, setHouseNameSwitch] = useState<boolean>(true);
  const [houseIdSwitch, setHouseIdSwitch] = useState<boolean>(false);
  const [houseSizeSwitch, setHouseSizeSwitch] = useState<boolean>(false);
  const [houseRentSwitch, setHouseRentSwitch] = useState<boolean>(false);
  const [houseRentedSwitch, setHouseRentedSwitch] = useState<boolean>(false);
  const [houseCurrentBidSwitch, setHouseCurrentBidSwitch] = useState<boolean>(false);
  const [houseTimeLeftSwitch, setHouseTimeLeftSwitch] = useState<boolean>(false);
  const [houseFinishedSwitch, setHouseFinishedSwitch] = useState<boolean>(false);

  // Guildhalls switches
  const [guildhallNameSwitch, setGuildhallNameSwitch] = useState<boolean>(true);
  const [guildhallIdSwitch, setGuildhallIdSwitch] = useState<boolean>(false);
  const [guildhallSizeSwitch, setGuildhallSizeSwitch] = useState<boolean>(false);
  const [guildhallRentSwitch, setGuildhallRentSwitch] = useState<boolean>(false);
  const [guildhallRentedSwitch, setGuildhallRentedSwitch] = useState<boolean>(false);
  const [guildhallCurrentBidSwitch, setGuildhallCurrentBidSwitch] = useState<boolean>(false);
  const [guildhallTimeLeftSwitch, setGuildhallTimeLeftSwitch] = useState<boolean>(false);
  const [guildhallFinishedSwitch, setGuildhallFinishedSwitch] = useState<boolean>(false);

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
            <div className="house-detail">{auction?.current_bid} gp</div>
            <div className="house-detail">{auction?.time_left !== "" ? <>{auction?.time_left}</> : <>No data</>}</div>
            <div className="house-detail">{auction?.finished ? <span style={{ color: "#3dff3d" }}>&#10003;</span> : <span style={{ color: "#ff3838" }}>&#10007;</span>}</div>
          </> : <div className="house-auctioned">Not auctioned</div>}
        </div>
      </div>
    ))
  }

  const sortListBy = (type: string, value: string) => {
    console.log(value);

    if (type === "house") {
      if (value === "name") {
        type NameComparision = { name: string }
        if (houseNameSwitch === false) {
          // A to Z
          const currentSortFunction = (a: NameComparision, b: NameComparision) => a.name.localeCompare(b.name);
          houses?.sort(currentSortFunction);
          setHouseNameSwitch(!houseNameSwitch)
          return
        } else if (houseNameSwitch === true) {
          // Z to A
          const currentSortFunction = (a: NameComparision, b: NameComparision) => b.name.localeCompare(a.name);
          houses?.sort(currentSortFunction);
          setHouseNameSwitch(!houseNameSwitch)
          return
        }
      } else if (value === "id") {
        type IdComparision = { house_id: number }
        if (houseIdSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: IdComparision, b: IdComparision) => b.house_id - a.house_id;
          houses?.sort(currentSortFunction);
          setHouseIdSwitch(!houseIdSwitch);
          return
        } else if (houseIdSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: IdComparision, b: IdComparision) => a.house_id - b.house_id;
          houses?.sort(currentSortFunction);
          setHouseIdSwitch(!houseIdSwitch);
          return
        }
      } else if (value === "size") {
        type SizeComparision = { size: number }
        if (houseSizeSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: SizeComparision, b: SizeComparision) => b.size - a.size;
          houses?.sort(currentSortFunction);
          setHouseSizeSwitch(!houseSizeSwitch);
          return
        } else if (houseSizeSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: SizeComparision, b: SizeComparision) => a.size - b.size;
          houses?.sort(currentSortFunction);
          setHouseSizeSwitch(!houseSizeSwitch);
          return
        }
      } else if (value === "rent") {
        type RentComparision = { rent: number }
        if (houseRentSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: RentComparision, b: RentComparision) => b.rent - a.rent;
          houses?.sort(currentSortFunction);
          setHouseRentSwitch(!houseRentSwitch);
          return
        } else if (houseRentSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: RentComparision, b: RentComparision) => a.rent - b.rent;
          houses?.sort(currentSortFunction);
          setHouseRentSwitch(!houseRentSwitch);
          return
        }
      } else if (value === "rented") {
        // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
        type RentedComparision = { rented: boolean | any }
        if (houseRentedSwitch === false) {
          // True to False
          const currentSortFunction = (a: RentedComparision, b: RentedComparision) => b.rented - a.rented;
          houses?.sort(currentSortFunction);
          setHouseRentedSwitch(!houseRentedSwitch);
          return
        } else if (houseRentedSwitch === true) {
          // False to True
          const currentSortFunction = (a: RentedComparision, b: RentedComparision) => a.rented - b.rented;
          houses?.sort(currentSortFunction);
          setHouseRentedSwitch(!houseRentedSwitch);
          return
        }
      } else if (value === "current_bid") {
        const sortedHouses = houses?.slice().sort((a, b) => {
          const aBid = a.auction?.current_bid || 0;
          const bBid = b.auction?.current_bid || 0;

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            return (houseCurrentBidSwitch ? 1 : -1) * (bBid - aBid);
          }

          return 0;
        });

        setHouses(sortedHouses || null);
        setHouseCurrentBidSwitch(!houseCurrentBidSwitch);
      } else if (value === "time_left") {
        const sortedHouses = houses?.slice().sort((a, b) => {
          const aTimeLeft = a.auction?.time_left || '';
          const bTimeLeft = b.auction?.time_left || '';

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            const order = houseTimeLeftSwitch ? 1 : -1;
            return order * aTimeLeft.localeCompare(bTimeLeft);
          }

          return 0;
        });

        setHouses(sortedHouses || null);
        setHouseTimeLeftSwitch(!houseTimeLeftSwitch);
      } else if (value === "finished") {
        const sortedHouses = houses?.slice().sort((a, b) => {
          const aFinished = a.auction?.finished || false;
          const bFinished = b.auction?.finished || false;

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            const order = houseFinishedSwitch ? -1 : 1;
            return order * (aFinished === bFinished ? 0 : aFinished ? -1 : 1);
          }

          return 0;
        });

        setHouses(sortedHouses || null);
        setHouseFinishedSwitch(!houseFinishedSwitch);
      }
    } else if (type === "guildhall") {
      if (value === "name") {
        type NameComparision = { name: string }
        if (guildhallNameSwitch === false) {
          // A to Z
          const currentSortFunction = (a: NameComparision, b: NameComparision) => a.name.localeCompare(b.name);
          guildhalls?.sort(currentSortFunction);
          setGuildhallNameSwitch(!guildhallNameSwitch)
          return
        } else if (guildhallNameSwitch === true) {
          // Z to A
          const currentSortFunction = (a: NameComparision, b: NameComparision) => b.name.localeCompare(a.name);
          guildhalls?.sort(currentSortFunction);
          setGuildhallNameSwitch(!guildhallNameSwitch)
          return
        }
      } else if (value === "id") {
        type IdComparision = { house_id: number }
        if (guildhallIdSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: IdComparision, b: IdComparision) => b.house_id - a.house_id;
          guildhalls?.sort(currentSortFunction);
          setGuildhallIdSwitch(!guildhallIdSwitch);
          return
        } else if (guildhallIdSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: IdComparision, b: IdComparision) => a.house_id - b.house_id;
          guildhalls?.sort(currentSortFunction);
          setGuildhallIdSwitch(!guildhallIdSwitch);
          return
        }
      } else if (value === "size") {
        type SizeComparision = { size: number }
        if (guildhallSizeSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: SizeComparision, b: SizeComparision) => b.size - a.size;
          guildhalls?.sort(currentSortFunction);
          setGuildhallSizeSwitch(!guildhallSizeSwitch)
          return
        } else if (guildhallSizeSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: SizeComparision, b: SizeComparision) => a.size - b.size;
          guildhalls?.sort(currentSortFunction);
          setGuildhallSizeSwitch(!guildhallSizeSwitch);
          return
        }
      } else if (value === "rent") {
        type RentComparision = { rent: number }
        if (guildhallRentSwitch === false) {
          // Highest to Lowest
          const currentSortFunction = (a: RentComparision, b: RentComparision) => b.rent - a.rent;
          guildhalls?.sort(currentSortFunction);
          setGuildhallRentSwitch(!guildhallRentSwitch);
          return
        } else if (guildhallRentSwitch === true) {
          // Lowest to Highest
          const currentSortFunction = (a: RentComparision, b: RentComparision) => a.rent - b.rent;
          guildhalls?.sort(currentSortFunction);
          setGuildhallRentSwitch(!guildhallRentSwitch);
          return
        }
      } else if (value === "rented") {
        // Not intended use of any - I just don't know why it doesn't allow me to play on booleans
        type RentedComparision = { rented: boolean | any }
        if (guildhallRentedSwitch === false) {
          // True to False
          const currentSortFunction = (a: RentedComparision, b: RentedComparision) => b.rented - a.rented;
          guildhalls?.sort(currentSortFunction);
          setGuildhallRentedSwitch(!guildhallRentedSwitch);
          return
        } else if (guildhallRentedSwitch === true) {
          // False to True
          const currentSortFunction = (a: RentedComparision, b: RentedComparision) => a.rented - b.rented;
          guildhalls?.sort(currentSortFunction);
          setGuildhallRentedSwitch(!guildhallRentedSwitch);
          return
        }
      } else if (value === "current_bid") {
        const sortedGuildhalls = guildhalls?.slice().sort((a, b) => {
          const aBid = a.auction?.current_bid || 0;
          const bBid = b.auction?.current_bid || 0;

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            return (guildhallCurrentBidSwitch ? 1 : -1) * (bBid - aBid);
          }

          return 0;
        });

        setGuildhalls(sortedGuildhalls || null);
        setGuildhallCurrentBidSwitch(!guildhallCurrentBidSwitch);
      } else if (value === "time_left") {
        const sortedGuildhalls = guildhalls?.slice().sort((a, b) => {
          const aTimeLeft = a.auction?.time_left || '';
          const bTimeLeft = b.auction?.time_left || '';

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            const order = houseTimeLeftSwitch ? 1 : -1;
            return order * aTimeLeft.localeCompare(bTimeLeft);
          }

          return 0;
        });

        setGuildhalls(sortedGuildhalls || null);
        setGuildhallTimeLeftSwitch(!guildhallTimeLeftSwitch);
      } else if (value === "finished") {
        const sortedGuildhalls = guildhalls?.slice().sort((a, b) => {
          const aFinished = a.auction?.finished || false;
          const bFinished = b.auction?.finished || false;

          if (a.auctioned !== b.auctioned) {
            return a.auctioned ? -1 : 1;
          }

          if (a.auctioned) {
            const order = houseFinishedSwitch ? -1 : 1;
            return order * (aFinished === bFinished ? 0 : aFinished ? -1 : 1);
          }

          return 0;
        });

        setGuildhalls(sortedGuildhalls || null);
        setGuildhallFinishedSwitch(!guildhallFinishedSwitch);
      }
    }
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
                  <div className="house">
                    <div className="house-name"><span className="clickable-header" onClick={() => sortListBy("house", "name")}>Name:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("house", "id")}>House id:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("house", "size")}>Size:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("house", "rent")}>Rent:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("house", "rented")}>Rented:</span></div>
                    <div className="house-auctioned">
                      <span className="auction-status-header">Auction status:</span>
                      <div className="flexrownogap">
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("house", "current_bid")}>Current bid:</span></div>
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("house", "time_left")}>Time left:</span></div>
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("house", "finished")}>Finished:</span></div>
                      </div>
                    </div>
                  </div>
                  {renderData(houses ?? [])}
                </div>
              </> : <>No house information for selected world/town combiation</>}
            {guildhalls ?
              <>
                <a href="#houseskip"><span id="guildhallskip" className="gold-hover">Skip to houses</span></a>
                <div>
                  <header className="table-header">Guildhalls</header>
                  <div className="house">
                    <div className="house-name"><span className="clickable-header" onClick={() => sortListBy("guildhall", "name")}>Name:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("guildhall", "id")}>House id:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("guildhall", "size")}>Size:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("guildhall", "rent")}>Rent:</span></div>
                    <div className="house-detail"><span className="clickable-header" onClick={() => sortListBy("guildhall", "rented")}>Rented:</span></div>
                    <div className="house-auctioned">
                      <span className="auction-status-header">Auction status:</span>
                      <div className="flexrownogap">
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("guildhall", "current_bid")}>Current bid:</span></div>
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("guildhall", "time_left")}>Time left:</span></div>
                        <div className="auction-status-child"><span className="clickable-header" onClick={() => sortListBy("guildhall", "finished")}>Finished:</span></div>
                      </div>
                    </div>
                  </div>
                  {guildhalls ? renderData(guildhalls ?? []) : <></>}
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