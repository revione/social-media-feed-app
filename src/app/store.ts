import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "features/counter/slice"
import postsReducer from "features/posts/slice"
import usersReducer from "features/users/slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
