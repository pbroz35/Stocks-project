const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");

router.use(cors()); // Enable CORS for all routes

router.get("/", async (req, res) => {
  const question = req.query.question; // Your custom question

  try {
    // Make the request to the external API
    const response = await axios.post('https://arcade.evl.uic.edu/llama/generate', {
      inputs: "<|begin_of_text|><|start_header_id|>system<|end_header_id|> Cutting Knowledge Date: December 2023 Today Date: 23 Jul 2024 You are a helpful assistant<|eot_id|><|start_header_id|>user<| end_header_id|>Tell me about apple?<|eot_id|><|start_header_id|>assistant<|end_header_id| >",
      parameters: {
        max_new_tokens: 25000,
        stop: ['<|start_header_id|>', '<|end_header_id|>', '<|eot_id|>', '<|reserved_special_token>']
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Send the API response data to the client
    res.json(response.data);

  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
