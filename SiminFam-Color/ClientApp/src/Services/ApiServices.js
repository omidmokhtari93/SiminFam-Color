import http from '../Helpers/axios';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';
import * as  actions from './ServiceActions';
import { AuthHeader } from '../Helpers/AuthHeader';

export const apiService = {
    comapny: {
        add: (value) => handleRequest(actions.ADD_COMPANY, value),
        edit: (value) => handleRequest(actions.EDIT_COMPANY, value)
    },
    product: {
        add: (value) => handleRequest(actions.ADD_PRODUCT, value),
        edit: (value) => handleRequest(actions.EDIT_PRODUCT, value),
    },
    color: {
        add: (value) => handleRequest(actions.ADD_COLOR, value),
        edit: (value) => handleRequest(actions.EDIT_COLOR, value),
    }
}

function handleRequest(action, value) {
    return http.post(action, value, { headers: AuthHeader() })
        .then(handleResponse)
        .catch(() => createNotif({ type: 'danger', message: 'خطایی بوجود آمد' }));
}

const handleResponse = (response) => {
    createNotif(response.data);
    return response.data;
}

const createNotif = ({ type, message }) => {
    store.addNotification({
        type: type,
        message: message,
        ...config
    })
    return ({ type, message })
}