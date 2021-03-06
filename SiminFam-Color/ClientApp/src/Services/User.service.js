import http from '../Helpers/axios';
import * as action from './ServiceActions';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';
import { token } from '../Helpers/AuthHeader';

export const user = {
    login: (value) => {
        return http.post(action.LOGIN, value).then((response) => {
            if (response.data) {
                if (response.data.type == "success") {
                    token.set(value)
                }
                createNotif(response.data)
            }
            return response.data ? response.data : false
        })
    },

    checkLogin: async () => {
        if (token.getUser()) {
            let localUser = window.atob(token.getUser()).split(':')
            return http.post(action.CHECK_LOGIN,
                { Username: localUser[0], Password: localUser[1] })
                .then(userData => { return userData });
        }
        return null
    },
    logout: async () => token.remove()
}

const createNotif = ({ type, message }) => {
    store.addNotification({
        type: type,
        message: message,
        ...config
    })
}



