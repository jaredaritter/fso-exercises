import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Result from './components/Result';

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
