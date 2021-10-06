import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "slices/counter"
import postsReducer from "slices/posts"
import usersReducer from "slices/users"
import notificationsReducer from "slices/notifications"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
