import { useState } from "react";
import Nav from "./Nav";
import sunrise from "../images/sunrise.png";
import sunset from "../images/sunset.png";
import rain from "../images/raining.png";
import sun from "../images/sun.png";
import humidity from "../images/humidity.png";
import visibility from "../images/visibility.png";
import wind from "../images/wind.png";

const Today = ({ info }) => {
  return (
    <div className="today">
      <h1>Today's Highlights</h1>
      <div className="info-cards">
        <div className="uv card">
          <p className="card-title">UV Index</p>
          <div className="card-info-container">
            <img src={sun} alt="sun" />
            <p className="card-info">{info.current.uv}</p>
          </div>
        </div>
        <div className="wind-status card">
          <p className="card-title">Wind Status</p>
          <div className="card-info-container">
            <img src={wind} alt="wind" />
            <p className="card-info">{info.current.wind_kph} km/h</p>
          </div>
        </div>
        <div className="sun card">
          <p className="card-title">Sunrise & Sunset</p>
          <div className="sunrise">
            <img src={sunrise} alt="sunrise logo" />
            <p>{info.forecast.forecastday[0].astro.sunrise}</p>
          </div>
          <div className="sunset">
            <img src={sunset} alt="sunset logo" />
            <p>{info.forecast.forecastday[0].astro.sunset}</p>
          </div>
        </div>
        <div className="humidity card">
          <p className="card-title">Humidity</p>
          <div className="card-info-container">
            <img src={humidity} alt="humidity" />
            <p className="card-info">{info.current.humidity}%</p>
          </div>
        </div>
        <div className="visibility card">
          <p className="card-title">Visibility</p>
          <div className="card-info-container">
            <img src={visibility} alt="visibility" />
            <p className="card-info">{info.current.vis_km} km</p>
          </div>
        </div>
        <div className="rain card">
          <p className="card-title">Chance of Rain</p>
          <div className="card-info-container">
            <img src={rain} alt="rain" />
            <p className="card-info">
              {info.forecast.forecastday[0].day.daily_chance_of_rain}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Week = ({ info, celcius }) => {
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="week">
      {info.forecast.forecastday.map((item) => {
        const date = new Date(item.date);
        return (
          <div className="week-card" key={item.date}>
            <p>{week[date.getDay()]}</p>
            <img src={item.day.condition.icon} alt="icon" />
            <p>
              {celcius ? item.day.maxtemp_c + "°" : item.day.maxtemp_f + "°"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const Weather = ({ info, hour, minute, now, inputRef, searchBtnClick }) => {
  const [celcius, setCelcius] = useState(true);
  const [page, setPage] = useState("today");

  return (
    <>
      <div className="weather-container">
        <div className="weather-card">
          <div className="search-container">
            <span
              className="material-symbols-outlined search-btn"
              onClick={searchBtnClick}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search for places..."
              ref={inputRef}
            />
          </div>
          <div className="weather-info">
            <div className="img-container">
              <img
                src={info.current.condition.icon}
                id="weather-img"
                alt="img"
              />
            </div>
            <span className="temperature">
              {celcius ? info.current.temp_c : info.current.temp_f}
              <span className="celcius">{celcius ? "℃" : "℉"}</span>
            </span>
            <p className="time">
              <strong>{now}</strong>, {hour}:{minute}
            </p>
            <hr />
            <p className="weather-condition">{info.current.condition.text}</p>
            <div className="place-container">
              <p className="place">
                {info.location.name}, {info.location.country}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="more-info-container">
        <div className="more-info">
          <Nav setCelcius={setCelcius} setPage={setPage} />
          {page === "today" ? (
            <Today info={info} />
          ) : (
            <Week info={info} celcius={celcius} />
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
