import React from "react";
import style from "./forecast.module.css";

import humidity from "../../assets/humidity.svg";
import clouds from "../../assets/clouds.svg";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );
  const forecastList = data.list.splice(0, 6);

  return (
    <div className="text-white">
      <h5 className="fw-semibold text-center lh-1 white-70 title">
        WEEKLY FORECAST
      </h5>

      {forecastList.map((item, idx) => {
        return (
          <div className="d-flex flex-column gap-2 w-100" key={idx}>
            <div className={`row align-items-center mb-1 ${style.box}`}>
              <div
                className={`col-4 d-flex flex-column align-items-start ps-2 ps-md-4`}
              >
                <p
                  className={`fw-semibold d-flex align-items-center m-0 ${style.day} h-31`}
                >
                  {forecastDays[idx]}
                </p>
                <div className="h-31 d-flex align-items-center justify-content-center">
                  <img
                    src={require(`../../assets/icons/${item.weather[0].icon}.png`)}
                    alt="weather_icon"
                    className={`${style["weather_icon"]} me-1`}
                  />
                  <h4 className={`fw-normal m-0 ${style.description}`}>
                    {item.weather[0].description}
                  </h4>
                </div>
              </div>

              <div
                className={`col-4 d-flex flex-column align-items-center justify-content-center`}
              >
                <div className="h-31 d-flex align-items-center justify-content-center">
                  <i
                    className={`fa-solid fa-temperature-half white-70 me-1 ${style.airLogo}`}
                  ></i>
                  <p className={`m-0 fw-semibold ${style.day}`}>
                    {Math.round(item.main.temp)} °C
                  </p>
                </div>
                <div className="h-31 d-flex align-items-center justify-content-center">
                  <img
                    src={clouds}
                    alt="clouds"
                    className={`${style.airLogo} white-70 me-2`}
                  />
                  <p className={`m-0 fw-semibold ${style.day}`}>
                    {item.clouds.all} %
                  </p>
                </div>
              </div>

              <div
                className={`col-4 d-flex flex-column align-items-end justify-content-center pe-md-4`}
              >
                <div className="h-31 d-flex align-items-center justify-content-center">
                  <i
                    className={`fa-solid fa-wind  white-70 ${style.airLogo} me-1`}
                  ></i>
                  <p className={`m-0 fw-semibold ${style.day}`}>
                    {item.wind.speed} m/s
                  </p>
                </div>
                <div className="h-31 d-flex align-items-center justify-content-center me-2">
                  <img
                    src={humidity}
                    alt="humidity"
                    className={`${style.airLogo} white-70 me-2`}
                  />
                  <p className={`m-0 fw-semibold ${style.day}`}>
                    {item.main.humidity} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
