import React, { useContext, useState, useEffect } from "react";
import Card from "./Card";
import TickerContent from "../context/ticker";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";

const Graph = () => {
  const [data, setData] = useState();
  const { ticker } = useContext(TickerContent);

  useEffect(() => {
    if (ticker && ticker.length > 0) {
      getHistoricalData();
    }
  }, [ticker]);

  const sayTicker = () => {
    console.log(ticker[ticker.length - 1].symbol);
  };

  const formatAlphaData = (data) => {
    return Object.entries(data).map(([date, item]) => {
      return {
        value: item["1. open"],
        date: date,
      };
    });
  };

  const getHistoricalData = () => {
    const apiServer = `http://localhost:3500`;
    const query = ticker[ticker.length - 1].symbol;

    fetch(`${apiServer}/getHistoricalData?symbol=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("graph data", data);
        const monthlyData = data["Monthly Time Series"];
        const filteredData = {};
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
        for (const [date, values] of Object.entries(monthlyData)) {
          const recordDate = new Date(date);
          if (recordDate >= cutoffDate) {
            filteredData[date] = values;
          }
        }
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching ticker:", error);
      });
  };

  return (
    <Card>
      {data && Object.keys(data).length > 0 ? (
        <ResponsiveContainer>
          <AreaChart data={formatAlphaData(data).reverse()}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={"#312E81"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={"#312E81"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#312E81"
              fillOpacity={1}
              fill="url(#chartColor)"
              strokeWidth={0.5}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827" }}
              itemStyle={{color: "#818CF8"} }
            />
            <XAxis dataKey="date" />  
            <YAxis domain={["dataMin", "dataMax"]} />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </Card>
  );
};

export default Graph;
