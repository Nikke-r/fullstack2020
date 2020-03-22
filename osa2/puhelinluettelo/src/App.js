import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons';
import './index.css';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ message, setMessage ] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const showContacts =  search ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) : persons;

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name.toLowerCase().includes(newName.toLowerCase()))) {
      if (window.confirm(`Person ${newName} already exists on the phonebook. Do you want to update the number?`)) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const changedPerson = {...person, number: newNumber};
        const id = person.id;
        personServices
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
            setMessage({success: `Person ${returnedPerson.name} updated!`});
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(error => {
            setMessage({error: `Person has been removed before editing. Please refresh the page and add again`});
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personServices
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
          setMessage({success: `Person ${person.name} added to phonebook!`});
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(error => {
          setMessage({error: error});
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
    }


  }

  const removePerson = id => {
    if (window.confirm('Are you sure you want to delete this?')) {
      personServices
      .deletePerson(id)
      .then(() => {
        const personsAfter = persons.filter(person => person.id !== id);
        setPersons(personsAfter);
      })
      .catch(error => {
        setMessage([{error: error}]);
        setTimeout(() => {
          setMessage([]);
        }, 5000);
      })
    }
  }

  useEffect(() => {
    personServices
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <Notification message={message} />
      <h2>add a new</h2>
      <PersonForm 
        addNewPerson={addNewPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}  
      />
      <h2>Numbers</h2>
      <Persons showContacts={showContacts} remove={removePerson} />
    </div>
  )

}

export default App
