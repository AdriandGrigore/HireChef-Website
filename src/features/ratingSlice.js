import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isRatingModalOpen: false,
    chefSelectedForRating: "",
}

const ratingSlice= createSlice({
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

export default ratingSlice.reducer
export const {openRatingModal,closeRatingModal} = ratingSlice.actions
