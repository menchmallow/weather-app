import "./App.css";
import { useEffect, useState } from "react";

const baseUrl = " http://api.weatherapi.com/v1";
const apiKey = "ce304afefbb042a8875113054242802";

const getData = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const json = response.json();
      return json;
    }
  } catch (err) {
    console.log(err);
  }
};

const Weather = ({ info, hour, minute, now }) => {
  return (
    <>
      <div className="weather-container">
        <div className="search-container">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search for places..." />
        </div>
        <div className="weather-card">
          <div className="img-container">
            <img src={info.current.condition.icon} id="weather-img" alt="img" />
          </div>
          <span className="temperature">
            {info.current.temp_c}
            <span className="celcius">°C</span>
          </span>
          <p className="time">
            <strong>{now}</strong>, {hour}:{minute}
          </p>
          <hr />
          <p className="weather-condition">{info.current.condition.text}</p>
          <div className="place-container">
            <p className="place">{info.location.name}</p>
          </div>
        </div>
      </div>
      <div className="more-info-container">
        <div className="more-info">
          <nav>
            <div className="links">
              <a href="/">Today</a>
              <a href="/week">Week</a>
            </div>
            <div className="temp-mode">
              <button>°C</button>
              <button>°F</button>
            </div>
          </nav>
          <div>
            <h1>Today's Highlights</h1>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [weather, setWeather] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const now = week[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    });
  }, [latitude, longitude]);

  useEffect(() => {
    const getWeatherInfo = async () => {
      const url = `${baseUrl}/current.json?key=${apiKey}&q=${latitude},${longitude}`;
      const data = await getData(url);
      setWeather(data);
    };

    getWeatherInfo();
  }, [latitude, longitude]);

  console.log(weather);

  return (
    <div className="App">
      <div className="container">
        {typeof weather !== "undefined" ? (
          <Weather info={weather} hour={hour} minute={minute} now={now} />
        ) : (
          <h1>Error! Pls allow location or refresh</h1>
        )}
      </div>
    </div>
  );
}

export default App;
