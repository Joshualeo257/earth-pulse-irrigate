
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Cloud, Sun, CloudRain, CloudDrizzle } from "lucide-react";

// Sample weather data
const forecastData = [
  { day: "Thu", temp: "75/55°", icon: <CloudSun className="h-6 w-6" /> },
  { day: "Tue", temp: "78/57°", icon: <Cloud className="h-6 w-6" /> },
  { day: "Wed", temp: "80/60°", icon: <Sun className="h-6 w-6" /> },
  { day: "Thu", temp: "82/62°", icon: <CloudDrizzle className="h-6 w-6" /> },
  { day: "Mon", temp: "79/61°", icon: <CloudRain className="h-6 w-6" /> },
];

const WeatherForecast: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CloudSun className="h-12 w-12 text-irrigation-blue mr-4" />
          <div>
            <div className="text-4xl font-bold">72°</div>
            <div className="text-sm text-gray-500">Mostly sunny</div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          {forecastData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{day.day}</div>
              <div className="my-2 text-irrigation-blue">{day.icon}</div>
              <div className="text-xs">{day.temp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
