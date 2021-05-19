import React from 'react';

const Person = (props) => {
  return (
    <li>
      {props.person.name}: {props.person.number}
    </li>
  );
};

const People = (props) => {
  return props.people.map((person) => (
    <Person key={person.name} person={person} />
  ));
};

export default People;
