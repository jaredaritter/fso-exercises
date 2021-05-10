import React, { useState } from 'react';

// --------------------
// APP COMPONENT
// --------------------
function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const zeroFilledArr = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(zeroFilledArr);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const mostVotesIndex = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  const handleNextClick = () => {
    const num = getRandomInt(anecdotes.length);
    console.log(num);
    setSelected(num);
  };

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    console.log(copy);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} />
      <Votes amount={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <Header text="Anecdote with the most votes" />
      <Anecdote text={anecdotes[mostVotesIndex]} />
      <Votes amount={votes[mostVotesIndex]} />
    </>
  );
}

// --------------------------
// OTHER COMPONENTS
// --------------------------
const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Anecdote = (props) => {
  return <p>{props.text}</p>;
};

const Votes = (props) => {
  if (!props.amount) {
    return <p>has zero votes</p>;
  }
  return <p>has {props.amount} votes</p>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

export default App;
