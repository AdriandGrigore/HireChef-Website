import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isConfirmationModalOpen:false,
    isDeleteModalOpen:false,
    documentSelectedForDelete: "",
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
        }
    }
})

export default modalSlice.reducer
export const {openConfirmationModal, closeConfirmationModal, closeDeleteModal, openDeleteModal}= modalSlice.actions
