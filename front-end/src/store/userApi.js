import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {setUserInfo} from './userInfoSlice';

const BASE_URL = 'http://localhost:8000'; 

export const userApi = createApi({
    reducerPath: 'userApi', 
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['DeleteFavourites', 'ChangeUserData'],

    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => `user-info`,
            providesTags: ['ChangeUserData'],
        }),
        getUserFavourites: builder.query({
            query: () => `user/favorit-hotels`,
            providesTags: ['DeleteFavourites'],
        }),
        addHotelToFavourites: builder.mutation({
            query: (hotel) => ({
                url: `addToFavorites`,
                method: 'POST',
                body: { hotelId: hotel.id }
            }),
            async onQueryStarted(hotel, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userApi.util.updateQueryData('getUserFavourites', undefined, (draft) => {

                        draft.push( hotel );
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        removeHotelFromFavourites: builder.mutation({
            query: (hotel) => ({
                url: `removeFromFavorites`, 
                method: 'DELETE',           
                body: { hotelId: hotel.id }           
            }),
            async onQueryStarted(hotel, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userApi.util.updateQueryData('getUserFavourites', undefined, (draft) => {
                        const index = draft.findIndex((item) => item.id === hotel.id);
                        if (index !== -1) {
                            draft.splice(index, 1);
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
                invalidatesTags: ['DeleteFavourites'],
            
        }),
        changeUserData: builder.mutation({
            query: (userData) => ({
                url: `changeUserData`, 
                method: 'PUT',           
                body: userData,           
            }),
            invalidatesTags: ['ChangeUserData'],
            async onQueryStarted(userData, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled; 

                    dispatch(setUserInfo(userData)); 

                } catch (error) {
                    console.error(error);
                }
            }
        }),
    }),
});

export const { useGetUserFavouritesQuery, 
               useAddHotelToFavouritesMutation, 
               useGetUserInfoQuery, 
               useRemoveHotelFromFavouritesMutation,
               useChangeUserDataMutation } = userApi;