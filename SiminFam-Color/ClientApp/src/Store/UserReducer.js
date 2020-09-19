import * as actions from './Actions';

const initialState = {
    data: null
}

const UserReducer = (state = initialState, action) => {
    //console.log(action)
    switch (action.type) {
        case actions.STORE_USER_DATA:
            return { data: action.value }
        default:
            return state;
    }
}

export default UserReducer;