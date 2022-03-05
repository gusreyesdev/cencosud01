import { types } from './types';


const initialState = {
    students: []
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.loaded:
            return {
                ...state,
                students: [...action.payload]
            }

        default:
            return state;

    }

}