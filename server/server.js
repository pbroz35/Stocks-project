const express = require("express");
require("dotenv").config();
const axios = require("axios");
const { promises: fs } = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3500;

const { filterData } = require("./filter.js"); // Use CommonJS require

// For JSON
app.use(express.json());

// Cross-Origin Resource Sharing
app.use(cors());

const myEnvVar = process.env.FINNHUB_API;

app.use("/getNews", require("./routes/getNews.js"));

app.use("/ticker", require("./routes/tickerInfo.js"));

app.use("/get-Info", require("./routes/getCompanyInfo.js"));

app.use("/getHistoricalData", require("./routes/getHistoricalData.js"));

app.use("/get-AI-response", require("./routes/AI.js"));

app.use("/fetch-articles", async (req, res) => {
  const { topic  } = req.query;

  //const newsAPI = process.env.NEWS_API;

  const feed = `https://newsapi.org/v2/everything?q=${topic}&from=2024-06-31&sortBy=popularity&apiKey=27e0aa453b484611a1266f3ed1dc53b6`;

  console.log(`The topic is ${topic} and the url is ${feed} \n`);

  try {
    const response = await axios.get(feed);

    var articleIndex = 0;

    const results = response.data;

    if (results.status === "ok") {
      const dirPath = path.join(__dirname, "articles");

      await fs.mkdir(dirPath, { recursive: true });

      //delete all files in the folder first.
      try {
        const files = await fs.readdir(dirPath);
        const deletePromises = files.map((file) =>
          fs.unlink(path.join(dirPath, file))
        );
        await Promise.all(deletePromises);
        console.log("All files deleted successfully.");
      } catch (error) {
        console.error("Error while deleting files:", error);
      }

      for (let i = 0; i < results.articles.length; i++) {
        const article = results.articles[i];

        if (
          article.url.startsWith("https://www.wired.com") ||
          article.url.startsWith("https://www.cdn.vox-cdn.com") ||
          article.url.startsWith("https://www.gizmodo.com") ||
          article.url.startsWith("https://www.theverge.com") ||
          article.url.startsWith("https://www.benzinga.com") ||
          article.url.startsWith("https://www.businessinsider.com")
        ) {
          articleIndex = i;

          // Your code here
          const article_text = await axios
            .get(article.url)
            .then((res) => res.data);
          const filePath = path.join(dirPath, `article${i}.html`);
          await fs.writeFile(filePath, article_text);
        }
      }

      console.log("filtering data...");
      
      filterData();
     
      try {
        const aiResponse = await fetch(`http://localhost:3500/get-AI-response?topic=${topic}`);
        const data = await aiResponse.json();
        console.log("data is ", data);

        res.status(200).json({
          message: "Articles fetched and saved successfully.",
          aiData: data
        });
        
      } catch (error) {
        console.error(error);
      }

      
    } else {
      res.status(500).send("Error fetching articles.");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error.message} } `);
  }
});

app.use("/", (req, res) => {
  res.send("main page");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
