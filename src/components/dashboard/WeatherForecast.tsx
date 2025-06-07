import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Cloud, Sun, CloudRain, CloudDrizzle, LoaderCircle, AlertTriangle } from "lucide-react";

// --- TypeScript Types for Weather Data ---
type ForecastDay = {
  date: string;
  temperature: { min: number; max: number };
  condition: string;
};

type WeatherDataType = {
  current: {
    temperature: number;
    condition: string;
  };
  forecast: ForecastDay[];
};

// A helper function to map condition strings to icons
const WeatherIcon = ({ condition, className }: { condition: string; className: string }) => {
  const normalizedCondition = condition.toLowerCase();
  if (normalizedCondition.includes("rain")) return <CloudRain className={className} />;
  if (normalizedCondition.includes("drizzle")) return <CloudDrizzle className={className} />;
  if (normalizedCondition.includes("cloud")) return <Cloud className={className} />;
  if (normalizedCondition.includes("sunny") || normalizedCondition.includes("clear")) return <Sun className={className} />;
  return <CloudSun className={className} />;
};

const WeatherForecast: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [weather, setWeather] = useState<WeatherDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather/latest");
        // We handle 404 as a specific case (no weather data yet) rather than a hard error.
        if (response.status === 404) {
          throw new Error("No weather data available in the database yet.");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setWeather(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch weather data.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Helper to format day from a date string
  const getDayOfWeek = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const renderContent = () => {
    if (loading) {
      return <div className="flex items-center justify-center p-4 h-40"><LoaderCircle className="animate-spin h-6 w-6 text-irrigation-blue" /></div>;
    }
    if (error || !weather) {
      return <div className="flex items-center text-red-600 p-4 h-40"><AlertTriangle className="h-5 w-5 mr-2" /> {error || "Weather data could not be loaded."}</div>;
    }
    return (
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <WeatherIcon condition={weather.current.condition} className="h-12 w-12 text-irrigation-blue mr-4" />
          <div>
            <div className="text-4xl font-bold">{Math.round(weather.current.temperature)}°</div>
            <div className="text-sm text-gray-500 capitalize">{weather.current.condition}</div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          {weather.forecast.slice(0, 5).map((day, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{getDayOfWeek(day.date)}</div>
              <div className="my-2 text-irrigation-blue">
                <WeatherIcon condition={day.condition} className="h-6 w-6 mx-auto" />
              </div>
              <div className="text-xs">{Math.round(day.temperature.max)}°/{Math.round(day.temperature.min)}°</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;