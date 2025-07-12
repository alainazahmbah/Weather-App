import React from 'react';
import { ForecastDay } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { CloudRain, Droplets } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay;
  isMetric: boolean;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, isMetric }) => {
  const maxTemp = isMetric ? forecast.day.maxtemp_c : forecast.day.maxtemp_f;
  const minTemp = isMetric ? forecast.day.mintemp_c : forecast.day.mintemp_f;
  const tempUnit = isMetric ? '°C' : '°F';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm 
                  border border-white/30 hover:bg-white/70 dark:hover:bg-gray-800/70 
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatDate(forecast.date)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
            {forecast.day.condition.text}
          </p>
        </div>
        <WeatherIcon 
          condition={forecast.day.condition.text} 
          code={forecast.day.condition.code} 
          size="lg"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(maxTemp)}{tempUnit}
          </div>
          <div className="text-lg text-gray-500 dark:text-gray-400">
            {Math.round(minTemp)}{tempUnit}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <CloudRain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {forecast.day.daily_chance_of_rain}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {forecast.day.avghumidity}%
          </span>
        </div>
      </div>

      {forecast.day.daily_chance_of_rain > 0 && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Precipitation: {isMetric ? forecast.day.totalprecip_mm : forecast.day.totalprecip_in}
          {isMetric ? 'mm' : 'in'}
        </div>
      )}
    </div>
  );
};