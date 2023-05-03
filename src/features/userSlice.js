import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs} from 'firebase/firestore'
import { usersCollectionRef } from "../util/firebase-config";

const initialState = {
    loggedInUserData:[],
    loggedInUserDataLoading: false,
    loggedInUserDataError: "",
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
            state.loggedInUserData = action.payload
            state.loggedInUserDataLoading = false
        })
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.loggedInUserDataError = action.error.message
            state.loggedInUserDataLoading = false
        })
    }
})

export default userSlice.reducer