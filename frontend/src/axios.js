import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_stoken') ? `JWT ${localStorage.getItem('token')}` :null ,
        Accept: 'application/json'
    }
    });

export default instance;