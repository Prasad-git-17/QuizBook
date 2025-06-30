import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'Auth',
    initialState:{
        isLogged:false,
        role:'guest',
        userId:''
    },
    reducers:{
        checkLogIn:(state,action)=>{
            state.isLogged=action.payload   
            
        },
        checkUser:(state,action)=>{
            state.role=action.payload
             
        },
        addUserId:(state,action)=>{
            state.userId=action.payload
        }
 

} })

export const {checkLogIn,checkUser,addUserId}=authSlice.actions
export default authSlice.reducer