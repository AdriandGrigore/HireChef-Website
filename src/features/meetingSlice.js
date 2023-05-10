import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, deleteDoc, doc, query, orderBy, updateDoc, Timestamp,} from 'firebase/firestore'
import { meetingsCollectionRef } from "../util/firebase-config";
import { db } from "../util/firebase-config";
import { closeDeleteModal, openModal } from "./modalSlice";

const initialState = {
    userMeetingsList: [],
    userMeetingsLoading: false,
    userMeetingsError: false,
    deleteMeetingError: false,
    meetingSelectedForDelete: "",
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
})

export const deleteMeeting = createAsyncThunk("firestore/deleteMeeting", async (_, {getState, dispatch}) =>{
    const meetingState = getState().meetings
    const selectedMeetingID = meetingState.meetingSelectedForDelete

    await deleteDoc(doc(db, "meetings", selectedMeetingID))
    dispatch(closeDeleteModal())

    return selectedMeetingID
})

const meetingSlice = createSlice({
    name: "meetingSlice",
    initialState,
    reducers:{
        setDeleteMeetingId: (state, {payload}) =>{
            state.meetingSelectedForDelete = payload
        } 
    },
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
export const {setDeleteMeetingId} = meetingSlice.actions