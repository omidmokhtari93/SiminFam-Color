import { AuthHeader } from '../Helpers/AuthHeader';
import http from '../Helpers/axios';
import * as actions from './ServiceActions';

let optionsArray = {}

export const options = {
    get: {
        color: () => {}
    },
    getPageOptions: {
        addNew: () => {
            let data = [];
            let response = await http.get(action, { headers: AuthHeader() })
            optionsArray = { ...{ Colors: await response.data.rows } }
            return optionsArray;
        }
    }
}