import React, { useContext, useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import TickerContent from "../context/ticker";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

const AI = () => {
  const { ticker } = useContext(TickerContent);
  const [infoAI, setInfoAI] = useState("No info available..");

  useEffect(() => {
    const genAI = async () => {
      if (ticker.length >= 1) {
        console.log("genAi function entered..");

        const apiServer = `http://localhost:3500`;

        let query = ticker[ticker.length-1].symbol;

        try {
          const response = await fetch(
            `${apiServer}/fetch-articles?topic=${query}`
          );
          const data = await response.json();
          console.log("data is ", data);
          setInfoAI(data.aiData.generated_text);
        } catch (error) {
          console.error(error);
        }
      }
    };

    genAI();
  }, [ticker]);

  return (
    <Card className="overflow-y-auto bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark ">
      {/* <button onClick={()=>genAI()}>button</button> */}
      <h5 className="font-bold text-decoration-line: underline">
        AI Generated Summary:
      </h5>
      <Markdown>{infoAI}</Markdown>
    </Card>
  );
};

export default AI;
