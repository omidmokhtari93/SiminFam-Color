import http from '../Helpers/axios';
import * as action from './ServiceActions';
import { store } from 'react-notifications-component';
import { config } from '../UI/Notification/Notification.config';
import { AuthHeader } from '../Helpers/AuthHeader';

export const user = {
    login: (value) => {
        return http.post(action.LOGIN, value, { params: AuthHeader() }).then((response) => {
            if (response.data) {
                if (response.data.type == "success") {
                    localStorage.setItem("SiminUser", window.btoa(value.Username + ':' + value.Password))
                }
                createNotif(response.data)
            }
            return response.data.type == "success"
        }).catch(response => {
            createNotif({ type: 'danger', message: 'خطایی بوجود آمد' })
        })
    },

    checkLogin: () => {
        return http.get(action.CHECK_LOGIN, { params: AuthHeader() }).then(userData => {
            return true
        }).catch(x => false);
    },
    logout: () => handleLogOut()
}

const handleLogOut = async () => {
    return await localStorage.removeItem('SiminUser')
}

const createNotif = (data) => {
    store.addNotification({
        type: data.type,
        message: data.message,
        ...config
    })
}



