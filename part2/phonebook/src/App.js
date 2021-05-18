import React, { useState } from 'react';

const App = (props) => {
  const [people, setPeople] = useState(['Jared Ritter']);
  const [newName, setNewName] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <form action="">
        <div>
          name: <input type="text" />
        </div>
        <div>debug: {newName}</div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  );
};

export default App;
