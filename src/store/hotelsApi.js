import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://64a1b2c3d4e5f6.mockapi.io/api/v1/'; 

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  
  endpoints: (builder) => ({
    
    getRecommendedHotels: builder.query({
      query: () => 'recommended', // Это приклеится к BASE_URL -> .../api/v1/hotels
    }),

    // Здесь можно добавить другие запросы, например:
    // getHotelById: builder.query({ query: (id) => `hotels/${id}` })
  }),
});

// RTK Query АВТОМАТИЧЕСКИ генерирует хук на основе имени эндпоинта!
// getRecommendedHotels превращается в useGetRecommendedHotelsQuery
export const { useGetRecommendedHotelsQuery } = hotelsApi;