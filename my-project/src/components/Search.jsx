import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import TickerContent from "../context/ticker";

const Search = () => {
  const [input, setInput] = useState("");

  const { ticker, setTicker } = useContext(TickerContent);

  const fetchTicker = () => {
    console.log("Fetching tickers...");

    const apiServer = `http://localhost:3500`;
    const query = input; // assuming `input` holds the symbol value

    fetch(`${apiServer}/ticker?symbol=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("value", data);
        console.log("query was", query);
        const newTicker = { symbol: query, info: data };
        setTicker([...ticker, newTicker]);
        console.log(ticker)
      })
      .catch((error) => {
        console.error("Error fetching ticker:", error);
      });
  };

  const clear = () => {
    setInput("");
  };

  const addTicker = () => {
    //Add a verification process to check if the ticker exists?
    console.log("Adding ticker..");

    fetchTicker();
  };

  return (
    <div
      className={`flex items-center my-1 border rounded-xl relative w-95 bg-gray-800 border-gray-800`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-3 py-0 focus:outline-none rounded-md bg-gray-800`}
        placeholder="Search for a stock..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            addTicker();
            clear();
          }
        }}
      />

      {input && (
        <button onClick={clear} className="m-1">
          <XIcon className="h-4 w-4 fill-gray-500"></XIcon>
        </button>
      )}

      <button className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
        <SearchIcon className="h-4 w-4 fill-gray-100"></SearchIcon>
      </button>
    </div>
  );
};

export default Search;
