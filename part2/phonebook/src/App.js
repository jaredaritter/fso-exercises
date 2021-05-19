import React, { useState } from 'react';

const Person = (props) => {
  return <li>{props.person.name}</li>;
};

const People = (props) => {
  return props.people.map((person) => (
    <Person key={person.name} person={person} />
  ));
};

const App = () => {
  const [people, setPeople] = useState([{ name: 'Jared Ritter' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (isInPhonebook(newName)) {
      alert(`${newName} is already in the phone book`);
    } else {
      const personObject = {
        name: newName,
      };
      setPeople(people.concat(personObject));
      setNewName('');
    }
  };

  const isInPhonebook = (name) => {
    const list = people.filter((person) => person.name === name);
    return list.length > 0;
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form action="" onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={handleChange} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={people} />
    </div>
  );
};

export default App;
