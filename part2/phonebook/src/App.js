import React, { useState } from 'react';

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
  const [search, setSearch] = useState('');

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

  const filteredPeople = people.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  console.log(filteredPeople);

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      <h2>Add New</h2>
      <form action="" onSubmit={addPerson}>
        <div>
          name:{' '}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input type="tel" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  );
};

export default App;
