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

app.use('/fetch-articles', async (req, res) => {
  const { topic = "apple", num_articles = 10 } = req.query;
  //const newsAPI = process.env.NEWS_API;

  const feed = `https://newsapi.org/v2/everything?q=Apple&from=2024-06-31&sortBy=popularity&apiKey=27e0aa453b484611a1266f3ed1dc53b6`;

  try {
    const response = await axios.get(feed);

    const results = response.data;
    if (results.status === "ok") {
      
       const dirPath = path.join(__dirname, "articles");
       await fs.mkdir(dirPath, { recursive: true });

       for (let i = 0; i < results.articles.length; i++) {
         const article = results.articles[i];

         if (article.url !== "https://removed.com" && !article.url.startsWith("https://consent.yahoo.com")) {
          
          // Your code here
           const article_text = await axios.get(article.url).then(res => res.data);
           const filePath = path.join(dirPath, `article${i}.html`);
           await fs.writeFile(filePath, article_text);
        }
       }

      res.status(200).send("Articles fetched and saved successfully.");

      console.log("filtering data...");
      filterData();

    } else {
      res.status(500).send("Error fetching articles.");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.use("/get-AI-response", require('./routes/AI.js'));

app.use("/", (req, res) => {
  res.send("main page");
});

app.listen(PORT, () =>
  console.log(`Server is running on PORT ${PORT}`)
);
