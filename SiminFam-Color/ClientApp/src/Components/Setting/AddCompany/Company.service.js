import http from '../../../Helpers/axios';
import { store } from 'react-notifications-component';
import { config } from '../../../UI/Notification/Notification.config';

export const companyService = {
    save: (body) => {
        return http.post('SaveCompany', body)
            .then(handleResponse)
            .catch(() => createNotif({ type: 'danger', message: 'خطایی بوجود آمد' }));
    },
    edit: (values) => {
        return http.post('EditCompany', values)
            .then(handleResponse)
            .catch(() => createNotif({ type: 'danger', message: 'خطایی بوجود آمد' }));
    },
    //delete: { url: 'DeleteProduct', method: 'post' },
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