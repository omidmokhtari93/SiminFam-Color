import http from '../Helpers/axios';
import * as actions from './ServiceActions';

let optionsArray = {}

export const options = {
    get: {
        color: () => handleRequest(actions.GET_COLORS)
    },
    getPageOptions: {
        addNew: () => { }
    }
}

const handleRequest = async (action) => {
    let response = await http.get(action)
    optionsArray = { ...{ Colors: await response.data.rows } }
    return optionsArray;
}