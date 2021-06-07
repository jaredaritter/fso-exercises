import React, { useEffect, useState } from 'react';
import People from './components/People';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import peopleService from './services/people';

const App = () => {
  // -------------------------------
  // COMPONENT STATES
  // -------------------------------
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  // -------------------------------
  // COMPONENT EFFECTS
  // -------------------------------
  // USING EFFECT HOOK TO GRAB INITIAL DATA FROM JSON-SERVER AT LOCALHOST:3001
  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      // console.log(response);
      setPeople(initialPeople);
    });
  }, []);

  // -------------------------------
  // CREATE
  // -------------------------------
  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '') {
      return alert('A name is required');
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (isInPhonebook(newName)) {
      updateNumber(personObject);
    } else {
      peopleService.create(personObject).then((returnedPerson) => {
        setPeople(people.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage({
          content: `${returnedPerson.name} added to the phonebook`,
          error: false,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  // -------------------------------
  // UPDATE
  // -------------------------------
  const updateNumber = (personObject) => {
    // IF USER WANTS TO UPDATE NUMBER OF PERSON THEN UPDATE, ELSE CANCEL
    if (
      window.confirm(
        `${personObject.name} is already in the phonebook. Replace old number with new one?`
      )
    ) {
      // PULL PERSON BASED ON CRITERIA
      const person = people.find((person) => person.name === personObject.name);
      // BUILD UPDATED VERSION OF PERSON
      const updatedPerson = { ...person, number: personObject.number };

      // SEND TO PEOPLESERVICE FOR DB UPDATE AND USE RETURNED DATA TO UPDATE APP
      peopleService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPeople(
            people.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          setNewName('');
          setNewNumber('');
          setMessage({
            content: `${returnedPerson.name}'s number updated`,
            error: false,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          // SET ERROR MESSAGE
          setMessage({
            content: `${person.name} was already deleted from the server`,
            error: true,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          // SET NOTES WITHOUT MISSING PERSON
          setPeople(people.filter((p) => p.id !== person.id));
        });
    } else {
      console.log('not updating anything');
    }
  };

  // -------------------------------
  // DELETE
  // -------------------------------
  const deletePerson = (id) => {
    const person = people.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService
        .remove(id)
        .then((response) => {
          // console.log(response);
          setPeople(people.filter((person) => person.id !== id));
          setMessage({
            content: `${person.name} removed from phonebook`,
            error: false,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            content: `Person ${id} was already removed`,
            error: true,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPeople(people.filter((person) => person.id !== id));
        });
    }
  };

  // -------------------------------
  // INPUT HANDLERS
  // -------------------------------
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // -------------------------------
  // ACCESSORY FUNCTIONS
  // -------------------------------
  const isInPhonebook = (name) => {
    const list = people.filter((person) => person.name === name);
    return list.length > 0;
  };

  const filteredPeople = people.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  // -------------------------------
  // APP
  // -------------------------------
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add a New Person</h2>
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
