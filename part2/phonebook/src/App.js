import React, { useEffect, useState } from 'react';
import People from './components/People';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // USING EFFECT HOOK TO GRAB INITIAL DATA FROM JSON-SERVER AT LOCALHOST:3001
  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      // console.log(response);
      setPeople(initialPeople);
    });
  }, []);

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
      peopleService.create(personObject).then((returnedPerson) => {
        setPeople(people.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const isInPhonebook = (name) => {
    const list = people.filter((person) => person.name === name);
    return list.length > 0;
  };

  const deletePerson = (id) => {
    const person = people.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService
        .remove(id)
        .then((response) => {
          // console.log(response);
          setPeople(people.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Person ${id} already removed`);
          setPeople(people.filter((person) => person.id !== id));
        });
    }
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
      <People people={filteredPeople} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
