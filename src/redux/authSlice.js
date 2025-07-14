import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null
    },reducers:{
        loginsuccess:(state,action)=>{
            state.user=action.payload;
        },
        logoutsuccess:(state)=>{
            state.user=null
        }
    }
})
export const {loginsuccess,logoutsuccess}=authSlice.actions;
export default authSlice.reducer;