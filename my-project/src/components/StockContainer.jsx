import React from "react";
import { useContext } from "react";
import TickerContent from "../context/ticker";
import TickerCard from "./TickerCard";


const StockContainer = () => {
  
  const {ticker} = useContext(TickerContent);  

  return (
    <ul>
      {ticker.map((tickerElement, index) => (
        
        10 > index ? <TickerCard>
        <li key={index}>{tickerElement}</li>
        </TickerCard>: null


      ))}
    </ul>
  );
};

export default StockContainer;
