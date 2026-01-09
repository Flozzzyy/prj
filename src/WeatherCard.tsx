import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudDrizzle,
  CloudFog,
} from "lucide-react";
import type { Weather } from "./api/WeatherApi";

interface Props {
  weather: Weather;
  error: string | null;
}

const iconMap: Record<string, React.ReactNode> = {
  Clear: <Sun className="w-24 h-24 text-yellow-400" />,
  Clouds: <Cloud className="w-24 h-24 text-slate-400" />,
  Rain: <CloudRain className="w-24 h-24 text-blue-500" />,
  Drizzle: <CloudDrizzle className="w-24 h-24 text-cyan-400" />,
  Thunderstorm: <CloudLightning className="w-24 h-24 text-yellow-600" />,
  Snow: <Snowflake className="w-24 h-24 text-blue-200" />,
  Mist: <CloudFog className="w-24 h-24 text-slate-300" />,
  Fog: <CloudFog className="w-24 h-24 text-slate-300" />,
};

const WeatherCard = ({ weather, error }: Props) => {
  if (error)
    return <p className="text-red-500 font-medium text-center">{error}</p>;
  if (!weather.cityName) return null;

  return (
    <div className="flex flex-col items-center animate-in zoom-in duration-300">
      <h2 className="text-2xl font-semibold mb-2">{weather.cityName}</h2>
      <div className="mb-4">
        {iconMap[weather.main] || <Cloud className="w-24 h-24" />}
      </div>
      <span className="text-6xl font-bold mb-2">{weather.temp}°</span>
      <p className="text-lg opacity-70 capitalize">{weather.description}</p>
    </div>
  );
};

export default WeatherCard;
