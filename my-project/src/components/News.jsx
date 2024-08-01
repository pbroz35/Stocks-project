import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";
import TickerContent from "../context/ticker";

const News = () => {
  const { ticker } = useContext(TickerContent);

  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      if (ticker.length !== 0) {
        const apiServer = `http://localhost:3500`;
        const query = ticker[ticker.length - 1].symbol;

        try {
          const response = await fetch(`${apiServer}/getNews?inquiry=${query}`);
          const data = await response.json();
          console.log("data is ", data);

          // Filtering articles for the search term
          const filteredArticles = data.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.description.toLowerCase().includes(query.toLowerCase())
          );

          console.log(`${apiServer}/getNews?inquiry=${query}`);

          if (filteredArticles.length > 0) {
            setNews(filteredArticles);
            console.log("filtered news is ", filteredArticles);
          } else {
            console.log(
              "No articles found for the query, getting broader news.."
            );
            setNews(data.articles);
            console.log("Broader news is ", data.articles);
          }
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      }
    };

    fetchNews();
  }, [ticker]);

  return (
    <Card>
    {news && (
      <div className="flex space-x-5 p-1">
        {news.slice(0, 4).map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-8 rounded-3xl opacity-90 hover:opacity-60 shadow-2xl"
            style={{
              backgroundImage: `url(${article.urlToImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginTop: "-20px",
              textDecoration: "none", // Remove underline from links
              color: "inherit" // Inherit text color
            }}
          >
            <h2 className="text-l font-bold mb-2 bg-gray-700 rounded-md p-1 opacity-80 mr-5">
              {article.title}            </h2>
          </a>
        ))}
      </div>
    )}
  </Card>
  
  );
};

export default News;
