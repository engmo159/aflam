import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { themeReducer } from './slices/themeSlice'
import { moviesReducer } from './slices/moviesSlice'
import { seriesReducer } from './slices/seriesSlice'
import { searchReducer } from './slices/searchSlice'
import { mediaDetailReducer } from './slices/mediaDetailsSlice'
import { personDetailsReducer } from './slices/personDetailsSlice'
import { userAuthReducer } from './slices/userAuthSlice'
import { tokenReducer } from './slices/tokenSlice'
import { favoriteReducer } from './slices/favoriteSlice'
import { reviewReducer } from './slices/reviewSlice'

//persist reducer config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeReducer', 'tokenReducer'],
}
// default reducer
const rootReducer = combineReducers({
  themeReducer,
  tokenReducer,
  moviesReducer,
  seriesReducer,
  searchReducer,
  mediaDetailReducer,
  personDetailsReducer,
  userAuthReducer,
  favoriteReducer,
  reviewReducer,
})
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
