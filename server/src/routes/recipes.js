const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/search", async (req, res) => {
  const { query } = req.body;

  try {
    const edamamUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
      query
    )}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${
      process.env.EDAMAM_APP_KEY
    }`;

    console.log("🔗 Requesting from:", edamamUrl);
    const response = await axios.get(edamamUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Edamam:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes from Edamam" });
  }
});

module.exports = router;
