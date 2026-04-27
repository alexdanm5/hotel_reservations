import {configureStore} from "@reduxjs/toolkit";
import { hotelsApi } from './hotelsApi';
import hotelReservationDataReducer from './hotelReservationDataSlice';
import userReservationDataReducer from './userReservationDataSlice';


const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        hotelReservationData: hotelReservationDataReducer,
        userReservationData: userReservationDataReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hotelsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;