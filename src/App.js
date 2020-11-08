import React, { useState } from "react";
import "./App.css";
import { GoLocation } from "react-icons/go";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.url}weather?q=${query},US&units=imperial&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  let d = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutes = d.getMinutes();
  let hours = d.getHours();
  let dayOfWeek = daysOfWeek[d.getDay()];
  let day = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes + " " + ampm;

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 72
            ? "bg warm"
            : "bg cold"
          : "bg"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                <GoLocation size={31} color="#a33a33" />
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dayOfWeek}</div>
              <div className="date">
                {day} {month} {year}
              </div>
              <div className="time">{time}</div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "70px",
                  justifyContent: "space-around",
                }}
              >
                <div className="display-container">
                  <span className="display-name">Temperature</span>
                  <br />
                  <span>{Math.round(weather.main.temp)}°F</span>
                </div>
                <div className="display-container">
                  <span className="display-name">
                    {weather.weather[0].main}
                  </span>
                  <br />
                  <span>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="display-container">
                  <span className="display-name">Humidity</span>
                  <br />
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="display-container">
                  <span className="display-name">Wind</span>
                  <br />
                  <span>
                    {Math.round(weather.wind.speed)}
                    <span style={{ fontSize: "20px" }}>mph</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
