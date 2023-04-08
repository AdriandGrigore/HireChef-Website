import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isModalOpen:false
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
        }
    }
})

export default modalSlice.reducer
export const {openModal,closeModal}= modalSlice.actions
