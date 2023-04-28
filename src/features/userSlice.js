import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs} from 'firebase/firestore'
import { usersCollectionRef } from "../util/firebase-config";

const initialState = {
    usersList:[],
    usersLoading: false,
    usersError: "",
}

export const fetchUsers = createAsyncThunk("firestore/fetchUsers", async () =>{
    const res = await getDocs(usersCollectionRef)
    const data = res.docs.map((doc) => ({...doc.data()}))

    return data;
})


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchUsers.pending, (state) =>{
            state.usersLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            state.usersList = action.payload
            state.usersLoading = false
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.usersError = action.error.message
            state.usersLoading = false
        })
    }
})

export default userSlice.reducer