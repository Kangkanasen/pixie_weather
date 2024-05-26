import React from "react";
import Compass from './compass';
import Humidity from './humidity';
import PressureGauge from './PressureGauge';
import './WeatherReport.css';
import SunCalc from 'suncalc';
import { ReactComponent as Location } from './icons/location-icon.svg';
import { ReactComponent as Haze } from './icons/haze.svg';
import { ReactComponent as FewDay } from './icons/few-day.svg';
import { ReactComponent as FewNight } from './icons/few-night.svg';
import { ReactComponent as ScatteredDay } from './icons/scattered-day.svg';
import { ReactComponent as ScatteredNight } from './icons/scattered-night.svg';
import { ReactComponent as Broken } from './icons/broken-clouds.svg';
import { ReactComponent as ClearNight } from './icons/clear.svg';
import { ReactComponent as ClearDay } from './icons/sunny.svg';
import { ReactComponent as Clouds } from './icons/cloudy.svg';
import { ReactComponent as Drizzle } from './icons/drizzle.svg';
import { ReactComponent as Rain } from './icons/rain.svg';
import { ReactComponent as Thunderstorm } from './icons/thunderstorm.svg';
import { ReactComponent as Snow } from './icons/snow.svg';
import { ReactComponent as Sunrise } from './icons/sunrise.svg';
import { ReactComponent as Sunset } from './icons/sunset.svg';

const WeatherReport = ({ weatherData, forecastData }) => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0 || !forecastData) {
        // Return null or some placeholder if weather data or forecast data is not available
        return null;
    }

    // Function to get the day of the week from a date string (e.g., "2024-05-13" -> "Sun")
    const getDayOfWeek = (dateString) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    // Group forecast data by day
    const groupedForecastData = forecastData.list.reduce((acc, forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(forecast);
        return acc;
    }, {});



    // Determine if it's day or night based on sunrise and sunset timestamps
    const currentTime = SunCalc.getTimes(new Date(),weatherData.coord.lat,weatherData.coord.lon); // Convert milliseconds to seconds
    const isDayTime = currentTime >= weatherData.sys.sunrise && currentTime < weatherData.sys.sunset;

    // Mapping of weather descriptions to corresponding icons
    const weatherIcons = {
        "haze": Haze,
        "mist": Haze,
        "fog": Haze,
        "smoke": Haze,
        "few clouds": isDayTime ? FewDay : FewNight,
        "scattered clouds": isDayTime ? ScatteredDay : ScatteredNight,
        "broken clouds": Broken,
        "overcast clouds": Clouds,
        "clouds": Clouds,
        "clear sky": isDayTime ? ClearDay : ClearNight,
        "mostly sunny": isDayTime ? ClearDay : ClearNight,
        "drizzle": Drizzle,
        "light intensity drizzle": Drizzle,
        "light rain": Drizzle,
        "moderate rain": Rain,
        "rain": Rain,
        "heavy intensity rain":Rain,
        "thunderstorm": Thunderstorm,
        "snow": Snow,
        "sleet": Snow,
        "hail": Snow,
    };

    const WeatherIcon = weatherIcons[weatherData.weather[0].description.toLowerCase()];

    // Format sunrise and sunset time
    const formatTime = (timestamp) => {
        let d = new Date(timestamp*1000);
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const date = new Date(utc+(weatherData.timezone*1000));
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div className="weather-data">
            <div>
                <h2 className="location"><Location /> {weatherData.name}</h2>
                <div className="row1">
                    <div className="report">
                        <span>{Math.round(weatherData.main.temp)}°C</span>
                        <p>H: {Math.round(weatherData.main.temp_min)} L: {Math.round(weatherData.main.temp_max)}</p>

                    </div>
                    <div className="weather-icon">
                        {WeatherIcon && <WeatherIcon />}
                        <p>{weatherData.weather[0].description}</p>
                    </div>
                </div>
                <div className="row2">
                    {Object.keys(groupedForecastData).map(date => {
                        const forecasts = groupedForecastData[date];
                        const mainTempOfDay = forecasts.reduce((acc, forecast) => acc + forecast.main.temp, 0) / forecasts.length;
                        const dayOfWeek = getDayOfWeek(date);
                        const WeatherIcon = weatherIcons[forecasts[0].weather[0].description.toLowerCase()];
                        return (
                            <div key={date} className="forecast-item">
                                <span>{dayOfWeek}</span>
                                <div className="weather-icons">
                                {WeatherIcon && <WeatherIcon />}
                                </div>
                                <h2>{Math.round(mainTempOfDay)}°C</h2>
                            </div>
                        );
                    })}
                </div>
                <div className="row3">
                    <div className="box"><span>HUMIDITY</span><Humidity humidity={weatherData.main.humidity} /><h2>{weatherData.main.humidity}%</h2></div>
                    <div className="box"><span>PRESSURE</span><PressureGauge pressure={weatherData.main.pressure} /><h2>{weatherData.main.pressure} hPa</h2></div>
                    <div className="card">
                        <div className="col"><span>CLOUDS</span><h2> {weatherData.clouds.all}%</h2></div>
                        <div className="col two"><span>FEELS LIKE</span><h2>{Math.round(weatherData.main.feels_like)}°C</h2></div>
                    </div>
                    <div className="box"><span>SUNRISE</span><Sunrise /><h2>{formatTime(weatherData.sys.sunrise)}</h2></div>
                    <div className="box"><span>SUNSET</span><Sunset /><h2>{formatTime(weatherData.sys.sunset)}</h2></div>
                    <div className="box">
                        <span>WIND SPEED</span>
                        <Compass degree={weatherData.wind.deg} />
                        <h2>{weatherData.wind.speed} km/h</h2></div>
                </div>
            </div>
        </div>
    );
};

export default WeatherReport;
