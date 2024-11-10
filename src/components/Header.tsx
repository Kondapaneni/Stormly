import React from 'react';
import { Sun, Moon, ThermometerSun } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

export default function Header() {
  const { theme, toggleTheme, unit, toggleUnit } = useWeatherStore();

  return (
    <header className="flex justify-between items-center w-full max-w-4xl mx-auto py-4 px-6">
      <div className="flex items-center space-x-2">
        <ThermometerSun className="h-8 w-8 text-blue-500" />
        <h1 className="text-2xl font-bold dark:text-white">Weather Now</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleUnit}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          °{unit === 'celsius' ? 'C' : 'F'}
        </button>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-800 dark:text-white" />
          ) : (
            <Sun className="h-5 w-5 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>
    </header>
  );
}