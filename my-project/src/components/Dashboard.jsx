import React from "react";
import Card from "./Card";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Graph from "./Graph";
import News from "./News";
import AI from "./AI";
import { useState } from "react";

const Dashboard = () => {
  
  const [stockName, setStockName] = useState("Apple Inc")
  
  return (
    <div className={`h-screen grid grid-cols-9 grid-rows-9  gap-3  `}>

      <div className="row-span-1 col-span-9 flex ">
         <Header stockName={stockName}></Header> 
      </div>

      <div className="row-span-8 col-span-2">
        <Sidebar></Sidebar>
      </div>

      <div className="row-span-6 col-span-5">
        <Graph></Graph>
      </div>

      <div className="row-span-6 col-span-2">
        <AI></AI>
      </div>

      <div className="row-span-2 col-span-7">
      <News></News>
      </div>



    </div>
  );
};

export default Dashboard;
