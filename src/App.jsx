import React, { useState, useEffect } from "react";
import WeatherReport from "./WeatherReport";
import ToggleSwitch from "./Toggle";
import "./ToggleSwitch.css";
import Loader from "./components/search/Loader";
import { ReactComponent as Pixieweather } from './icons/Pixieweather.svg';
import { ReactComponent as Logo } from './icons/logo1st-half.svg';
import SearchBar from "./components/search/SearchBar";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const WEATHER_API_KEY = "e796251383175bcabd4d38956086e3ea";

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 3 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      // After fetching weather data, also fetch forecast data
      fetchForecastData(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      
    }
    setIsLoading(false);
  };

  const fetchForecastData = async (list) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${list}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div className="App">
      <div className="Nav">
        <div className="logo">
          <Logo />
          <Pixieweather className="pixie"/>
        </div>
        <SearchBar onSearch={fetchWeatherData} />
        <ToggleSwitch />
      </div>
      <WeatherReport weatherData={weatherData} forecastData={forecastData} />
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
