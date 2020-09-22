import axios from 'axios';
import { token } from './AuthHeader';

let instance = axios.create({
    baseURL: '/api/',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = token.get();
    return config;
})

export default instance;