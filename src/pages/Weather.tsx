import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, AlertTriangle, Wind, Droplets, ThermometerSun } from 'lucide-react';

// Helper to get a dynamic OpenWeather icon URL
const getWeatherIconUrl = (iconCode: string) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// --- TypeScript Type Definitions for our formatted weather data ---
type CurrentWeather = {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    condition: string;
    condition_desc: string;
    icon: string;
};

type DailyForecast = {
    timestamp: string;
    temperature: { min: number; max: number };
    condition: string;
    icon: string;
};

type WeatherData = {
    current: CurrentWeather;
    daily: DailyForecast[];
    // We will add hourly data later for the charts
};

const Weather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Fetch from our new backend endpoint
                const response = await fetch('/api/weather/bangalore');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                if (result.success) {
                    setWeather(result.data);
                } else {
                    throw new Error(result.message || "Failed to parse weather data.");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeatherData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-96"><LoaderCircle className="animate-spin h-10 w-10 text-irrigation-green" /></div>;
        }
        if (error || !weather) {
            return <div className="flex justify-center items-center h-96 bg-red-50 rounded-lg"><AlertTriangle className="h-8 w-8 text-red-500 mr-4" /> <p className="text-red-700">{error || "Could not load weather data."}</p></div>;
        }

        const { current, daily } = weather;
        const todayForecast = daily[0];

        return (
            <div className="space-y-6">
                {/* Current Conditions Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Conditions in Bengaluru</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="flex items-center">
                                <img src={getWeatherIconUrl(current.icon)} alt={current.condition_desc} className="w-20 h-20 -my-2" />
                                <p className="text-6xl font-bold">{Math.round(current.temperature)}°C</p>
                            </div>
                            <p className="capitalize text-lg text-gray-600 ml-4">{current.condition_desc}</p>
                            <p className="text-sm text-gray-500 ml-4">Feels like {Math.round(current.feels_like)}°C</p>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
                            <div className="flex flex-col items-center">
                                <ThermometerSun className="h-8 w-8 text-orange-500 mb-2" />
                                <p className="font-semibold text-lg">{Math.round(todayForecast.temperature.max)}° / {Math.round(todayForecast.temperature.min)}°</p>
                                <p className="text-sm text-gray-500">High / Low</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                                <p className="font-semibold text-lg">{current.humidity}%</p>
                                <p className="text-sm text-gray-500">Humidity</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Wind className="h-8 w-8 text-gray-500 mb-2" />
                                <p className="font-semibold text-lg">{(current.wind_speed * 3.6).toFixed(1)} km/h</p>
                                <p className="text-sm text-gray-500">Wind</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5-Day Forecast */}
                <Card>
                    <CardHeader><CardTitle>5-Day Forecast</CardTitle></CardHeader>
                    <CardContent className="flex justify-between items-center text-center">
                        {daily.slice(1, 6).map((day, index) => (
                            <div key={index} className="flex flex-col items-center space-y-1">
                                <p className="font-semibold">{new Date(day.timestamp).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                <img src={getWeatherIconUrl(day.icon)} alt={day.condition} className="w-12 h-12" />
                                <p>{Math.round(day.temperature.max)}° / {Math.round(day.temperature.min)}°</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Placeholder for Hourly Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Temperature Forecast (Next 24h)</CardTitle></CardHeader>
                        <CardContent className="h-48 flex items-center justify-center text-gray-500">Chart coming soon...</CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Precipitation Forecast (Next 24h)</CardTitle></CardHeader>
                        <CardContent className="h-48 flex items-center justify-center text-gray-500">Chart coming soon...</CardContent>
                    </Card>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 hidden md:block"><Sidebar /></aside>
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Weather</h1>
                            <p className="text-gray-600">Live conditions and forecast for your region</p>
                        </div>
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Weather;