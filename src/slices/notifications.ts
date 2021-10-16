// libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// server
import { client } from "api/client"
// Types
import { RootState } from "app/store"

type Notification = {
  id: string
  date: string
  message: string
  user: string
  isNew: boolean
  read: boolean
}

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState)
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ""
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
) as any

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [] as Notification[],
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload)
      state.forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
