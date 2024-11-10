export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation_probability: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    uv_index: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherStore {
  weatherData: WeatherData | null;
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  unit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark';
  favorites: Location[];
  setWeatherData: (data: WeatherData) => void;
  setLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleUnit: () => void;
  toggleTheme: () => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (location: Location) => void;
}