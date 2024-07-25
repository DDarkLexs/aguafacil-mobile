// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from '../../constants/Index.ts';
import {createApi, fetchBaseQuery} from '../../modules';

// Define our single API slice object
export const locationApiSlice = createApi({
  reducerPath: 'locationApi',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {

      //     const token = (getState() as RootState).auth.token;
      //     if (token) {
      //       headers.set('Authorization', `Bearer ${token}`);
      //     }
      //   },
      
    },
  }),
  endpoints: builder => ({
    getMyLocationData: builder.mutation<any, {latitude: number, longitude: number }>({
      query: bodyData => ({
        url:`https://nominatim.openstreetmap.org/reverse?
        format=jsonv2&lat=${bodyData.latitude}&lon=${bodyData.longitude}`,
        method: 'GET',

        timeout: 10000,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: any,
      ) => {
     
        return error;
      },
    }),
  }),
});

export const {useGetMyLocationDataMutation} = locationApiSlice;
