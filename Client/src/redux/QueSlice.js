import { createSlice } from "@reduxjs/toolkit";


const initialState={
      MasterData:[],
      MasterAns:[],
      totalScore:0

    }


const questionSlice=createSlice({
    name:'Quiz',
    initialState:initialState,
    reducers:{
         addMasterData:(state,action)=>{
          state.MasterData=action.payload
         },
         addMasterAns:(state,action)=>{
          state.MasterAns=action.payload
         },
         addTotalScore:(state,action)=>{
          state.totalScore=action.payload
         }

      }
         
}        
)

export const {addMasterData,addMasterAns,addTotalScore}=questionSlice.actions
export default questionSlice.reducer