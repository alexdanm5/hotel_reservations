import {configureStore} from "@reduxjs/toolkit";
import { hotelsApi } from './hotelsApi';
import hotelReservationDataReducer from './hotelReservationDataSlice';
import userReservationDataReducer from './userReservationDataSlice';
import userInfoReducer from './userInfoSlice';

import { userApi } from './userApi';


const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        hotelReservationData: hotelReservationDataReducer,
        userReservationData: userReservationDataReducer,
        userInfo: userInfoReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hotelsApi.middleware).concat(userApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;