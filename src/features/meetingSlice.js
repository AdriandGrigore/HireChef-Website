import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, deleteDoc, doc, query, orderBy, updateDoc, Timestamp,} from 'firebase/firestore'
import { meetingsCollectionRef } from "../util/firebase-config";
import { db } from "../util/firebase-config";
import { openModal } from "./modalSlice";
import { resetForm } from "./bookingFormSlice";

const initialState = {
    userMeetingsList: [],
    userMeetingsLoading: false,
    userMeetingsError: false,
    deleteMeetingError: false,
}

export const fetchMeetings = createAsyncThunk("firestore/fetchMeetings", async (loggedInUser) =>{
    const res = await getDocs(query(meetingsCollectionRef, orderBy("date", "asc")))
    const data = res.docs
        .map(doc => {
            const meetingData = doc.data()
            return ({
                ...meetingData, 
                meetingId: doc.id,
                date: meetingData.date.toDate().toLocaleDateString("en-gb")
            })
        })
        .filter(meeting => meeting.userId === loggedInUser.uid)
    
    return data
})

export const updateMeeting = createAsyncThunk("firestore/updateMeeting", async (_,{getState, dispatch}) => {
    const bookingFormState = getState().bookingForm
    const {phoneNumber, menu, chef, date, editForm} = bookingFormState
    const newFields = {
        phoneNumber: phoneNumber.value,
        menu: menu.value,
        chef: chef.value,
        date: Timestamp.fromDate(new Date(date.value))
    }
    
    await updateDoc(doc(db, "meetings", editForm.meetingSelectedForEdit), newFields)
    dispatch(openModal())
    dispatch(resetForm())
})

export const deleteMeeting = createAsyncThunk("firestore/deleteMeeting", async (id) =>{
    await deleteDoc(doc(db, "meetings", id))

    return id
})

const meetingSlice = createSlice({
    name: "meetingSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchMeetings.pending, (state) =>{
            state.userMeetingsLoading= true;
        })
        builder.addCase(fetchMeetings.fulfilled, (state, action) =>{
            state.userMeetingsLoading = false
            state.userMeetingsList = action.payload
        })
        builder.addCase(fetchMeetings.rejected, (state,action) => {
            state.userMeetingsLoading = false
            state.userMeetingsError = true
            console.log(action.error.message)
        })
        builder.addCase(deleteMeeting.fulfilled, (state,action) =>{
            state.userMeetingsList = state.userMeetingsList.filter(meeting => meeting.meetingId !== action.payload)
        })
        builder.addCase(deleteMeeting.rejected, (state) =>{
            state.deleteMeetingError = true
        })
        builder.addCase(updateMeeting.rejected, () =>{
            alert("Something went wrong in updating your meeting. Please try again")
        })
    }
})

export default meetingSlice.reducer