import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userReservationDataSlice = createSlice({
    name: 'userReservationData',
    initialState,
    reducers: {
        setReservationData: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

const { actions, reducer } = userReservationDataSlice;
export default reducer;
export const { setReservationData } = actions;