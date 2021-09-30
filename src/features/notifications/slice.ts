// libraries
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunk,
} from "@reduxjs/toolkit"
// server
import { client } from "api/client"
// Types
import { RootState } from "app/store"

type States = {
  pending: string
  rejected: string
  fulfilled: string
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
  initialState: [] as any[],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload)
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
