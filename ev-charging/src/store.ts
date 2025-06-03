import { configureStore } from '@reduxjs/toolkit'
import { stationApi } from './services/station'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/auth'
export const store = configureStore({
  reducer: {
    [stationApi.reducerPath]:stationApi.reducer,
    [authApi.reducerPath]:authApi.reducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([stationApi.middleware,authApi.middleware]),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)