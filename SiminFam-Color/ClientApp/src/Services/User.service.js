import http from '../Helpers/axios';
import * as action from './ServiceActions';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';

export const user = {
    login: (value) => {
        return http.post(action.LOGIN, value).then((response) => {
            if (response.data) {
                if (response.data.type == "success") {
                    localStorage.setItem("SiminUser", window.btoa(value.Username + ':' + value.Password))
                }
                createNotif(response.data)
            }
            return response.data ? response.data : false
        }).catch(response => {
            createNotif({ type: 'danger', message: 'خطایی بوجود آمد' })
            return false
        })
    },

    checkLogin: async () => {
        const user = localStorage.getItem('SiminUser')
        if (user) {
            let localUser = window.atob(user).split(':')
            return http.post(action.CHECK_LOGIN,
                { Username: localUser[0], Password: localUser[1] })
                .then(userData => { return userData }).catch(x => false);
        }
        return null
    },
    logout: async () => {
        return localStorage.removeItem('SiminUser')
    }
}

const createNotif = (data) => {
    store.addNotification({
        type: data.type,
        message: data.message,
        ...config
    })
}



