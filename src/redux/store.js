import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import contactsReducer from './contactsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['token', 'user'],
};

const contactsPersistConfig = {
  key: 'contacts',
  storage,
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: persistedContactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
});

export const persistor = persistStore(store);
