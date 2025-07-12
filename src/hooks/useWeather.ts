import { useState, useEffect } from 'react';
import { WeatherData, SearchLocation } from '../types/weather';
import { fetchWeatherData, searchLocations, getCurrentLocationWeather, rateLimiter } from '../utils/weatherApi';

export const useWeather = (initialLocation: string = 'New York') => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMetric, setIsMetric] = useState(() => {
    // Check user's locale preference
    const saved = localStorage.getItem('weather-units');
    if (saved) return saved === 'metric';
    
    // Default to metric for most countries, imperial for US
    const locale = navigator.language || 'en-US';
    return !locale.startsWith('en-US');
  });

  const loadWeatherData = async (location: string) => {
    if (!rateLimiter.canMakeRequest()) {
      setError('Too many requests. Please wait a moment before trying again.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      
      // Cache the last successful location
      localStorage.setItem('last-weather-location', location);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentLocationWeather();
      setWeatherData(data);
      localStorage.setItem('last-weather-location', 'current-location');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get current location';
      setError(errorMessage);
      console.error('Geolocation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnits = () => {
    const newIsMetric = !isMetric;
    setIsMetric(newIsMetric);
    localStorage.setItem('weather-units', newIsMetric ? 'metric' : 'imperial');
  };

  useEffect(() => {
    // Try to load last location or use initial location
    const lastLocation = localStorage.getItem('last-weather-location');
    if (lastLocation === 'current-location') {
      getCurrentLocation();
    } else {
      loadWeatherData(lastLocation || initialLocation);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    isMetric,
    loadWeatherData,
    getCurrentLocation,
    toggleUnits
  };
};

export const useLocationSearch = () => {
  const [locations, setLocations] = useState<SearchLocation[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchCache, setSearchCache] = useState<Map<string, SearchLocation[]>>(new Map());

  const searchLocationsByQuery = async (query: string) => {
    if (query.length < 2) {
      setLocations([]);
      return;
    }

    // Check cache first
    const cached = searchCache.get(query.toLowerCase());
    if (cached) {
      setLocations(cached);
      return;
    }

    if (!rateLimiter.canMakeRequest()) {
      console.warn('Rate limit reached for location search');
      return;
    }

    try {
      setSearchLoading(true);
      const results = await searchLocations(query);
      setLocations(results);
      
      // Cache results
      setSearchCache(prev => new Map(prev.set(query.toLowerCase(), results)));
    } catch (error) {
      console.error('Failed to search locations:', error);
      setLocations([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setLocations([]);
  };

  return {
    locations,
    searchLoading,
    searchLocationsByQuery,
    clearSearch
  };
};