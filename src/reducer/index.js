import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
import courseReducer from "../slices/courseSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    cart : cartReducer,
    viewCourse : viewCourseReducer,
    course : courseReducer
})

export default rootReducer