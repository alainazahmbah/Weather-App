import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading weather data...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Getting the latest conditions for you
        </p>
      </div>
    </div>
  );
};