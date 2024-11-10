import React from 'react';
import { useWeatherStore } from '../store/weatherStore';

export default function HourlyForecast() {
  const { weatherData, unit } = useWeatherStore();

  if (!weatherData) return null;

  const next24Hours = weatherData.hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).getHours(),
    temp: unit === 'celsius' 
      ? weatherData.hourly.temperature_2m[index]
      : (weatherData.hourly.temperature_2m[index] * 9/5) + 32,
    precipitation: weatherData.hourly.precipitation_probability[index],
    weatherCode: weatherData.hourly.weather_code[index]
  }));

  const maxTemp = Math.max(...next24Hours.map(hour => hour.temp));
  const minTemp = Math.min(...next24Hours.map(hour => hour.temp));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-4xl overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 dark:text-white">24-Hour Forecast</h3>
      <div className="flex space-x-6 min-w-max">
        {next24Hours.map((hour, index) => {
          const percentage = ((hour.temp - minTemp) / (maxTemp - minTemp)) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm dark:text-gray-400">
                {hour.time}:00
              </span>
              <div className="h-32 flex flex-col items-center justify-end my-2">
                <div 
                  className="w-2 bg-blue-500 rounded-t"
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <span className="font-medium dark:text-white">
                {Math.round(hour.temp)}°
              </span>
              <span className="text-sm text-blue-500">
                {hour.precipitation}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}