import { configureStore, combineReducers } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import { apiSlice } from './api/api-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ profile: profileReducer, [apiSlice.reducerPath]: apiSlice.reducer }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
