import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    user: null | string;
    otp: null | string;
}

const initialState: TInitialState = {
    user: null,
    otp: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload.user;
            state.otp = action.payload.otp;
        },
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;