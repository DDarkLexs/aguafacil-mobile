// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from '../../constants/Index.ts';
import {createApi, fetchBaseQuery} from '../../modules';

// Define our single API slice object
export const authApiSlice = createApi({
  reducerPath: 'authApi',
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
    authCliente: builder.mutation<IAuthUserClienteSuccess, IUserLogin>({
      query: bodyData => ({
        url: '/auth/signin',
        method: 'POST',
        body: bodyData,
      }),
      transformResponse: (response: IAuthUserClienteSuccess) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: any,
      ) => {
        if (meta?.response) {
          const msg = Array.isArray(Object(error.data.message))
            ? String(error.data.message[0])
            : String(error.data.message);
          return msg;
        }
        return error;
      },
    }),
    authMotorista: builder.mutation<IAuthUserMotoristaSuccess, IUserLogin>({
      query: bodyData => ({
        url: '/auth/driver/signin',
        method: 'POST',
        body: bodyData,
      }),
      transformResponse: (response: IAuthUserMotoristaSuccess) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: any,
      ) => {
        if (meta?.response) {
          const msg = Array.isArray(Object(error.data.message))
            ? String(error.data.message[0])
            : String(error.data.message);
          return msg;
        }
        return error;
      },
    }),
  }),
});

export const {useAuthClienteMutation, useAuthMotoristaMutation} = authApiSlice;
