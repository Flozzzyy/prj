const KEY = "7e03d24105b74a5369238d42eb900e35";

export interface Weather {
  temp: number;
  description: string;
  cityName: string;
  main: string; // Добавили для иконок
}

interface IWeatherRaw {
  main: { temp: number };
  weather: Array<{ description: string; main: string }>;
  name: string;
}

export const SearchWeather = async (city: string): Promise<Weather> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`
  );

  if (!res.ok) throw new Error("City not found");

  const data: IWeatherRaw = await res.json();

  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    cityName: data.name,
    main: data.weather[0].main,
  };
};
