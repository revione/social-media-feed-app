import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "features/counter/slice"
import postsReducer from "features/posts/slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
