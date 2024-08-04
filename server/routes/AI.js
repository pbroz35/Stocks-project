const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

router.use(cors()); // Enable CORS for all routes

router.get("/", async (req, res) => {
  const question = req.query.question; // Your custom question

  var TextData, lines;

  try {
    // Define the path to the prompts.txt file
    const filePath = path.join(__dirname, "../prompts.txt");

    // Read the file asynchronously
    TextData = await fs.readFile(filePath, "utf-8");

    // Limit TextData to only 70 lines
     lines = TextData.split("\n").slice(0, 70).join("\n");

    // Now you can use the limited lines in your logic
    console.log("File content (limited to 70 lines):", lines);
  } catch (error) 
  {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Failed to read the file" });
  }

  try {
    // Make the request to the external API
    const response = await axios.post(
      "https://arcade.evl.uic.edu/llama/generate",
      {
        inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|> Cutting Knowledge Date: December 2023 Today Date: 23 Jul 2024 You are a helpful assistant<|eot_id|><|start_header_id|>user<| end_header_id|> ${lines} Evaluate based off the articles the company Apple, is it a good investment? <|eot_id|><|start_header_id|>assistant<|end_header_id| >`,
        parameters: {
          max_new_tokens: 30000,
          stop: [
            "<|start_header_id|>",
            "<|end_header_id|>",
            "<|eot_id|>",
            "<|reserved_special_token>",
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("finished ai responseee")
    // Send the API response data to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
