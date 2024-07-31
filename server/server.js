const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3500;
const cors = require("cors");

//for json
app.use(express.json());

//cross origin resource sharing
app.use(cors());

const myEnvVar = process.env.FINNHUB_API;

app.use("/getNews", require("./routes/getNews.js"));

app.use("/ticker", require("./routes/tickerInfo.js"));

app.use("/get-Info", require("./routes/getCompanyInfo.js"));

app.use("/getHistoricalData", require("./routes/getHistoricalData.js"));

app.use("/", (req, res) => {
  res.send("main page");
});

app.listen(PORT, () =>
  console.log(
    `Server is running on PORT ${PORT}`
  )
);
