import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, orderBy, query } from "firebase/firestore";
import { ratingsCollectionRef } from "../util/firebase-config";


const initialState={
    userRatingsList: [],
    userRatingsLoading: false,
    userRatingsError: false,
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
            state.userRatingsList= payload
        })
        builder.addCase(fetchRatings.rejected, (state, action) =>{
            state.userRatingsLoading= false
            state.userRatingsError = true
            console.log(action.error.message)
        })
    }
})

export default ratingSlice.reducer
export const {openRatingModal,closeRatingModal} = ratingSlice.actions
