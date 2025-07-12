import React from 'react';
import { AlertCircle, RefreshCw, Settings } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const isApiKeyError = message.includes('API key') || message.includes('not configured');
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          {isApiKeyError ? (
            <Settings className="h-8 w-8 text-red-600 dark:text-red-400" />
          ) : (
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isApiKeyError ? 'Configuration Required' : 'Something went wrong'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        
        {isApiKeyError && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              To enable real weather data:
            </h4>
            <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>1. Sign up at <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="underline">WeatherAPI.com</a></li>
              <li>2. Get your free API key</li>
              <li>3. Add it to your .env file as VITE_WEATHER_API_KEY</li>
              <li>4. Restart the development server</li>
            </ol>
          </div>
        )}
        
        {onRetry && !isApiKeyError && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white 
                     rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};