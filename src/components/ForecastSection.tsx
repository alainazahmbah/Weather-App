import React from 'react';
import { WeatherData } from '../types/weather';
import { ForecastCard } from './ForecastCard';
import { Calendar } from 'lucide-react';

interface ForecastSectionProps {
  weatherData: WeatherData;
  isMetric: boolean;
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ weatherData, isMetric }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          5-Day Forecast
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {weatherData.forecast.forecastday.map((day, index) => (
          <ForecastCard
            key={day.date_epoch}
            forecast={day}
            isMetric={isMetric}
          />
        ))}
      </div>
    </div>
  );
};