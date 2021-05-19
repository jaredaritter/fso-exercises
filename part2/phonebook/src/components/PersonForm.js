import React from 'react';

const Name = (props) => {
  return (
    <div>
      name:{' '}
      <input
        type="text"
        value={props.nameValue}
        onChange={props.handleNameChange}
      />
    </div>
  );
};

const Number = (props) => {
  return (
    <div>
      number:{' '}
      <input
        type="tel"
        value={props.numberValue}
        onChange={props.handleNumberChange}
      />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form action="" onSubmit={props.addPerson}>
      <Name
        nameValue={props.nameValue}
        handleNameChange={props.handleNameChange}
      />
      <Number
        numberValue={props.numberValue}
        handleNumberChange={props.handleNumberChange}
      />
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
