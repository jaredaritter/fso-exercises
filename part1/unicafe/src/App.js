import React, { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <>
      <Header title="Statistics" />
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic
            text="all"
            value={props.good + props.neutral + props.bad}
          />
          <Statistic
            text="average"
            value={
              (props.good - props.bad) /
              (props.good + props.neutral + props.bad)
            }
          />
          <Statistic
            text="positive"
            value={
              (props.good / (props.good + props.neutral + props.bad)) * 100
            }
          />
        </tbody>
      </table>
    </>
  );
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Header = (props) => {
  return <h2>{props.title}</h2>;
};

export default App;
