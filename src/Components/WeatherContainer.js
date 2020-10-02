import React, { useState } from "react";
import "../Styles/Weather.css";
import WeatherInfo from "./WeatherInfo";

function WeatherContainer() {
  const API_KEY = "eb7ed06915a8414a6745dc2741a2cd5a";
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null,
  });
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  function updateSearchQuery(event) {
    let zipCode = event.target.value;
    let isValid = ValidateZipCode(zipCode);
    setSearchQuery(zipCode);
    if (isValid || zipCode == "" || isValid.length === 5) {
      setIsValidZipCode(true);
    } else {
      setIsValidZipCode(false);
    }
  }

  function ValidateZipCode(zipCode) {
    let regex = /[0-9]{5}/;
    return regex.test(zipCode);
  }

  function getWeatherData() {
    if (!isValidZipCode || searchQuery === "") {
      setIsValidZipCode(false);
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        setWeatherData({
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].main,
          city: data.name,
        })
      );
  }

  return (
    <section className="weather-container">
      <header className="weather-header">
        <h3>Weather App</h3>
        <div>
          <input
            placeholder="Zip Code"
            className="search-input"
            onChange={updateSearchQuery}
            maxLength="5"
          />
          <button onClick={getWeatherData} className="material-icons">
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidZipCode ? "" : "Invalid Zip Code"}</p>
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No Weather to Display<i className="material-icons">wb_sunny</i>
          </p>
        ) : (
          <WeatherInfo data={weatherData} />
        )}
      </section>
    </section>
  );
}

export default WeatherContainer;
