import React, { useEffect } from "react"
// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector, useDispatch } from "app/hooks"
// actions
import {
  selectAllPosts,
  fetchPosts,
  Post as PostType,
} from "features/posts/slice"
// components
import PostAuthor from "components/PostAuthor"
import TimeAgo from "components/TimeAgo"
import ReactionButtons from "components/ReactionButtons"
import Spinner from "components/Spinner"
// styles
import { Section, Post as PostExcerpt, Wrap } from "./styles"

const Post = ({ post }: { post: PostType }) => (
  <PostExcerpt key={post.id}>
    <h3>{post.title}</h3>
    <Wrap>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </Wrap>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
    <ReactionButtons post={post} />
  </PostExcerpt>
)

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => <Post key={post.id} post={post} />)
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <Section className="posts-list">
      <h2>Posts</h2>
      {content}
    </Section>
  )
}

export default PostsList
