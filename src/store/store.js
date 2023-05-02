import { configureStore } from "@reduxjs/toolkit";
import bookingFormReducer from "../features/bookingFormSlice"
import modalReducer from "../features/modalSlice"
import userReducer from "../features/userSlice"
import meetingsReducer from "../features/meetingSlice";

export const store = configureStore({
    reducer:{
        bookingForm: bookingFormReducer,
        modal: modalReducer,
        users: userReducer,
        meetings: meetingsReducer,
    },
})