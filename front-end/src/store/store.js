import {configureStore} from "@reduxjs/toolkit";
import { hotelsApi } from './hotelsApi';


const store = configureStore({
    reducer: {
        [hotelsApi.reducerPath]: hotelsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hotelsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;