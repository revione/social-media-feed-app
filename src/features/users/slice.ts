// Ducks pattern
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"

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
})

export const { userAdded, userUpdated } = slice.actions

export default slice.reducer
