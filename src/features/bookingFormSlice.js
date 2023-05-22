import { createSlice } from "@reduxjs/toolkit";
import { resetAllStates } from "../actions/resetAllStates";

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
  editForm:{
    status: false, 
    meetingSelectedForEdit: ""
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
    changeToEditForm: (state, {payload})=>{
      state.editForm.status = true
      state.editForm.meetingSelectedForEdit = payload.id
    },
    resetState:()=>{
      return initialState
    }
  },
  extraReducers: ((builder) => {
    builder.addCase(resetAllStates, () => {
      return initialState
    })
  })
})

export default bookingFormSlice.reducer
export const { inputChange,inputStatus, formValid, formNotValid, resetState, changeToEditForm} = bookingFormSlice.actions