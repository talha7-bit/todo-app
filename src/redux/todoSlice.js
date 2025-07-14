import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({
    name:"todo",
    initialState:{
        todos:[]
    },
    reducers:{
        settodos:(state,action)=>{
            state.todos=action.payload;
        },
        addtodos:(state,action)=>{
            state.todos.push(action.payload);
        },
        deletetodos:(state,action)=>{
            state.todos=state.todos.filter(t=>t.id!==action.payload);
        },
        updatetodos:(state,action)=>{
            const index=state.todos.findIndex(t=>t.id===action.payload.id);
            if(index!==-1){
                state.todos[index]=action.payload;
            }
        }
    }
})

export const {settodos,addtodos,deletetodos,updatetodos}=todoSlice.actions;
export default todoSlice.reducer;