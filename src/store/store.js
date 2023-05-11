import { configureStore } from "@reduxjs/toolkit";
import bookingFormReducer from "../features/bookingFormSlice"
import modalReducer from "../features/modalSlice"
import userReducer from "../features/userSlice"
import meetingsReducer from "../features/meetingSlice";
import ratingReducer from "../features/ratingSlice"

export const store = configureStore({
    reducer:{
        bookingForm: bookingFormReducer,
        modal: modalReducer,
        rating: ratingReducer,
        users: userReducer,
        meetings: meetingsReducer,
    },
})