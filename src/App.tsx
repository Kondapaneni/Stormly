import React, { useEffect } from 'react';
import { useWeatherStore } from './store/weatherStore';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import BackButton from './components/BackButton';

function App() {
  const { 
    location, 
    setWeatherData, 
    setLoading, 
    setError,
    isLoading,
    error,
    theme 
  } = useWeatherStore();

  // Apply theme on mount and theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation_probability,weather_code&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-center items-center gap-4">
          {location && <BackButton />}
          <SearchBar />
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        {location && !isLoading && !error && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <WeatherCard location={location} />
            </div>
            <div className="flex justify-center">
              <HourlyForecast />
            </div>
          </div>
        )}

        {!location && !isLoading && (
          <LandingPage />
        )}
      </main>
    </div>
  );
}

export default App;