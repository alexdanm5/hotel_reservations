import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const hotelReservationDataSlice = createSlice({
    name: 'hotelReservationData',
    initialState,
    reducers: {
        setReservationData: (state, action) => {
            Object.assign(state, action.payload);
        },
        clearReservationData: (state) => {
            return initialState;
        }
    }
});

const { actions, reducer } = hotelReservationDataSlice;
export default reducer;
export const { setReservationData, clearReservationData } = actions;