import React, { useState } from 'react';

import ShowButton from './ShowButton';
import Country from './Country';

const Countries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState({});
  // console.log(countries);

  const handleClick = (e) => {
    // console.log(e.target.parentElement.id);
    if (e.target.parentElement.id) {
      const country = countries.filter(
        (country) => country.name === e.target.parentElement.id
      );
      setCountry(country[0]);
      setShowCountry(!showCountry);
      // console.log('show');
    } else {
      setShowCountry(!showCountry);
      // console.log('remove');
    }
  };

  if (showCountry) {
    return <Country country={country} handleClick={handleClick} />;
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

export default Countries;
