import { useState } from "react";
// fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// style
import "./App.css";

// components
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";

import { fetchWeatherData } from "./api";
// functions
import { getUTCDatetime, transformDateFormat } from "./utilities/DatetimeUtils";
import {
  getTodayForecastWeather
} from "./utilities/DataUtils";
// images
import logo from "./assets/logo.png";
import splash from "./assets/splash-icon.svg";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [forcast, setforcast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const utcFullDate = getUTCDatetime();

  const handelOnSearchChange = async (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);
    try {
      const [weatherResponse, forcastResponse] = await fetchWeatherData(
        latitude,
        longitude
      );
      const all_today_forecasts_list = getTodayForecastWeather(
        forcastResponse,
        currentDate,
        dt_now
      );
      setTodayForecast([...all_today_forecasts_list]);
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setforcast({ city: searchData.label, ...forcastResponse });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto pt-3 pb-5 rounded-4 box">
      <div className="row px-0 px-md-4">
        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
          <img src={logo} className="img-fluid logo" alt="logo" />
          <h3 className="d-inline-block text-center white-70 lh-1 fw-semibold mb-0 date">
            {utcFullDate} GMT
          </h3>
          <a
            className="text-decoration-none"
            href="https://github.com/Safaa-Ebrahim/Weather-App"
          >
            <i className="fa-brands fa-github text-light fa-lg fa-xl github"></i>
          </a>
        </div>
        <div className="col-12">
          <Search onSearchChange={handelOnSearchChange} />
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 weather-container">
          <div className="text-light d-flex flex-column align-items-center">
            <i className="fas fa-spinner fa-spin fa-2xl mb-3"></i>
            Loading...
          </div>
        </div>
      ) : (
        <div>
          {!currentWeather && !forcast ? (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 weather-container">
              <img
                src={splash}
                className="img-fluid splash-icon"
                alt="splash-icon"
              />
              <h4 className="text-center text-light fw-normal my-4">
                Explore current weather data and 6-day forecast of more than
                200,000 cities!
              </h4>
            </div>
          ) : (
            <div className="d-flex flex-column flex-md-row weather-container px-0 px-md-4 pt-5">
              <div className="container px-4 px-md-3">
                {currentWeather && <CurrentWeather data={currentWeather} forecastList={todayForecast}/>}
              </div>
              <div className="container px-4 px-md-3 pt-5 pt-md-0">
                {forcast && <Forecast data={forcast} />}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
