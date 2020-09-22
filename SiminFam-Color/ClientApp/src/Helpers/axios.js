import axios from 'axios';
import { token } from './AuthHeader';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';

let instance = axios.create({
    baseURL: '/api/',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = token.get();
    return config;
})

instance.interceptors.response.use(config => {
    return config;
}, (error) => {
    createNotif({ type: 'danger', message: 'خطایی بوجود آمد' })
    return false;
})

const createNotif = (data) => {
    store.addNotification({
        type: data.type,
        message: data.message,
        ...config
    })
}

export default instance;