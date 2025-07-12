import React from 'react';
import { ToggleLeft, ToggleRight, CloudSun } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  isMetric: boolean;
  onToggleUnits: () => void;
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isMetric,
  onToggleUnits,
  onLocationSelect,
  onCurrentLocation,
  loading
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-6 
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <CloudSun className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          WeatherPro
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <SearchBar
          onLocationSelect={onLocationSelect}
          onCurrentLocation={onCurrentLocation}
          loading={loading}
        />

        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${isMetric ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
            °C
          </span>
          <button
            onClick={onToggleUnits}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
                     transition-colors duration-200"
            aria-label="Toggle temperature units"
          >
            {isMetric ? (
              <ToggleLeft className="h-6 w-6" />
            ) : (
              <ToggleRight className="h-6 w-6" />
            )}
          </button>
          <span className={`text-sm font-medium ${!isMetric ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
            °F
          </span>
        </div>
      </div>
    </header>
  );
};