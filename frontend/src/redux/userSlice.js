import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    signinDialog: false,
    refresh: false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        getRefresh: (state, action) => {
            state.refresh = !state.refresh
        },
        getSigninDialog:(state, action) =>{
            state.signinDialog = action.payload
        },
        
    }
})

export const {getUser, getRefresh, getSigninDialog} = userSlice.actions
export default userSlice.reducer