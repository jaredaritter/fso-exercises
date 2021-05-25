import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country, handleClick }) => {
  const [weather, setWeather] = useState({});
  const [handlerExists] = useState(handleClick ? true : false);
  // console.log(country.capital);
  const effectHook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  };

  useEffect(effectHook, [country.capital]);

  // console.log(weather);
  if (handlerExists) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`flag of ${country.name}`} width="200" />
        <h2>{`Weather in ${country.capital}`}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature}&#8451;
        </p>
        <img src={weather.weather_icons} alt="Weather icon" />
        <p>
          <strong>wind:</strong> {weather.wind_speed} kph direction{' '}
          {weather.wind_dir}
        </p>
        <button onClick={handleClick}>remove</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`flag of ${country.name}`} width="200" />
        <h2>{`Weather in ${country.capital}`}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature}&#8451;
        </p>
        <img src={weather.weather_icons} alt="Weather icon" />
        <p>
          <strong>wind:</strong> {weather.wind_speed} kph direction{' '}
          {weather.wind_dir}
        </p>
      </div>
    );
  }
};

export default Country;
