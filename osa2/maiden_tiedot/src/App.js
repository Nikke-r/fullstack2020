import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Results from './components/Results';

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const showCountries = filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : countries;

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  return (
    <div>
      <Filter filter={filter} handleSearch={handleSearch} />
      <Results countries={showCountries} setFilter={setFilter} />
    </div>
  );
}

export default App;
