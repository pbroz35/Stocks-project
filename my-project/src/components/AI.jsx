import React, { useContext, useState } from 'react'
import Card from './Card'
import { useEffect } from 'react'
import TickerContent from '../context/ticker'

const AI = () => {

    const {ticker} = useContext(TickerContent)
    const [infoAI, setInfoAI] = useState("No info available..");

    const genAI = async () => {

        console.log("genAi function entered..");

        const apiServer = `http://localhost:3500`;

        let query = "Apple";

        try {
          const response = await fetch(`${apiServer}/fetch-articles?topic=${query}`);
          const data = await response.json();
          console.log("data is ", data);
          setInfoAI(data.aiData.generated_text);
        }
        catch(error)
        {
            console.error(error);
        }




    }

    return (
        <Card className="overflow-y-auto">
            <button onClick={()=>genAI()}>gen AI</button>
            <div>{infoAI}</div>
        </Card>
    )
}

export default AI
