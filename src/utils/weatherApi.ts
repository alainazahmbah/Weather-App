import { WeatherData, SearchLocation } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.weatherapi.com/v1';

if (!API_KEY) {
  console.warn('Weather API key not found. Please add VITE_WEATHER_API_KEY to your .env file');
}

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not configured. Please add your API key to the .env file.');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=yes`
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Location not found. Please try a different city name.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your weather API configuration.');
      } else if (response.status === 403) {
        throw new Error('API key quota exceeded. Please upgrade your plan or try again later.');
      } else {
        throw new Error(`Weather service error: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data. Please check your internet connection.');
  }
};

export const searchLocations = async (query: string): Promise<SearchLocation[]> => {
  if (!API_KEY) {
    throw new Error('Weather API key not configured');
  }

  if (query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to search locations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};

export const getCurrentLocationWeather = async (): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherData(`${latitude},${longitude}`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        let message = 'Failed to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Rate limiting helper
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests: number = 100, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter();