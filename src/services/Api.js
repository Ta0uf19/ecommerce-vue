import axios from 'axios'

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';

const fetch = () => {
    const options = {
        baseURL: API_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const instance = axios.create(options);

    // Set the AUTH token for any requestr
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetch();
