import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const Result = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, increase filter specificity</p>;
  } else if (countries.length < 1) {
    return <p>No countries match this filter criteria</p>;
  } else if (countries.length === 1) {
    return <h2>{countries[0].name}</h2>;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.numericCode}>{country.name}</li>
        ))}
      </ul>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    // console.log(e.target.value);
    setFilter(e.target.value);
  };

  const effectHook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(effectHook, []);

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Result countries={filteredCountries} />
    </>
  );
};

export default App;
