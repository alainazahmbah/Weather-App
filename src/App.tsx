import React from 'react';
import { useWeather } from './hooks/useWeather';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { ForecastSection } from './components/ForecastSection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const {
    weatherData,
    loading,
    error,
    isMetric,
    loadWeatherData,
    getCurrentLocation,
    toggleUnits
  } = useWeather();

  const handleLocationSelect = (location: string) => {
    loadWeatherData(location);
  };

  const handleCurrentLocation = () => {
    getCurrentLocation();
  };

  const handleRetry = () => {
    loadWeatherData('New York');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 
                  dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <Header
        isMetric={isMetric}
        onToggleUnits={toggleUnits}
        onLocationSelect={handleLocationSelect}
        onCurrentLocation={handleCurrentLocation}
        loading={loading}
      />

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : weatherData ? (
          <>
            <WeatherCard weatherData={weatherData} isMetric={isMetric} />
            <ForecastSection weatherData={weatherData} isMetric={isMetric} />
          </>
        ) : null}
      </main>

      <footer className="text-center py-6 text-white/70">
        <p className="text-sm">
          WeatherPro - Professional Weather Application
        </p>
        <p className="text-xs mt-1">
          Powered by advanced meteorological data
        </p>
      </footer>
    </div>
  );
}

export default App;