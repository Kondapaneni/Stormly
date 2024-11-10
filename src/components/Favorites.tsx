import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

export default function Favorites() {
  const { favorites, setLocation } = useWeatherStore();

  // Add to local storage
  function addFavoritePlace(place) {
    let favorites = JSON.parse(localStorage.getItem('favoritePlaces')) || [];
    favorites.push(place);
    localStorage.setItem('favoritePlaces', JSON.stringify(favorites));
  }

  // Retrieve from local storage
  function loadFavoritePlaces() {
    let favorites = JSON.parse(localStorage.getItem('favoritePlaces')) || [];
    favorites.forEach((place) => {
      // Display each favorite place
      displayFavoritePlace(place);
    });
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Favorite Places Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Search for a location and click the heart icon to save it here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Favorite Places
        </h3>
      </div>
      <div className="grid gap-3">
        {favorites.map((location, index) => (
          <button
            key={`${location.latitude}-${location.longitude}-${index}`}
            onClick={() => setLocation(location)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left w-full"
          >
            <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {location.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {location.admin1}, {location.country}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
