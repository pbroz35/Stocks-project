import React, { useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import { createContext } from "react";
import TickerContent from "./context/ticker.jsx";

function App() {
  const TickerContext = createContext();
  const [ticker, setTicker] = useState(["APL"]);

  return (
    <TickerContent.Provider value={{ ticker, setTicker }}>
      <Dashboard />
    </TickerContent.Provider>
  );
}

export default App;
