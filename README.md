# Atmosphere API 
Atmosphere is a simple, yet powerful, free weather API. 

# Contents
- [API Keys](#api-keys)
- [Contributing](#contributing)
    -[Getting Started](#getting-started)
    -[Prerequisites](#prerequisites)
        -[Node JS/NPM](#node-js-and-npm)
        -[Openweathermap](#openweathermap)
    -[Build/Run](#build-and-run)
- [Endpoints](#api-endpoints)
    - [All in One](#all-in-one)
    - [Current](#current-weather)
    - [Hourly](#hourly-weather)
    - [Daily](#daily-weather)
    - [Precipitation](#precipitation-data)
    - [Alerts](#weather-alerts)
    - [Coords to City](#coords-to-city)

## API Keys 
There are no API keys! Atmosphere is available to everyone for free.

# Contributing

## Getting Started 
It's paramount that you know how to work with Node.js, Express.js, html, and css before contributing to the project as these make up the project. 

## Prerequisites

### Node JS and NPM
To install NodeJS, navigate to the NodeJS [website](https://nodejs.org/en/) and download the most recent version.

### Openweathermap 
Create an account with Openweathermap as that's where we get our weather data from. Then get an API key for Onecall API 1.0.

## Build and Run
To install all necessary dependencies run ```npm run install-all```. Then make a copy of ```.env_template``` and rename it to ```.env```. Add your Openweathermap API key. Then use ```npm start``` to run Atmosphere.

## API Endpoints

### All in One
Get the information you need just in one call. Information provided includes: current, hourly, and daily weather. Precipitation data and weather alerts 
`https://atmosphere.tropically.org/all/{city}/{units}

### Current Weather
Gives current weather data.
`https://atmosphere.tropically.org/current/{city}/{units}`

### Hourly Weather
Gives weather data for the next 12 hours by default
`https://atmosphere.tropically.org/hourly/{city}/{units}/{hours?}`

### Daily Weather
Gives weather data for the next 7 days by default
`https://atmosphere.tropically.org/daily/{city}/{units}/{days?}`

### Precipitation Data
Gives precipitation data for the next 60 minutes by default
`https://atmosphere.tropically.org/precipitation/{city}/{units}/{minutes?}`

### Weather Alerts 
Gives weather warnings/alerts 
`https://atmosphere.tropically.org/alerts/{city}`

### Coords to City
Convert lon and lat coordinates to get the city name.
`https://atmosphere.tropically.org/city/{lat}/{lon}`