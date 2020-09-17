import * as actions from './Actions';

const initialState = {
    data: {}
}

const UserReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case actions.STORE_USER_DATA:
            state.data = { ...action.value }
            return state
        default:
            return state;
    }
}

export default UserReducer;