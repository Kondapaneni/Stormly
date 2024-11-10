import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

export default function BackButton() {
  const setLocation = useWeatherStore((state) => state.setLocation);

  return (
    <button
      onClick={() => setLocation(null)}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      aria-label="Back to home"
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}