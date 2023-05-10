import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isRatingModalOpen: false,
    chefSelectedForRating: "",
}

const ratingModalSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{
        closeRatingModal:()=>{
            return initialState
        },
        openRatingModal:(state, {payload})=>{
            state.isRatingModalOpen= true
            state.chefSelectedForRating = payload
        }
    }
})

export default ratingModalSlice.reducer
export const {openRatingModal,closeRatingModal} = ratingModalSlice.actions
