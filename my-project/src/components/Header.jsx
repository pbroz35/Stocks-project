import React from "react";
import Card from "./Card";
import ThemeIcon from "./ThemeIcon";

const Header = ({ stockName }) => {
  return (
    <Card className="bg-gray-800 text-gray-300 border-gray-800">

      <div className="flex justify-between items-center h-6">

        <h1 className="pt-0 pl- mt-6 text-5xl font-quicksand">{stockName}</h1>

        <ThemeIcon className="ml-80"></ThemeIcon>

      </div>
      
    </Card>
  );
};

export default Header;
