// Ducks pattern
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"

interface Post {
  id: string
  title: string
  content: string
  userId: string
}

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!", userId: "0" },
  { id: "2", title: "Second Post", content: "More text", userId: "1" },
]

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content, userId } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.userId = userId
      }
    },
  },
})

export const { postAdded, postUpdated } = slice.actions

export default slice.reducer
