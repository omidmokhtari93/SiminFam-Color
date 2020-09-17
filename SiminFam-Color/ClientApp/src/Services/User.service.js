import http from '../Helpers/axios';
//import { AuthHeader } from '../Helpers/AuthHeader';
import * as action from './ServiceActions';

export const user = {
    login: (value) => HandleRequest(action.LOGIN, value),
    checkLogin: () => handleResponse(action.CHECK_LOGIN)
}

const HandleRequest = ({ action, value }) => {
    return http.post(action, value).then(handleResponse)
        .catch(() => createNotif({ type: 'danger', message: 'خطایی بوجود آمد' }));
}

const handleResponse = (response) => {
    console.log(response)
    if (response) {

    }
}

const createNotif = e => {
    
}