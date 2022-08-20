const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path")
require("dotenv").config();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use( express.json() )

app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.get("/all/:city/:units", async (req, res) => {

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

    const current = {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        description: data.current.weather[0].main
    }

    const hourly_data = []

    for (let i = 0; i < 12; i++) {
        hourly_data.push({
            temp: data.hourly[i].temp,
            feels_like: data.hourly[i].feels_like,
            humidity: data.hourly[i].humidity,
            description: data.hourly[i].weather[0].main
        })
    }

    const daily_data = []

    for (let i = 0; i < 7; i++) {
        daily_data.push({
            day_time: data.daily[i].temp.day,
            night_time: data.daily[i].temp.night,
            min: data.daily[i].temp.min,
            max: data.daily[i].temp.max,
            humidity: data.daily[i].humidity,
            description: data.daily[i].weather[0].main
        })
    }

    try {
        var alert = {
            event: data.alerts[0].event,
            message: data.alerts[0].description,
            tags: data.alerts[0].tags
        }
    }
    catch(err) {
        var alert = { message: "There are no weather alerts in your area." }
    }

    const precipitation_data = []

    for (let i = 0; i < 60; i++) {
        precipitation_data.push({
            dt: data.minutely[i].dt,
            precipitation: data.minutely[i].precipitation
        })
    }
    
    res.status(200).send({
        current,
        hourly_data,
        daily_data,
        precipitation_data,
        alert
    })
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
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        description: data.current.weather[0].main
    })
});

app.get("/hourly/:city/:units/:hour?", async (req, res) => {

    const { city } = req.params;
    const { units } = req.params;
    var { hour } = req.params;

    if (!city) {
        res.status(418).send({ message: "We need a city!" })
    };
    if (!units) {
        res.status(418).send({ message: "We need unit type!" })
    };
    if (!hour) {
        var hour = 12
    };

    const geo_response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const geo_data = await geo_response.json();

    const LAT = geo_data[0].lat
    const LON = geo_data[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${units}`);
    const data = await response.json();
    
    const hourly_data = []

    for (let i = 0; i < hour; i++) {
        hourly_data.push({
            temp: data.hourly[i].temp,
            feels_like: data.hourly[i].feels_like,
            humidity: data.hourly[i].humidity,
            description: data.hourly[i].weather[0].main
        })
    }

    res.status(200).send(hourly_data)
})

app.get("/daily/:city/:units/:days?", async (req, res) => {

    const { city } = req.params;
    const { units } = req.params;
    var { days } = req.params;

    if (!city) {
        res.status(418).send({ message: "We need a city!" })
    };
    if (!units) {
        res.status(418).send({ message: "We need unit type!" })
    };
    if (!days) {
        var days = 7
    };

    const geo_response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const geo_data = await geo_response.json();

    const LAT = geo_data[0].lat
    const LON = geo_data[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${units}`);
    const data = await response.json();

    const daily_data = []

    for (let i = 0; i < days; i++) {
        daily_data.push({
            day_time: data.daily[i].temp.day,
            night_time: data.daily[i].temp.night,
            min: data.daily[i].temp.min,
            max: data.daily[i].temp.max,
            humidity: data.daily[i].humidity,
            description: data.daily[i].weather[0].main
        })
    }

    res.status(200).send(daily_data)
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

app.get("/precipitation/:city/:units/:minutes?", async (req, res) => {

    const { city } = req.params;
    const { units } = req.params;
    var { minutes } = req.params;

    if (!city) {
        res.status(418).send({ message: "We need a city!" })
    };
    if (!city) {
        res.status(418).send({ message: "We need a unit type!" })
    };
    if (!minutes) {
        var minutes = 60
    };

    const geo_response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const geo_data = await geo_response.json();

    const LAT = geo_data[0].lat
    const LON = geo_data[0].lon

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${units}`);
    const data = await response.json();

    const precipitation_data = []

    for (let i = 0; i < 60; i++) {
        precipitation_data.push({
            dt: data.minutely[i].dt,
            precipitation: data.minutely[i].precipitation
        })
    }

    res.status(200).send(precipitation_data)
});

app.get("/city/:lat/:lon", async (req, res) => {

    const { lat } = req.params;
    const { lon } = req.params;

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
    const data = await response.json()

    res.status(200).send({
        name: data[0].name
    })
});

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)