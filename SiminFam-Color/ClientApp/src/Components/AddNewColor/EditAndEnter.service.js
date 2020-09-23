import * as action from '../../Services/ServiceActions';
import http from '../../Helpers/axios';
import { store } from 'react-notifications-component';
import { config } from '../../UI/Notification/Notification.config';

export const addNew = {
    save: (data) => {
        let serverData = {
            ProductId: data.type.value,
            TempCode: data.tempCode.value,
            FinalCode: data.finalCode.value,
            ColorId: data.color.value,
            Amount: data.weight.value,
            EnterDate: data.enterDate.text,
            CompanyId: data.company.value,
            Price: data.price.value,
            Comment: data.comment.value
        }
        return http.post(action.ADD_NEW_PRODUCT, serverData)
            .then(handleResponse).catch(() => handleResponse(false));
    }
}


function handleResponse(response) {
    if (response.data) {
        notif(response.data)
    } else {
        notif({ type: 'error', message: 'ثبت با خطا مواجه شد' })
    }
    return response.data
}

const notif = e => {
    store.addNotification({
        type: e.type,
        message: e.message,
        ...config
    })
}