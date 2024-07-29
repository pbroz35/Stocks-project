
const express = require("express");
const router = express.Router();
const path = require("path");
const cors = require('cors');
require('dotenv').config();


router.get("/", async (req, res)=>{
    
    res.header('Access-Control-Allow-Origin', '*');

   // const FinnhubAPI = process.env.FINNHUB_API

    const {symbol} = req.query;

    try {
        // URL of the external API to fetch popular movies
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cqf9qapr01qle0e35srgcqf9qapr01qle0e35ss0`;

      

        // Making the fetch request to the external API
        const response = await fetch(url);

        // Parsing the response as JSON
        const data = await response.json();

        console.log(data);

        // Checking if the response is successful
        if(response.ok){
            // Sending the fetched data as the response in JSON format

           // console.log((data));
            res.json(data);
        }
        else {
            // Logging an error message if the fetch was not successful
            console.error('Error fetching ');
            // Sending an error response with the appropriate status code
            res.status(response.status).json({ msg: "Error, failed to fetch" });
        }
    } 

    catch(error) {
        // Sending a 500 Internal Server Error response in case of any exceptions
        res.status(500).json({ error: 'Internal server error' });
    }


})


//export the router
module.exports = router;