import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { themeReducer } from './slices/themeSlice'
import { moviesReducer } from './slices/moviesSlice'

//persist reducer config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeReducer'],
}
// default reducer
const rootReducer = combineReducers({ themeReducer, moviesReducer })
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
export const persister = persistStore(store)

export default store
