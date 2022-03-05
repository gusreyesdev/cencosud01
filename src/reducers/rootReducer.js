import { combineReducers } from "redux";
import { uiReducer } from "./ui/reducer";
import { authReducer } from "./auth/reducer";
import { courseReducer } from "./course/reducer";
import { userReducer } from "./user/reducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    course: courseReducer,
    user: userReducer
})