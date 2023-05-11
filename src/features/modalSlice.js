import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isConfirmationModalOpen:false,
    isDeleteModalOpen:false,
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
        },
        openDeleteModal:(state)=>{
            state.isDeleteModalOpen= true
        }
    }
})

export default modalSlice.reducer
export const {openConfirmationModal, closeConfirmationModal, closeDeleteModal, openDeleteModal}= modalSlice.actions
