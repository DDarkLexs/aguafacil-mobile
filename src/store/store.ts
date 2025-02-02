// import {persistReducer, persistStore} from 'redux-persist';

import authSlice from 'app/store/features/auth';
import clienteServicoSlice from 'app/store/features/cliente/servico';
import clienteEmCursoSlice from 'app/store/features/cliente/emCurso';
import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import {authApiSlice} from './api/auth';
import {clientServiceApiSlice} from './api/cliente/servico';
import {locationApiSlice} from './api/location';
import { socketMiddleware, socketReducer } from './features/socket';
// import {socketMiddleware, socketReducer} from './features/socket.reducer';

const rootReducer = combineReducers({
  auth: authSlice,
  clientServico: clienteServicoSlice ,
  socket: socketReducer,
  clienteEmCurso: clienteEmCursoSlice,
  [clientServiceApiSlice.reducerPath]: clientServiceApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [locationApiSlice.reducerPath]: locationApiSlice.reducer,
});

const persistConfig = {
  key: '@AGUAFACIL',
  storage: AsyncStorage,
  whitelist: ['auth', 'clientServico', 'clienteEmCurso'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApiSlice.middleware,
      clientServiceApiSlice.middleware,
      locationApiSlice.middleware,
      socketMiddleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
