 require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "API error: " + (error.response?.data?.message || "Unknown error"),
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
