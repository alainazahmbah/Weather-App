import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Cloudy,
  Eye,
  EyeOff
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  code: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, code, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const getIconByCode = (code: number) => {
    // Weather condition codes mapping
    if (code === 1000) return Sun; // Sunny
    if ([1003, 1006].includes(code)) return Cloud; // Partly cloudy, Cloudy
    if ([1009, 1030, 1135, 1147].includes(code)) return Cloudy; // Overcast, Mist, Fog
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return CloudRain; // Rain
    if ([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) return CloudSnow; // Snow
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return CloudLightning; // Thunder
    if ([1150, 1153, 1168, 1171].includes(code)) return CloudDrizzle; // Drizzle
    
    return Cloud; // Default
  };

  const IconComponent = getIconByCode(code);

  return (
    <div className={`${sizeClasses[size]} ${className} text-blue-600 dark:text-blue-400`}>
      <IconComponent className="w-full h-full" />
    </div>
  );
};