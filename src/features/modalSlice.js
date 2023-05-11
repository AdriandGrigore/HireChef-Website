import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isConfirmationModalOpen:false,
    isDeleteModalOpen:false,
    documentSelectedForDelete: "",
    isRatingModalOpen: false,
    chefSelectedForRating: "",
}

const modalSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{
        closeConfirmationModal:(state)=>{
            state.isConfirmationModalOpen= false
        },
        openConfirmationModal:(state)=>{
            state.isConfirmationModalOpen= true
        },
        closeDeleteModal:(state)=>{
            state.isDeleteModalOpen = false
            state.documentSelectedForDelete = ""
        },
        openDeleteModal:(state, {payload})=>{
            state.isDeleteModalOpen= true
            state.documentSelectedForDelete = payload
        },
        closeRatingModal:(state)=>{
            state.isRatingModalOpen= false
            state.chefSelectedForRating = ""
        },
        openRatingModal:(state, {payload})=>{
            state.isRatingModalOpen= true
            state.chefSelectedForRating = payload
        }
    }
})

export default modalSlice.reducer
export const { 
    openConfirmationModal, 
    closeConfirmationModal, 
    openDeleteModal, 
    closeDeleteModal, 
    openRatingModal, 
    closeRatingModal 
} = modalSlice.actions
