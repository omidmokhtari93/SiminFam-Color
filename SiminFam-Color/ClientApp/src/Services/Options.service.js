import http from '../Helpers/axios';
import * as action from './ServiceActions'

export const options = {
    get: {
        color: () => { }
    },
    getPageOptions: {
        addNew: async () => {
            let data = { colors: [], companies: [], types: [] };
            let colorReposnse = await http.get(action.GET_COLORS)
            let typesResponse = await http.get(action.GET_TYPE)
            let companyResponse = await http.get(action.GET_COMPANIES)
            colorReposnse.data.rows.map(x => data.colors.push({ value: x.id, text: x.color }))
            typesResponse.data.rows.map(x => data.types.push({ value: x.id, text: x.product }))
            companyResponse.data.rows.map(x => data.companies.push({ value: x.id, text: x.company }))
            return data;
        }
    }
}