const express = require("express");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use( express.json() )

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

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
        "temp": data.current.temp,
        "feels_like": data.current.feels_like,
        "humidity": data.current.humidity,
        "description": data.current.weather[0].main
    })
});

app.get("/hourly/:city/:units", async (req, res) => {

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

    res.status(200).send([
        {
            "temp": data.hourly[0].temp,
            "feels_like": data.hourly[0].feels_like,
            "humidity": data.hourly[0].humidity,
            "description": data.hourly[0].weather[0].main
        },
        {
            "temp": data.hourly[1].temp,
            "feels_like": data.hourly[1].feels_like,
            "humidity": data.hourly[1].humidity,
            "description": data.hourly[1].weather[0].main
        },
        {
            "temp": data.hourly[2].temp,
            "feels_like": data.hourly[2].feels_like,
            "humidity": data.hourly[2].humidity,
            "description": data.hourly[2].weather[0].main
        },
        {
            "temp": data.hourly[3].temp,
            "feels_like": data.hourly[3].feels_like,
            "humidity": data.hourly[3].humidity,
            "description": data.hourly[3].weather[0].main
        },
        {
            "temp": data.hourly[4].temp,
            "feels_like": data.hourly[4].feels_like,
            "humidity": data.hourly[4].humidity,
            "description": data.hourly[4].weather[0].main
        },
        {
            "temp": data.hourly[5].temp,
            "feels_like": data.hourly[5].feels_like,
            "humidity": data.hourly[5].humidity,
            "description": data.hourly[5].weather[0].main
        },
        {
            "temp": data.hourly[6].temp,
            "feels_like": data.hourly[6].feels_like,
            "humidity": data.hourly[6].humidity,
            "description": data.hourly[6].weather[0].main
        },
        {
            "temp": data.hourly[7].temp,
            "feels_like": data.hourly[7].feels_like,
            "humidity": data.hourly[7].humidity,
            "description": data.hourly[7].weather[0].main
        },
        {
            "temp": data.hourly[8].temp,
            "feels_like": data.hourly[8].feels_like,
            "humidity": data.hourly[8].humidity,
            "description": data.hourly[8].weather[0].main
        },
        {
            "temp": data.hourly[9].temp,
            "feels_like": data.hourly[9].feels_like,
            "humidity": data.hourly[9].humidity,
            "description": data.hourly[9].weather[0].main
        },
        {
            "temp": data.hourly[10].temp,
            "feels_like": data.hourly[10].feels_like,
            "humidity": data.hourly[10].humidity,
            "description": data.hourly[10].weather[0].main
        },
        {
            "temp": data.hourly[11].temp,
            "feels_like": data.hourly[11].feels_like,
            "humidity": data.hourly[11].humidity,
            "description": data.hourly[11].weather[0].main
        },
    ])
})

app.get("/daily/:city/:units", async (req, res) => {

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

    res.status(200).send([
        {
            "day time": data.daily[0].temp.day,
            "night time": data.daily[0].temp.night,
            "min": data.daily[0].temp.min,
            "max": data.daily[0].temp.max,
            "humidity": data.daily[0].humidity,
            "description": data.daily[0].weather[0].main
        },
        {
            "day time": data.daily[1].temp.day,
            "night time": data.daily[1].temp.night,
            "min": data.daily[1].temp.min,
            "max": data.daily[1].temp.max,
            "humidity": data.daily[1].humidity,
            "description": data.daily[1].weather[0].main
        },
        {
            "day time": data.daily[2].temp.day,
            "night time": data.daily[2].temp.night,
            "min": data.daily[2].temp.min,
            "max": data.daily[2].temp.max,
            "humidity": data.daily[2].humidity,
            "description": data.daily[2].weather[0].main
        },
        {
            "day time": data.daily[3].temp.day,
            "night time": data.daily[3].temp.night,
            "min": data.daily[3].temp.min,
            "max": data.daily[3].temp.max,
            "humidity": data.daily[3].humidity,
            "description": data.daily[3].weather[0].main
        },
        {
            "day time": data.daily[4].temp.day,
            "night time": data.daily[4].temp.night,
            "min": data.daily[4].temp.min,
            "max": data.daily[4].temp.max,
            "humidity": data.daily[4].humidity,
            "description": data.daily[4].weather[0].main
        },
        {
            "day time": data.daily[5].temp.day,
            "night time": data.daily[5].temp.night,
            "min": data.daily[5].temp.min,
            "max": data.daily[5].temp.max,
            "humidity": data.daily[5].humidity,
            "description": data.daily[5].weather[0].main
        },
        {
            "day time": data.daily[6].temp.day,
            "night time": data.daily[6].temp.night,
            "min": data.daily[6].temp.min,
            "max": data.daily[6].temp.max,
            "humidity": data.daily[6].humidity,
            "description": data.daily[6].weather[0].main
        },
    ])
});

app.get("/alerts/:city", async (req, res) => {

    const { city } = req.params;

    if (!city) {
        res.status(418).send({ message: "We need a city!" })
    }

    const geo_response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const geo_data = await geo_response.json();

    const LAT = geo_data[0].lat
    const LON = geo_data[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
    const data = await response.json();

    try {
        res.status(200).send({
            event: data.alerts[0].event,
            message: data.alerts[0].description,
            tags: data.alerts[0].tags
        })
    }
    catch(err) {
        res.status(200).send({ message: "There are no weather alerts in your area." })
    }
})

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)