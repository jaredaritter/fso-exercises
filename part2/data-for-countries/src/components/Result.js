import React from 'react';

const TooMany = () => <p>Too many matches, increase filter specificity</p>;

const NoMatches = () => <p>No countries match this filter criteria</p>;

const Country = ({ country }) => {
  console.log(country);
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
    </div>
  );
};

const Countries = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.numericCode}>{country.name}</li>
      ))}
    </ul>
  );
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
