import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db, ratingsCollectionRef } from "../util/firebase-config";
import { closeDeleteModal } from "./modalSlice";
import { resetAllStates } from "../actions/resetAllStates";


const initialState={
    userRatingsFetchedBefore: false,
    userRatingsList: [],
    userRatingsLoading: false,
    userRatingsError: false,
    deleteRatingError: false,
}

export const fetchRatings = createAsyncThunk("firestore/fetchRatings", async (loggedInUser) =>{
    const res = await getDocs(query(ratingsCollectionRef, orderBy("rating", "desc")))
    const data = res.docs
        .map(doc => {
            const ratingData = doc.data()
            return ({
                ...ratingData, 
                ratingId: doc.id,
            })
        })
        .filter(rating => rating.userId === loggedInUser.uid)
    
    return data
})

export const deleteRating = createAsyncThunk("firestore/deleteRating", async (_,{getState, dispatch}) =>{
    const modalState = getState().modal
    const selectedDocumentID = modalState.documentSelectedForDelete

    await deleteDoc(doc(db, "ratings", selectedDocumentID))
    dispatch(closeDeleteModal())

    return selectedDocumentID
})

const ratingSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchRatings.pending, (state) =>{
            state.userRatingsLoading = true
        })
        builder.addCase(fetchRatings.fulfilled, (state, {payload}) =>{
            state.userRatingsLoading= false
            state.userRatingsFetchedBefore= true
            state.userRatingsList= payload
        })
        builder.addCase(fetchRatings.rejected, (state, action) =>{
            state.userRatingsLoading= false
            state.userRatingsError = true
            console.log(action.error.message)
        })
        builder.addCase(deleteRating.fulfilled, (state, {payload}) =>{
            state.userRatingsList = state.userRatingsList.filter( rating => rating.ratingId !== payload)
        })
        builder.addCase(deleteRating.rejected, (state) =>{
            state.deleteRatingError= true
        })
        builder.addCase(resetAllStates, () => {
            return initialState
        })
    }
})

export default ratingSlice.reducer
