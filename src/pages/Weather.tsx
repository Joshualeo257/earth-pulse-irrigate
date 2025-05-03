
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Cloud, Sun, CloudRain, Droplet, Wind, Thermometer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample weather data
const forecastData = [
  { 
    day: "Today", 
    date: "May 3",
    high: 72, 
    low: 55, 
    icon: <CloudSun className="h-8 w-8 text-irrigation-blue" />,
    condition: "Partly Cloudy",
    precipitation: "10%",
    humidity: "45%",
    wind: "8 mph"
  },
  { 
    day: "Tuesday", 
    date: "May 4",
    high: 78, 
    low: 57, 
    icon: <Cloud className="h-8 w-8 text-irrigation-blue" />,
    condition: "Cloudy",
    precipitation: "20%",
    humidity: "50%",
    wind: "10 mph"
  },
  { 
    day: "Wednesday", 
    date: "May 5",
    high: 80, 
    low: 60, 
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    condition: "Sunny",
    precipitation: "0%",
    humidity: "40%",
    wind: "5 mph"
  },
  { 
    day: "Thursday", 
    date: "May 6",
    high: 82, 
    low: 62, 
    icon: <CloudRain className="h-8 w-8 text-blue-600" />,
    condition: "Scattered Showers",
    precipitation: "40%",
    humidity: "65%",
    wind: "12 mph"
  },
  { 
    day: "Friday", 
    date: "May 7",
    high: 79, 
    low: 61, 
    icon: <Cloud className="h-8 w-8 text-gray-500" />,
    condition: "Mostly Cloudy",
    precipitation: "25%",
    humidity: "55%",
    wind: "7 mph"
  },
];

// Sample temperature data for the chart
const temperatureData = [
  { time: "00:00", temp: 62 },
  { time: "03:00", temp: 60 },
  { time: "06:00", temp: 58 },
  { time: "09:00", temp: 65 },
  { time: "12:00", temp: 70 },
  { time: "15:00", temp: 72 },
  { time: "18:00", temp: 68 },
  { time: "21:00", temp: 65 },
  { time: "00:00", temp: 63 },
];

// Sample precipitation data for the chart
const precipitationData = [
  { time: "00:00", amount: 0 },
  { time: "03:00", amount: 0 },
  { time: "06:00", amount: 0 },
  { time: "09:00", amount: 0.1 },
  { time: "12:00", amount: 0.2 },
  { time: "15:00", amount: 0.1 },
  { time: "18:00", amount: 0 },
  { time: "21:00", amount: 0 },
  { time: "00:00", amount: 0 },
];

const Weather = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Weather</h1>
              <p className="text-gray-600">Current conditions and forecast</p>
            </div>
            
            {/* Current Weather */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-8">
                    <CloudSun className="h-16 w-16 text-irrigation-blue mr-4" />
                    <div>
                      <div className="text-5xl font-bold">72°</div>
                      <div className="text-gray-500">Feels like 74°</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 text-irrigation-green mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">High/Low</div>
                        <div>72°/55°</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 text-irrigation-blue mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div>45%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Wind className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Wind</div>
                        <div>8 mph NE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Weather Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature Forecast (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#4CAF50" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Precipitation Forecast (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={precipitationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#2196F3" 
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            {/* 5-Day Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.map((day, index) => (
                    <div 
                      key={index} 
                      className={`grid grid-cols-3 md:grid-cols-6 gap-4 items-center p-4 ${
                        index < forecastData.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-gray-500">{day.date}</div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        {day.icon}
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{day.condition}</div>
                      </div>
                      
                      <div className="text-center hidden md:block">
                        <div className="text-sm text-gray-500">Precipitation</div>
                        <div>{day.precipitation}</div>
                      </div>
                      
                      <div className="text-center hidden md:block">
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div>{day.humidity}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{day.high}° / {day.low}°</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Weather;
