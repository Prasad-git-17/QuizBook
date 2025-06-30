import {combineReducers, configureStore  } from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import queReducer from './QueSlice'
import { persistStore, persistReducer  } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


const persistConfig = {
  key: 'root',
  storage,
   whitelist: ['Auth','Quiz']
}

const rootReducer=combineReducers({
   Auth:authReducer,
   Quiz:queReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =configureStore({
 reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false,
     
    }),
}
 
)

export const persistor= persistStore(store)


