import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isModalOpen:false,
    isDeleteModalOpen:false,
}

const modalSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{
        closeModal:(state)=>{
            state.isModalOpen= false
        },
        openModal:(state)=>{
            state.isModalOpen= true
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
export const {openModal, closeModal, closeDeleteModal, openDeleteModal}= modalSlice.actions
