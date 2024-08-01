const express = require("express");
const router = express.Router();
const path = require("path");
const cors = require('cors');
require('dotenv').config();

router.get("/", async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const NEWSAPI = process.env.NEWS_API;
  const { inquiry } = req.query;

  try {
    const url = `https://newsapi.org/v2/everything?q=${inquiry}&from=2024-06-31&sortBy=popularity&apiKey=${NEWSAPI}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      console.error('Error fetching ');
      res.status(response.status).json({ msg: "Error, failed to fetch" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
