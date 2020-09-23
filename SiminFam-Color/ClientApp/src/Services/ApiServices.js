import http from '../Helpers/axios';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';
import * as  actions from './ServiceActions';

export const apiService = {
    comapny: {
        add: (value) => handleRequest(actions.ADD_COMPANY, value),
        edit: (value) => handleRequest(actions.EDIT_COMPANY, value)
    },
    product: {
        add: (value) => handleRequest(actions.ADD_TYPE, value),
        edit: (value) => handleRequest(actions.EDIT_TYPE, value),
    },
    color: {
        add: (value) => handleRequest(actions.ADD_COLOR, value),
        edit: (value) => handleRequest(actions.EDIT_COLOR, value),
    }
}

function handleRequest(action, value) {
    return http.post(action, value)
        .then(response => {
            createNotif(response.data);
            return response.data;
        });
}

const createNotif = ({ type, message }) => {
    store.addNotification({
        type: type,
        message: message,
        ...config
    })
    return ({ type, message })
}