import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.error) {
    return <div className="error">{message.content}</div>;
  }
  return <div className="success">{message.content}</div>;
};

export default Notification;
