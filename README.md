# Atmosphere API 
Atmosphere is a simple, yet powerful, free weather API. 

# About the API
All of the api endpoints and other important information 

## API Keys 
There are no API keys! Atmosphere is available to everyone for free.

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