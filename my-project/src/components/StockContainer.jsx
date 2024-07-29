import React from "react";
import { useContext } from "react";
import TickerContent from "../context/ticker";
import TickerCard from "./TickerCard";

const StockContainer = () => {
  const { ticker } = useContext(TickerContent);

  return (
    <ul>
      {ticker.map((tickerElement, index) =>
        index < 10 ? (
          <TickerCard key={index} tickerElement={tickerElement} />
        ) : null
      )}
    </ul>
  );
};


export default StockContainer;
