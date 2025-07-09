import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
          const newReq= state.filter((request)=>request._id!==action.payload)
          return newReq
        }
    }
})

  export  const {addRequests,removeRequest}=requestsSlice.actions
export default requestsSlice.reducer