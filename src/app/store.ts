import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "features/counter/slice"
import postsReducer from "features/posts/slice"
import usersReducer from "features/users/slice"
import notificationsReducer from "features/notifications/slice"

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
