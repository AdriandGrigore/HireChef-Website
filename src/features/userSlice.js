import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs} from 'firebase/firestore'
import { usersCollectionRef } from "../util/firebase-config";

const initialState = {
    userDataFetchedBefore: false,
    loggedInUserData:[],
    loggedInUserDataLoading: false,
    loggedInUserDataError: false,
}

export const fetchUserData = createAsyncThunk("firestore/fetchUserData", async (loggedInUser) =>{
    const res = await getDocs(usersCollectionRef)
    const data = res.docs.map((doc) => ({...doc.data()})).filter(user => user.id === loggedInUser.uid)

    return data;
})


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchUserData.pending, (state) =>{
            state.loggedInUserDataLoading = true;
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) =>{
            state.loggedInUserDataLoading = false
            state.userDataFetchedBefore = true
            state.loggedInUserData = action.payload
        })
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.loggedInUserDataLoading = false
            state.loggedInUserDataError = true
            console.log(action.error.message)
        })
    }
})

export default userSlice.reducer