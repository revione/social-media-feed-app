// Ducks pattern
import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import { client } from "api/client"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users")
  return response.data
})

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
]

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: {
      reducer(state, action: PayloadAction<User>) {
        state.push(action.payload)
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
          },
        }
      },
    },
    userUpdated(state, action: PayloadAction<User>) {
      const { id, name } = action.payload
      const existingUser = state.find((user) => user.id === id)
      if (existingUser) {
        existingUser.name = name
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
  },
})

export const { userAdded, userUpdated } = slice.actions

export default slice.reducer
