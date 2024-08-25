// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from 'app/constants/Index.ts';
import {createApi, fetchBaseQuery} from 'app/modules';
import {RootState} from 'app/store/store';

// Define our single API slice object
export const clientServiceApiSlice = createApi({
  reducerPath: 'clientServiceApi',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: builder => ({
    servicoAvaliable: builder.mutation<IServicoAvaliable[], void>({
      query: bodyData => ({
        url: '/servico/cliente/disponivel',
        method: 'GET',
        body: bodyData,
        timeout: 10000,
      }),
      transformResponse: (response: IServicoAvaliable[]) => response,
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
    solicitarService: builder.mutation<
      ICreatedServicoSolicitado,
      ISolicitarService
    >({
      query: bodyData => ({
        url: `/solicitacao/${bodyData.servicoId}`,
        method: 'POST',
        body: {
          cordenada: bodyData.cordenada,
        },
        timeout: 10000,
      }),
    }),
    historicService: builder.query<IServicoArchive[], void>({
      query: bodyData => ({
        url: '/solicitacao/historico',
        method: 'GET',
        body: bodyData,
        timeout: 10000,
      }),
      transformResponse: (response: IServicoArchive[]) => response,
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

export const {
  useServicoAvaliableMutation,
  useHistoricServiceQuery,
  useSolicitarServiceMutation,
} = clientServiceApiSlice;
