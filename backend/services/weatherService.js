const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Coordinates for Bangalore, Karnataka
const BANGALORE_LAT = 12.9716;
const BANGALORE_LON = 77.5946;

/**
 * Fetches weather data using the One Call API 3.0 from OpenWeatherMap.
 * This single call gets current weather, hourly forecast, and daily forecast.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {object} Formatted weather data object.
 */
const getWeatherData = async (lat = BANGALORE_LAT, lon = BANGALORE_LON) => {
    if (!API_KEY) {
        throw new Error('OpenWeatherMap API key is missing.');
    }

    try {
        // We exclude minutely alerts to keep the payload smaller.
        const url = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`;
        
        const response = await axios.get(url);
        const data = response.data;

        // Format the data into a structure our frontend can easily use.
        const formattedData = {
            location: {
                name: "Bengaluru", // You can get this from a reverse geocoding call in a more advanced version
                coordinates: { latitude: data.lat, longitude: data.lon },
                timezone: data.timezone,
            },
            current: {
                timestamp: new Date(data.current.dt * 1000),
                temperature: data.current.temp,
                feels_like: data.current.feels_like,
                humidity: data.current.humidity,
                wind_speed: data.current.wind_speed, // in m/s, convert to mph in frontend if needed
                condition: data.current.weather[0]?.main || 'Unknown',
                condition_desc: data.current.weather[0]?.description || 'No description',
                icon: data.current.weather[0]?.icon,
                uv_index: data.current.uvi,
                pressure: data.current.pressure,
            },
            hourly: data.hourly.slice(0, 24).map(hour => ({
                timestamp: new Date(hour.dt * 1000),
                temperature: hour.temp,
                precipitation_probability: hour.pop * 100, // Convert from 0-1 to 0-100
                condition: hour.weather[0]?.main || 'Unknown',
                icon: hour.weather[0]?.icon,
            })),
            daily: data.daily.slice(0, 7).map(day => ({
                timestamp: new Date(day.dt * 1000),
                temperature: {
                    day: day.temp.day,
                    min: day.temp.min,
                    max: day.temp.max,
                },
                humidity: day.humidity,
                precipitation_probability: day.pop * 100,
                condition: day.weather[0]?.main || 'Unknown',
                icon: day.weather[0]?.icon,
            })),
        };

        return formattedData;

    } catch (error) {
        console.error("Error fetching data from OpenWeatherMap API:", error.response?.data || error.message);
        // Re-throw a more user-friendly error
        throw new Error('Failed to fetch weather data from external provider.');
    }
};

module.exports = { getWeatherData };