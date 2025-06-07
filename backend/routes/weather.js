const express = require('express');
const router = express.Router();
const { Weather } = require('../models/Sensor');

// GET /api/weather/latest - Get the latest weather forecast
router.get('/latest', async (req, res) => {
    try {
        const latestWeather = await Weather.findOne().sort({ timestamp: -1 });

        if (!latestWeather) {
            return res.status(404).json({ success: false, message: 'No weather data available.' });
        }

        res.json({ success: true, data: latestWeather });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching weather data', error: error.message });
    }
});

// POST /api/weather - Simulate adding new weather data (for demo/testing)
router.post('/', async (req, res) => {
    try {
        // In a real app, a service would fetch this data from an external API
        const newWeatherData = new Weather(req.body);
        await newWeatherData.save();
        res.status(201).json({ success: true, message: 'Weather data saved successfully', data: newWeatherData });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error saving weather data', error: error.message });
    }
});

module.exports = router;