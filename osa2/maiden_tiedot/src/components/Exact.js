import React, { useEffect, useState } from 'react';
import weatherServices from '../services/weather';

const Exact = ({ country }) => {
    const [ weather, setWeather ] = useState();

    useEffect(() => {
        weatherServices.getWeather(country.capital)
            .then(result => {
                setWeather(result);
            })
            .catch(error => {
                console.log('getWeather error: ', error.message);
            });
    }, [country.capital]);

    return (
        <div>
            <h3> {country.name} </h3>
            <p> capital {country.capital} </p>
            <p> population {country.population} </p>
            <h2> languages </h2>
            <ul>
                {country.languages.map((language, i) => {
                    return (
                        <li key={i}> {language.name} </li>
                    )
                })}
            </ul>
            <img src={country.flag} style={{width: 200, height: 150}} alt='Countrys flag' />
            {weather ? 
            <div>
                <h1>Weather in {country.capital}</h1>
                <p><strong>Temperature: </strong> {weather.current.temperature} Celsius </p>
                <img src={weather.current.weather_icons[0]} alt='Weather icon' />
                <p><strong>Wind: </strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir} </p>
            </div>
            :
            <p>Loading weather...</p>}
        </div>
    )
};

export default Exact;
