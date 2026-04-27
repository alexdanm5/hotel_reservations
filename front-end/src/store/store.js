import {configureStore} from "@reduxjs/toolkit";
import { hotelsApi } from './hotelsApi';
import hotelReservationDataReducer from './hotelReservationDataSlice';


const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        hotelReservationData: hotelReservationDataReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hotelsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;