import React, { useEffect } from "react";
import Card from "./Card";
import ThemeIcon from "./ThemeIcon";
import { useContext } from "react";
import TickerInfo from "../context/currentTickerInfo";

const Header = ({ stockName }) => {
  
  const { currTickerInfo, setCurrTickerInfo } = useContext(TickerInfo);

  const sayInfo = () => {
    console.log("printing info;\n");
    console.log(currTickerInfo);
  };

  return (
    <Card
      className="bg-gray-800 text-gray-300 border-gray-800"
      onClick={() => sayInfo()}
    >
      <div className="flex justify-between items-center h-6">
        <h1 className="pt-0 pl- mt-6 text-5xl font-quicksand">
          {currTickerInfo.name ? currTickerInfo.name : "Ticker"}
        </h1>

        <ThemeIcon className="ml-80"></ThemeIcon>
      </div>
    </Card>
  );
};

export default Header;
