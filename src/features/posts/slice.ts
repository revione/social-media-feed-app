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
  console.log(":: response : ", response.data)
  return response.data
})

type PostIncomming = {
  title: string
  content: string
  user: string
}

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: PostIncomming) => {
    // We send the initial data to the fake API server
    const response = await client.post("/fakeApi/posts", initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)
export interface Post {
  id: string
  date: string
  title: string
  content: string
  reactions: Record<string, number>
  user: string
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
    title: "First Post!",
    content: "Hello!",
    reactions: initialReactions,
    user: "0",
  },
  {
    id: "2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: "Second Post",
    content: "More text",
    reactions: initialReactions,
    user: "1",
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
      prepare(title, content, user) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user,
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content, user } = action.payload
      const existingPost = state.items.find((post) => post.id === id)
      if (existingPost) {
        existingPost.date = new Date().toISOString()
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
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
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // We can directly add the new post object to our posts array
      state.items.push(action.payload)
    })
  },
})

export const { postAdded, postUpdated, reactionAdded } = slice.actions

export const selectAllPosts = (state: RootState) => state.posts.items

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.items.find((post) => post.id === postId)

export default slice.reducer
