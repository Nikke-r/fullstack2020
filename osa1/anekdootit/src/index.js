import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, name}) => {
    return (
        <button onClick={onClick} > {name} </button>
    )
}

const Header = ({ text }) => <h1> {text} </h1>;

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0]);

  const handleClick = () => {
      const rnd = Math.floor(Math.random() * 5);
      setSelected(rnd);
  };

  const newVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
        <Header text='Anecdote of the day' />
        {props.anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
        <Button onClick={handleClick} name='next anecdote' />
        <Button onClick={newVote} name='vote' />
        <Header text='Anecdote with most votes' />
        {props.anecdotes[votes.indexOf(Math.max(...votes))]}
        <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root'))