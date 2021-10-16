// Ducks pattern
import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import { sub } from "date-fns"
// API
import { client } from "api/client"
// Types
import { RootState } from "app/store"

export interface Post {
  id: string
  date: string
  title: string
  content: string
  reactions: Record<string, number>
  user: string
}

type PostIncomming = {
  title: string
  content: string
  user: string
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null as null | string | undefined,
})

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts")
  return response.data
})

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

// const initialState: InitialState = {
//   items: [...initialItems],
//   status: "idle",
//   error: null,
// }

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content, user } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.date = new Date().toISOString()
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
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
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      // Use the `addOne` reducer for the fulfilled case
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

export const { postUpdated, reactionAdded } = slice.actions

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default slice.reducer
