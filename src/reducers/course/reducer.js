import { types } from './types';


const initialState = {
    courses: [],
    active: null
}

export const courseReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.loaded:
            return {
                ...state,
                courses: [...action.payload]
            }

        case types.active:
            return {
                ...state,
                active: action.payload
            }
        
        case types.create:
            return {
                ...state,
                courses: [
                    ...state.courses,
                    action.payload
                ]
            }

        case types.updated:
            return {
                ...state,
                courses: state.courses.map(
                    course => (course._id === action.payload.course._id) ? action.payload.course : course
                )
            }

        default:
            return state;
    }
}