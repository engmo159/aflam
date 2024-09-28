import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { myNum } from './slices/homeSlice'
import { test } from './slices/testSlice'
import { allUsers } from './slices/userSlice'
import { persist } from './slices/persistSlice'
//persist reducer config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist'],
}
// default reducer
const rootReducer = combineReducers({ myNum, test, allUsers, persist })
// default reducer + persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
//store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)

export default store
