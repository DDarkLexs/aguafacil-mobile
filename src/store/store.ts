// import {persistReducer, persistStore} from 'redux-persist';

import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import {authApiSlice} from './api/auth';
import authSlice from './features/auth';
const rootReducer = combineReducers({
  auth: authSlice,
  //   socket: socketReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
});

const persistConfig = {
  key: '@AGUAFACIL',
  storage: AsyncStorage,
  whitelist: ['auth'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(authApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
