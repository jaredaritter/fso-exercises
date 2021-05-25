import React from 'react';

import TooMany from './TooMany';
import NoMatches from './NoMatches';
import Country from './Country';
import Countries from './Countries';

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
