import { useState } from 'react';
import Logo from './components/layout/Logo';

import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [conditions, setConditions] = useState({});

  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherApiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setConditions(result);
        });
    }
  };

  const coordHandler = () => {
    function success(position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setConditions(result);
        });
    }

    function error() {
      console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <div
      className={
        typeof conditions.main != 'undefined'
          ? conditions.main.temp < 17
            ? 'app cold'
            : 'app'
          : 'app'
      }
    >
      <main>
        <Logo />
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof conditions.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {conditions.name}, {conditions.sys.country}
              </div>
              <div className="date">
                {new Date().toDateString().slice(3, 15)}
              </div>
            </div>
            <div className="weather-box">
              <div className="temperature">
                {Math.round(conditions.main.temp)} °C
              </div>
              <div className="conditions">{conditions.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}{' '}
        <div className="button-box">
          <button className="button" onClick={coordHandler}>
            My location
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
