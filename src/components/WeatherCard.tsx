import React from 'react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  Sunrise,
  Sunset,
  Navigation
} from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
  isMetric: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, isMetric }) => {
  const { location, current } = weatherData;
  
  const temperature = isMetric ? current.temp_c : current.temp_f;
  const feelsLike = isMetric ? current.feelslike_c : current.feelslike_f;
  const windSpeed = isMetric ? current.wind_kph : current.wind_mph;
  const visibility = isMetric ? current.vis_km : current.vis_miles;
  const pressure = isMetric ? current.pressure_mb : current.pressure_in;
  const tempUnit = isMetric ? '°C' : '°F';
  const windUnit = isMetric ? 'km/h' : 'mph';
  const visUnit = isMetric ? 'km' : 'mi';
  const pressureUnit = isMetric ? 'mb' : 'in';

  const formatLocalTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-600' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-600' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-600' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-600' };
    return { level: 'Extreme', color: 'text-purple-600' };
  };

  const uvInfo = getUVLevel(current.uv);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 
                  rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {location.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {location.region}, {location.country}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatLocalTime(location.localtime)}
          </p>
        </div>
        <WeatherIcon 
          condition={current.condition.text} 
          code={current.condition.code} 
          size="xl"
        />
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-light text-gray-900 dark:text-white mb-2">
            {Math.round(temperature)}
            <span className="text-3xl text-gray-600 dark:text-gray-300">{tempUnit}</span>
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-300 capitalize">
            {current.condition.text}
          </div>
          <div className="text-gray-500 dark:text-gray-400 mt-1">
            Feels like {Math.round(feelsLike)}{tempUnit}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Wind className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Wind</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {Math.round(windSpeed)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {windUnit} {current.wind_dir}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Humidity</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {current.humidity}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {current.humidity > 70 ? 'High' : current.humidity > 40 ? 'Moderate' : 'Low'}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Visibility</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {visibility}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {visUnit}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Gauge className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Pressure</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {Math.round(pressure)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {pressureUnit}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">UV Index</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {current.uv}
          </div>
          <div className={`text-sm font-medium ${uvInfo.color}`}>
            {uvInfo.level}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Cloud Cover</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {current.cloud}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Coverage
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm col-span-2">
          <div className="flex items-center space-x-2 mb-2">
            <Sunrise className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Sun & Moon</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {weatherData.forecast.forecastday[0]?.astro.sunrise || 'N/A'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Sunrise</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {weatherData.forecast.forecastday[0]?.astro.sunset || 'N/A'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Sunset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};