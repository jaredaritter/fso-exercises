import React, { useState } from 'react';
import People from './components/People';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Jared Ritter', number: '555-555-5555' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '') {
      alert('A name is required');
    } else if (isInPhonebook(newName)) {
      alert(`${newName} is already in the phone book`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPeople(people.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const isInPhonebook = (name) => {
    const list = people.filter((person) => person.name === name);
    return list.length > 0;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPeople = people.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add a New</h2>
      <PersonForm
        addPerson={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  );
};

export default App;
