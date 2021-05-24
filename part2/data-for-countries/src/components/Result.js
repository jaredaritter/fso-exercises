import React, { useEffect, useState } from 'react';
import ShowButton from './ShowButton';
import axios from 'axios';

const TooMany = () => <p>Too many matches, increase filter specificity</p>;

const NoMatches = () => <p>No countries match this filter criteria</p>;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  // console.log(country);
  const effectHook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  };

  useEffect(effectHook, []);

  console.log(weather);
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
};

const Countries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState({});
  // console.log(countries);

  const handleClick = (e) => {
    // console.log(e.target.parentElement.id);
    const country = countries.filter(
      (country) => country.name === e.target.parentElement.id
    );
    setCountry(country[0]);
    setShowCountry(!showCountry);
  };

  if (showCountry) {
    return <Country country={country} />;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li id={country.name} key={country.numericCode}>
            {country.name} <ShowButton handleClick={handleClick} />
          </li>
        ))}
      </ul>
    );
  }
};

const Result = ({ countries }) => {
  if (countries.length > 10) {
    return <TooMany />;
  } else if (countries.length < 1) {
    return <NoMatches />;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <Countries countries={countries} />;
  }
};

export default Result;
