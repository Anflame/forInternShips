import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/slice';
import { locationsReducer } from './locations/slice';
import { paintingsReducer } from './paintings/slice';
import { selectReducer } from './select/slice';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

export type StoreState = ReturnType<typeof rootReducer>;

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: [],
// };

export const rootReducer = combineReducers({
  authors: authorsReducer,
  locations: locationsReducer,
  paintings: paintingsReducer,
  select: selectReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);