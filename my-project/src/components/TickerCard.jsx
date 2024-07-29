import React from "react";
import { XCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { RxTriangleUp } from "react-icons/rx";
import { useContext } from "react";
import TickerContent from "../context/ticker";

 

const TickerCard = ({ tickerElement }) => {

  const { ticker, setTicker } = useContext(TickerContent);

  // const sayElement = () => {
  //   console.log(tickerElement);
  //   console.log(tickerElement.info.c);
  // };

  const deleteElement = () => {
    console.log("deleting idtem")
     setTicker((prevTicker) =>
       prevTicker.filter((item) => item.symbol !== tickerElement.symbol)
     );
  };

  const price = tickerElement.info.c ? tickerElement.info.c.toFixed(2) : "0.00";

  return (
    <div

    >
      <div className="flex justify-items-between w-full h-full mt-5 rounded-xl relative p-5 border-1 bg-gray-800 border-gray-900 hover:bg-gray-700 font-roboto text-l">
        <li>{tickerElement.symbol}</li>
        <RxTriangleUp className="text-2xl text-green-600"></RxTriangleUp>
        <div className="absolute right-7 text-green-600">${price}</div>
        <button onClick={() => deleteElement()}>
          <TrashIcon className="h-4 w-5 text-gray-800 hover:text-red-700 absolute right-1 top-6"  />
        </button>
      </div>
    </div>
  );
};

export default TickerCard;
