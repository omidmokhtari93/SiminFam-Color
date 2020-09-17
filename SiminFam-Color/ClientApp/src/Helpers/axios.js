import axios from 'axios';
import { AuthHeader } from '../Helpers/AuthHeader';

const instance = axios.create({
    baseURL: '/api/',
    headers: AuthHeader()
})

export default instance;