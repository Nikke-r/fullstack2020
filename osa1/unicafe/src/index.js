import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = props => <h1> {props.text} </h1>

const Button = props => <button onClick={props.onClick}> {props.name} </button>

const Statistic = ({name, count}) => {
    return (
        <tr>
            <td> {name} </td>
            <td> {count} </td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad, allRatings, sum}) => {
    return (
        <table>
            <tbody>
                <Statistic name='good' count={good} />
                <Statistic name='neutral' count={neutral} />
                <Statistic name='bad' count={bad} />
                <Statistic name='all' count={allRatings.length} />
                <Statistic name='average' count={(sum / allRatings.length).toFixed(1)} />
                <Statistic name='positive' count={((good / allRatings.length) * 100).toFixed(1) + ' %' } />
            </tbody>
        </table>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allRatings, setAll] = useState([]);
  const [sum, setSum] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allRatings.concat(1));
    setSum(sum + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(allRatings.concat(0));
    setSum(sum + 0);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(allRatings.concat(-1));
    setSum(sum - 1);
  };

  return (
    <div>
        <Header text='give feedback' />
        <Button onClick={handleGoodClick} name='good' />
        <Button onClick={handleNeutralClick} name='neutral' />
        <Button onClick={handleBadClick} name='bad' />
        <Header text='statistics' />
        {allRatings.length > 0 ?
        <Statistics 
            good={good} 
            neutral={neutral} 
            bad={bad} 
            allRatings={allRatings} 
            sum={sum} 
        /> 
        :
        <p>No feedback given</p>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));