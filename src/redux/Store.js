import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'
import authReducer from './authSlice'

const store=configureStore({
reducer:{
    auth:authReducer,
    todo:todoReducer
}
})

export default store