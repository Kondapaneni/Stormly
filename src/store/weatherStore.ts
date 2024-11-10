import { create } from 'zustand';
import { WeatherStore } from '../types/weather';

// Get initial values from localStorage or use defaults
const getInitialState = () => ({
  unit: (localStorage.getItem('weatherUnit') as 'celsius' | 'fahrenheit') || 'celsius',
  theme: (localStorage.getItem('weatherTheme') as 'light' | 'dark') || 'light',
  favorites: JSON.parse(localStorage.getItem('weatherFavorites') || '[]')
});

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  location: null,
  isLoading: false,
  error: null,
  ...getInitialState(),
  
  setWeatherData: (data) => set({ weatherData: data }),
  setLocation: (location) => set({ location }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  toggleUnit: () => set((state) => {
    const newUnit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
    localStorage.setItem('weatherUnit', newUnit);
    return { unit: newUnit };
  }),
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('weatherTheme', newTheme);
    return { theme: newTheme };
  }),
  
  addFavorite: (location) => set((state) => {
    const newFavorites = [...state.favorites, location];
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
  
  removeFavorite: (location) => set((state) => {
    const newFavorites = state.favorites.filter(
      (fav) => fav.latitude !== location.latitude || fav.longitude !== location.longitude
    );
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  })
}));