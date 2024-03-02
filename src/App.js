import "./App.css";
import { useEffect, useState, useRef } from "react";
import Weather from "./components/Weather";

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
    alert("Place not found");
  }
};

function App() {
  const [weather, setWeather] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [place, setPlace] = useState();

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
      let url;

      if (place) {
        url = `${baseUrl}/forecast.json?key=${apiKey}&q=${place}&days=7`;
      } else {
        url = `${baseUrl}/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`;
      }

      const data = await getData(url);
      setWeather(data);
    };

    getWeatherInfo();
  }, [latitude, longitude, place]);

  console.log(weather);

  const input = useRef();

  const getInputValue = () => {
    const val = input.current.value;

    if (val === "") {
      alert("Please enter a place");
    }
    setPlace(val);
  };

  return (
    <div className="App">
      <div className="container">
        {typeof weather !== "undefined" ? (
          <Weather
            info={weather}
            hour={hour}
            minute={minute}
            now={now}
            inputRef={input}
            searchBtnClick={getInputValue}
          />
        ) : (
          <h1>Error! Pls allow location or refresh</h1>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default App;
