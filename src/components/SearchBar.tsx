import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import { useLocationSearch } from '../hooks/useWeather';
import { SearchLocation } from '../types/weather';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onLocationSelect, 
  onCurrentLocation, 
  loading = false 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { locations, searchLoading, searchLocationsByQuery, clearSearch } = useLocationSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    searchLocationsByQuery(value);
  };

  const handleLocationClick = (location: SearchLocation) => {
    setQuery(location.name);
    setIsOpen(false);
    clearSearch();
    onLocationSelect(location.name);
  };

  const handleCurrentLocationClick = () => {
    onCurrentLocation();
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a city..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl 
                   bg-white/80 backdrop-blur-sm placeholder-gray-500 text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200"
        />
        <button
          onClick={handleCurrentLocationClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 
                   hover:text-blue-600 transition-colors duration-200"
          title="Use current location"
        >
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (query.length > 0 || locations.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-sm rounded-xl 
                      shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {searchLoading ? (
            <div className="px-4 py-3 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : locations.length > 0 ? (
            <div className="py-1">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors 
                           duration-150 flex items-center space-x-3"
                >
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-medium">{location.name}</div>
                    <div className="text-gray-500 text-sm">
                      {location.region}, {location.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="px-4 py-3 text-center text-gray-500">
              No locations found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};