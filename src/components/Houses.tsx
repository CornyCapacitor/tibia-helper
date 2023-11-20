/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import './Houses.css';

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

    const sortSwitch = (switchValue: boolean, key: string, compareFn: (a: any, b: any) => number, data: any[], switchSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
      const sortOrder = switchValue ? -1 : 1;
      const sortFunction = (a: any, b: any) => sortOrder * compareFn(a[key], b[key]);
      data.sort(sortFunction);
      switchSetter(!switchValue);
    };

    const applySorting = (switchValue: boolean, key: string, compareFn: (a: any, b: any) => number, switchSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
      if (type === "house") {
        sortSwitch(switchValue, key, compareFn, houses || [], switchSetter);
      } else if (type === "guildhall") {
        sortSwitch(switchValue, key, compareFn, guildhalls || [], switchSetter);
      }
    };

    switch (value) {
      case "name":
        if (type === "house") {
          applySorting(houseNameSwitch, "name", (a, b) => String(a).localeCompare(String(b)), setHouseNameSwitch);
        } else if (type === "guildhall") {
          applySorting(guildhallNameSwitch, "name", (a, b) => String(a).localeCompare(String(b)), setGuildhallNameSwitch);
        }
        break;
      case "id":
        if (type === "house") {
          applySorting(houseIdSwitch, "house_id", (a, b) => a - b, setHouseIdSwitch);
        } else if (type === "guildhall") {
          applySorting(guildhallIdSwitch, "house_id", (a, b) => a - b, setGuildhallIdSwitch);
        }
        break;
      case "size":
        if (type === "house") {
          applySorting(houseSizeSwitch, "size", (a, b) => a - b, setHouseSizeSwitch);
        } else if (type === "guildhall") {
          applySorting(guildhallSizeSwitch, "size", (a, b) => a - b, setGuildhallSizeSwitch);
        }
        break;
      case "rent":
        if (type === "house") {
          applySorting(houseRentSwitch, "rent", (a, b) => a - b, setHouseRentSwitch);
        } else if (type === "guildhall") {
          applySorting(guildhallRentSwitch, "rent", (a, b) => a - b, setGuildhallRentSwitch);
        }
        break;
      case "rented":
        if (type === "house") {
          applySorting(houseRentedSwitch, "rented", (a, b) => a - b, setHouseRentedSwitch);
        } else if (type === "guildhall") {
          applySorting(guildhallRentedSwitch, "rented", (a, b) => a - b, setGuildhallRentedSwitch);
        }
        break;
      case "current_bid":
        if (type === "house") {
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
        } else if (type === "guildhall") {
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
        }
        break;
      case "time_left":
        if (type === "house") {
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
        } else if (type === "guildhall") {
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
        }
        break;
      case "finished":
        if (type === "house") {
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
        } else if (type === "guildhall") {
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
        break;
      default:
        break;
    }
  }


  return (
    <>
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
                </div>
              </> : <>No house information for selected world/town combiation</>}
            {guildhalls ?
              <>
                <a href="#houseskip"><span id="guildhallskip" className="gold-hover">Skip to houses</span></a>
                <div>
                  <header className="table-header">Guildhalls</header>
                  <div className="houses-scrollable">

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
