import React, { useState } from "react";
import { SearchWeather, type Weather } from "./api/WeatherApi";
import { Moon, Sun, X } from "lucide-react";
import Loading from "./Loading";
import WeatherCard from "./WeatherCard";

const App = () => {
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (inputValue.trim().length < 2) {
      setError("Enter at least 2 symbols");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await SearchWeather(inputValue);
      setWeather(data);
    } catch (e) {
      setError("City not found");
      setWeather({} as Weather);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        isDark ? "bg-[#0f172a] text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <main
        className={`w-full max-w-[360px] p-8 rounded-[2.5rem] shadow-2xl transition-all ${
          isDark
            ? "bg-white/5 border border-white/10 backdrop-blur-md"
            : "bg-white border border-slate-200"
        }`}
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Weather</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              className={`w-full px-5 py-3.5 rounded-2xl outline-none transition-all ${
                isDark
                  ? "bg-white/5 focus:bg-white/10 border border-white/10"
                  : "bg-slate-100 focus:bg-slate-200 border-transparent"
              }`}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search city..."
            />
            {inputValue && (
              <X
                className="absolute right-4 top-4 w-5 h-5 opacity-40 cursor-pointer"
                onClick={() => setInputValue("")}
              />
            )}
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
            Get Weather
          </button>
        </form>

        <div className="mt-10 min-h-[200px] flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : (
            <WeatherCard weather={weather} error={error} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
