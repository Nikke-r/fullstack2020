import React from 'react';
import Exact from './Exact';

const Results = ({ countries, setFilter }) => {

    if (countries.length === 1) {
        return (
            <Exact country={countries[0]} />
        )
    } else if (countries.length <= 10) {
        return (
            <ul>
                {countries.map((country, i) => {
                    return (
                        <li key={i}> {country.name} <button onClick={() => setFilter(country.name)}>show</button> </li>
                    )
                })}
            </ul>
        )
    } else {
        return (
            <p>Too many results</p>
        )
    }
}

export default Results;
