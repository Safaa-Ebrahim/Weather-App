import React from "react";
import { getDayMonthFromDate } from "../../utilities/DatetimeUtils";

// style
import style from "./currentWeather.module.css";

import humidity from "../../assets/humidity.svg";
import clouds from "../../assets/clouds.svg";

const CurrentWeather = ({ data, forecastList }) => {
  const dayMonth = getDayMonthFromDate();
  return (
    <div className={`text-white`}>
      <h5 className={`fw-semibold text-center lh-1 white-70 ${style.title}`}>
        CURRENT WEATHER
      </h5>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <p className={`${style.topParag} m-0 lh-1 fw-semibold mb-2`}>
            {data.city}
          </p>
          <p className={`${style.bottomParag} m-0 white-70 fw-normal lh-1`}>
            Today {dayMonth}
          </p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <p className={`${style.topParag} m-0 lh-1 fw-semibold mb-2`}>
            {Math.round(data.main.temp)}°C
          </p>
          <p className={`${style.bottomParag} m-0 white-70 fw-normal lh-1`}>
            {data.weather[0].description}
          </p>
        </div>
        <div
          className={`${style["weather-icon"]} d-flex justify-content-center align-items-center`}
        >
          <img
            className={`d-flex justify-content-center align-items-center h-auto`}
            src={require(`../../assets/icons/${data.weather[0].icon}.png`)}
            alt="weather"
          />
        </div>
      </div>
      <h5
        className={`fw-semibold text-center lh-1 white-70 mb-3 ${style.title}`}
      >
        AIR CONDITIONS
      </h5>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <div className="d-flex flex-column flex-md-row align-items-center mb-3 white-70">
            <i
              className={`fa-solid fa-temperature-half ${style.airLogo} me-0 me-md-1 mb-2 mb-md-0`}
            ></i>
            <p className={`${style.bottomParag} m-0 fw-normal lh-1`}>
              Real Feel
            </p>
          </div>
          <p className={`${style.topParag} m-0 lh-1 fw-semibold`}>
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <div className="d-flex flex-column flex-md-row align-items-center mb-3 white-70">
            <i
              className={`fa-solid fa-wind ${style.airLogo} me-0 me-md-1 mb-2 mb-md-0`}
            ></i>
            <p className={`${style.bottomParag} m-0 fw-normal lh-1`}>Wind</p>
          </div>
          <p className={`${style.topParag} m-0 lh-1 fw-semibold`}>
            {data.wind.speed}m/s
          </p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <div className="d-flex flex-column flex-md-row align-items-center mb-3">
            <img
              src={clouds}
              alt="clouds"
              className={`${style.airLogo} me-0 me-md-1 mb-2 mb-md-0`}
            />
            <p className={`${style.bottomParag} m-0 fw-normal lh-1 white-70`}>
              Clouds
            </p>
          </div>
          <p className={`${style.topParag} m-0 lh-1 fw-semibold`}>
            {data.clouds.all} %
          </p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <div className="d-flex flex-column flex-md-row align-items-center mb-3">
            <img
              src={humidity}
              alt="humidity"
              className={`${style.airLogo} me-0 me-md-1 mb-2 mb-md-0`}
            />
            <p className={`${style.bottomParag} m-0 fw-normal lh-1 white-70`}>
              Humidity
            </p>
          </div>
          <p className={`${style.topParag} m-0 lh-1 fw-semibold`}>
            {data.main.humidity} %
          </p>
        </div>
      </div>
      <h5 className={`fw-semibold text-center lh-1 white-70 ${style.title}`}>
        TODAY'S FORECAST
      </h5>
      <h5 className={`text-center lh-1 fw-normal mb-2 ${style.avaliable}`}>
        {forecastList.length === 1
          ? "1 available forecast"
          : `${forecastList.length} available forecasts`}
      </h5>
      {forecastList.length === 0 ? (
        <div className="my-3 mx-auto text-center border border-danger text-danger rounded-3 py-3 w-75">
          No available forecasts for tonight.
        </div>
      ) : (
        <div className={`row justify-content-center ${style.todayForecast}`}>
          {forecastList.map((item, index) => (
            <div
              className={`col-5 col-sm-4 col-lg-3 d-flex flex-column align-items-center mb-2 mb-md-0`}
              key={index}
            >
              <div
                className={`w-fit text-center w-100 py-1 rounded-3`}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
                  background:
                    index % 2 !== 0
                      ? `rgba(255, 255, 255, 0.05)`
                      : `rgba(171, 203, 222, 0.3)`,
                  backgroundImage:
                    index % 2 === 0 &&
                    `linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(171, 203, 222, 0.05) 100%)`,
                }}
              >
                <h3 className={`m-0 white-70 fw-normal p-1 ${style.time}`}>
                  {item.time}
                </h3>
                <div className="p-1">
                  <img
                    src={require(`../../assets/icons/${item.icon}.png`)}
                    alt="weather-icon"
                    className={`${style.icon}`}
                  />
                </div>
                <h3 className={`m-0 mb-2 fw-semibold ${style.temp}`}>
                  {item.temperature}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
