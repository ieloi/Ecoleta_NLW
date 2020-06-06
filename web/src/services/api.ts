import axios from 'axios';

const api = axios.create({
    // baseURL define uma mesma url que pode ser reaproveitada varias vezes
    baseURL: 'http://localhost:3333'
})

export default api;