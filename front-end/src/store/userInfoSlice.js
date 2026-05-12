import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = {
                ...state.userInfo, 
                ...action.payload  
            };
        },
        clearUserInfo: (state) => {
            return initialState;
        }
    }
});

const { actions, reducer } = userInfoSlice;
export default reducer;
export const { setUserInfo, clearUserInfo } = actions;