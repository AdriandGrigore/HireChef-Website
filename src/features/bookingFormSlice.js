import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const bookingFormSlice= createSlice({
  name:"bookingForm",
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

export default bookingFormSlice.reducer
export const { inputChange,inputStatus, formValid, formNotValid, resetForm} = bookingFormSlice.actions