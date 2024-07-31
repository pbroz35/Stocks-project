import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";
import TickerContent from "../context/ticker";

const News = () => {
  const { ticker } = useContext(TickerContent);

  const [news, setNews] = useState();



  useEffect(() => {
    const fetchNews = () => {
      const apiServer = `http://localhost:3500`;
      const query = "AAPL";
  
      fetch(`${apiServer}/getNews?inquiry=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data is ", data);
          //filtering through all articles for search term
          const filteredArticles = data.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.description.toLowerCase().includes(query.toLowerCase())
          );
  
          console.log(`${apiServer}/getNews?inquiry=${query}`);
  
          setNews(filteredArticles);
          console.log("filtered news is ", filteredArticles);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    };
  
    fetchNews();
  }, [ticker]);
  


  return (
    <Card>
      <div>News</div>
   
    </Card>
  );
};

export default News;
