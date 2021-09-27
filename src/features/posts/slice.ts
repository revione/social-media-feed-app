// Ducks pattern
import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import { sub } from "date-fns"
// API
import { client } from "api/client"
// Types
import { RootState } from "app/store"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts")
  return response.data
})
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

const initialItems: Post[] = [
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

type Status = "idle" | "loading" | "succeeded" | "failed"
type Error = string | null | undefined

type InitialState = {
  items: Post[]
  status: Status
  error: Error
}

const initialState: InitialState = {
  items: [...initialItems],
  status: "idle",
  error: null,
}

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.items.push(action.payload)
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
      const existingPost = state.items.find((post) => post.id === id)
      if (existingPost) {
        existingPost.date = new Date().toISOString()
        existingPost.title = title
        existingPost.content = content
        existingPost.userId = userId
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.items.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        // Add any fetched posts to the array
        state.items = state.items.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { postAdded, postUpdated, reactionAdded } = slice.actions

export const selectAllPosts = (state: RootState) => state.posts.items

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.items.find((post) => post.id === postId)

export default slice.reducer
