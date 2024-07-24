import React from "react";

const TickerCard = ({ children }) => {
  return (
    <div className="w-full h-full mt-5 rounded-xl relative p-5 border-2 bg-gray-800 border-gray-900 hover:bg-gray-700">
      {children}
    </div>
  );
};

export default TickerCard;

/*

Card = ({children, className}) => {
    return (
        <div className={`w-full h-full rounded-2xl relative p-8 border-2 ${className ? `${className}` : "bg-gray-900  border-gray-800"}`}>
            {children}
        </div>



*/
