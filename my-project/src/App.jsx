import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import { createContext } from "react";
import TickerContent from "./context/ticker.jsx";
import TickerInfo from "./context/currentTickerInfo.jsx";

function App() {
  //const TickerContext = createContext();

  const [ticker, setTicker] = useState([]);

  const [currTickerInfo, setCurrTickerInfo] = useState(["Title"]);

  useEffect(()=>{
    //fetch last added ticker and display as title
    if(ticker.length !== 0)
    {
    console.log("displaying title.");

    const apiServer = `http://localhost:3500`;
    const query = ticker[ticker.length-1]

    console.log("query is,", query.symbol);
    fetch(`${apiServer}/get-Info?symbol=${query.symbol}`)
      .then((res) => res.json())
      .then((data) => {
        
        setCurrTickerInfo(data);
        
        console.log("Info is " , data);
      })
      .catch((error) => {
        console.error("Error fetching ticker:", error);
      });
    }
  },[ticker])



  return (
    <TickerContent.Provider value={{ ticker, setTicker }}>
      <TickerInfo.Provider value={{currTickerInfo, setCurrTickerInfo}}>
        <Dashboard />
      </TickerInfo.Provider>
    </TickerContent.Provider>
  );
}

export default App;
