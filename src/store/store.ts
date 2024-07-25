// import {persistReducer, persistStore} from 'redux-persist';

import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import {authApiSlice} from './api/auth';
import {clientServiceApiSlice} from './api/cliente/servico';
import authSlice from './features/auth';
import clientearquivoSlice from './features/Cliente/arquivo';
const rootReducer = combineReducers({
  auth: authSlice,
  clientArquivo: clientearquivoSlice,
  //   socket: socketReducer,
  [clientServiceApiSlice.reducerPath]: clientServiceApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
});

const persistConfig = {
  key: '@AGUAFACIL',
  storage: AsyncStorage,
  whitelist: ['auth', 'clientArquivo'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(authApiSlice.middleware, clientServiceApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
