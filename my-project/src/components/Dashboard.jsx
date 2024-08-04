import React, { useState } from "react";
import Card from "./Card";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Graph from "./Graph";
import News from "./News";
import AI from "./AI";

const Dashboard = () => {
  const [stockName, setStockName] = useState("Apple Inc");

  return (
    <div className="p-2 bg-gray-800 text-gray-300 font-quicksand 
    
    
    
    
    ">
      <div className="h-screen grid grid-cols-9 grid-rows-9 gap-3 overflow-hidden">
        <div className="row-span-1 col-span-9 flex overflow-hidden">
          <Header stockName={stockName}></Header>
        </div>

        <div className="row-span-8 col-span-2 overflow-hidden">
          <Sidebar></Sidebar>
        </div>

        <div className="row-span-6 col-span-5 overflow-hidden">
         <Graph></Graph> 
        </div>

        <div className="row-span-6 col-span-2 overflow-hidden">
          <AI></AI>
        </div>

        <div className="row-span-2 col-span-7 overflow-hidden">
          <News></News>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
