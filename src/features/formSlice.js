import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: {
      value: "",
      wasClicked: false,
      errorMsg: "First name must be 3 characters long",
    },
    lastName: {
      value: "",
      wasClicked: false,
      errorMsg: "Last name must be 3 characters long",
    },
    email: {
      value: "",
      wasClicked: false,
      errorMsg:"Enter a valid e-mail address",
    },
    phoneNumber: {
      value: "",
      wasClicked: false,
      errorMsg:"Enter a valid phone number"
    },
    menu: {
      value: "none",
      wasClicked: false,
      errorMsg:"Please select a menu",
    },
    chef: {
      value: "none",
      wasClicked: false,
      errorMsg:"Please select a chef"
    },
    date: {
      value: "",
      wasClicked: false,
      errorMsg:"Select a date"
    },
    submitBtnIsDisabled: true
}

const formSlice= createSlice({
    name:"form",
    initialState,
    reducers:{
        inputChange:(state,{payload})=>{
            state[payload.inputName].value= payload.value
        },
        inputStatus:(state,{payload})=>{
            state[payload.inputName].wasClicked= true
        },
        formValid:(state)=>{
            state.submitBtnIsDisabled= false
        },
        formNotValid:(state)=>{
            state.submitBtnIsDisabled= true
        },
        resetForm:()=>{
          return initialState
        }
    }
})

export default formSlice.reducer
export const { inputChange,inputStatus, formValid, formNotValid, resetForm} = formSlice.actions