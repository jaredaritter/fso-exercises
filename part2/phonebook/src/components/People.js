import React from 'react';

const Person = (props) => {
  return (
    <li>
      {props.person.name}: {props.person.number}{' '}
      <button onClick={props.deletePerson}>-</button>
    </li>
  );
};

const People = (props) => {
  return props.people.map((person) => (
    <Person
      key={person.id}
      person={person}
      deletePerson={() => props.deletePerson(person.id)}
    />
  ));
};

export default People;
