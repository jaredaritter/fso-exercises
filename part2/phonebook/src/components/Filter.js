import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter shown with{' '}
      <input type="text" value={props.filter} onChange={props.handleChange} />
    </div>
  );
};

export default Filter;
