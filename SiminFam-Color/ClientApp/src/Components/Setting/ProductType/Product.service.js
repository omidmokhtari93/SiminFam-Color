import http from '../../../Helpers/axios';
import { store } from 'react-notifications-component';
import { config } from '../../../UI/Notification/Notification.config';

export const product = {
    save: (body) => {
        return http.post('SaveProduct', body)
            .then(handleResponse)
            .catch(() => createNotif({ type: 'danger', message: 'خطایی بوجود آمد' }));
    },
    edit: { url: 'EditProduct', method: 'get' },
    delete: { url: 'DeleteProduct', method: 'post' },
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