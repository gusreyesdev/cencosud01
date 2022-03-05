import { types } from './types';


const initialState = {
    checking: true
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.login:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                profile: action.payload.profile,
                checking: false
            }

        case types.checkingFinish:
            return {
                ...state,
                checking: false
            }
        
        case types.logout:
            return{
                checking: false
            }

        default:
            return state;

    }
}
