// Ducks pattern
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"
// Types
import { RootState } from "app/store"

export interface Post {
  id: string
  date: string
  title: string
  content: string
  userId: string
  reactions: Record<string, number>
}

const initialReactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialState: Post[] = [
  {
    id: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: "0",
    title: "First Post!",
    content: "Hello!",
    reactions: initialReactions,
  },
  {
    id: "2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: "1",
    title: "Second Post",
    content: "More text",
    reactions: initialReactions,
  },
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
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content, userId } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.date = new Date().toISOString()
        existingPost.title = title
        existingPost.content = content
        existingPost.userId = userId
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = slice.actions

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post) => post.id === postId)

export default slice.reducer
