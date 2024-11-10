import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, 
  Droplets, ThermometerSun, Heart, HeartOff 
} from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import { Location } from '../types/weather';

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="h-8 w-8" />;
  if (code <= 3) return <Cloud className="h-8 w-8" />;
  if (code <= 67) return <CloudRain className="h-8 w-8" />;
  if (code <= 77) return <CloudSnow className="h-8 w-8" />;
  return <CloudLightning className="h-8 w-8" />;
};

export default function WeatherCard({ location }: { location: Location }) {
  const { weatherData, unit, favorites, addFavorite, removeFavorite } = useWeatherStore();

  if (!weatherData) return null;

  const isFavorite = favorites.some(
    (fav) => fav.latitude === location.latitude && fav.longitude === location.longitude
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(location);
    } else {
      addFavorite(location);
    }
  };

  const temp = unit === 'celsius' 
    ? weatherData.current.temperature_2m 
    : (weatherData.current.temperature_2m * 9/5) + 32;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            {location.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {location.admin1}, {location.country}
          </p>
        </div>
        <button
          onClick={toggleFavorite}
          className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        >
          {isFavorite ? <Heart className="h-6 w-6 fill-red-500" /> : <HeartOff className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {getWeatherIcon(weatherData.hourly.weather_code[0])}
          <span className="text-4xl font-bold ml-2 dark:text-white">
            {Math.round(temp)}°{unit === 'celsius' ? 'C' : 'F'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Wind className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="dark:text-white">
            {weatherData.current.wind_speed_10m} km/h
          </span>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="dark:text-white">
            {weatherData.current.relative_humidity_2m}%
          </span>
        </div>
        <div className="flex items-center">
          <CloudRain className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="dark:text-white">
            {weatherData.current.precipitation_probability}%
          </span>
        </div>
        <div className="flex items-center">
          <ThermometerSun className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="dark:text-white">
            UV {weatherData.current.uv_index}
          </span>
        </div>
      </div>
    </div>
  );
}