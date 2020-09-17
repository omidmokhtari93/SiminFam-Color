import * as actions from './Actions';

export const storeUserData = (data) => {
    return {
        type: actions.STORE_USER_DATA,
        value: data
    }
}