import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addfeed:(state,action)=>action.payload,
        removefeed:(state,action)=>{
            const newFeed=state.filter((user)=>user._id!==action.payload)
            return newFeed
        },
        clearfeed:(state,action)=>null

    }
})
export const {addfeed, removefeed,clearfeed}=feedSlice.actions
export default feedSlice.reducer