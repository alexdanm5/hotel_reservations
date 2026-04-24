import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8000'; 

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  
  endpoints: (builder) => ({
    
    getRecommendedHotels: builder.query({
      query: () => 'recommend', 
    }),
    getDealsHotels: builder.query({
      query: () => 'deal', 
    }),
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`, 
    }),
    getHotelsByInputedValue: builder.query({
      query: (searchParam) => `search?param=${searchParam}`,
    }),
    getRoomListByHotelId: builder.query({
      query: (hotelId) => `hotel/${hotelId}/rooms_list`, 
    })

  }),
});

export const { useGetRecommendedHotelsQuery, 
               useGetDealsHotelsQuery, 
               useGetHotelByIdQuery, 
               useGetHotelsByInputedValueQuery, 
               useGetRoomListByHotelIdQuery } = hotelsApi;