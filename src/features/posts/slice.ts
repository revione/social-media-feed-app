// Ducks pattern
import { createSlice } from "@reduxjs/toolkit"

interface Post {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
]

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
})

export const {} = slice.actions

export default slice.reducer
