import { configureStore } from "@reduxjs/toolkit";
import bookingFormReducer from "../features/bookingFormSlice"
import modalReducer from "../features/modalSlice"

export const store = configureStore({
    reducer:{
        bookingForm: bookingFormReducer,
        modal: modalReducer,
    }
})