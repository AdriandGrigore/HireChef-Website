import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isRatingModalOpen: false,
}

const ratingModalSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{
        closeRatingModal:(state)=>{
            state.isRatingModalOpen= false
        },
        openRatingModal:(state)=>{
            state.isRatingModalOpen= true
        }
    }
})

export default ratingModalSlice.reducer
export const {openRatingModal,closeRatingModal} = ratingModalSlice.actions
