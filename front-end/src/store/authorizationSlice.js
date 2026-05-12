import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trigger: false
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setAuthorization: (state, action) => {
            state.trigger = action.payload;
        }
    }
});

const {actions, reducer} = authorizationSlice;
export default reducer;
export const {setAuthorization} = actions;