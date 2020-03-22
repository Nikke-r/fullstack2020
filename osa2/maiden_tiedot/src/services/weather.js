import axios from 'axios';
const baseUrl = 'http://api.weatherstack.com/';
const apiKey = process.env.REACT_APP_API_KEY;

const getWeather = (city) => {
    const response = axios.get(baseUrl + `current?access_key=${apiKey}&query=${city}`)
    return response.then(result => result.data);
}

export default { getWeather };