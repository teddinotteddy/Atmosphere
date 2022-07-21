const express = require("express");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use( express.json() )

app.get("/current/:city/:units", async (req, res) => {

    const { city } = req.params;
    const { units } = req.params;

    if (!city) {
        res.status(418).send({ message: "We need a city!" })
    };
    if (!units) {
        res.status(418).send({ message: "We need unit type!" })
    };

    const geo_response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const geo_data = await geo_response.json();

    const LAT = geo_data[0].lat
    const LON = geo_data[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${units}`);
    const data = await response.json();

    res.status(200).send({
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        description: data.current.weather[0].main
    })
});

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)