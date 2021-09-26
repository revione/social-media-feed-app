// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// actions
import { selectAllPosts } from "features/posts/slice"
// components
import PostAuthor from "components/PostAuthor"
import TimeAgo from "components/TimeAgo"
import ReactionButtons from "components/ReactionButtons"
// styles
import { Section, Post, Wrap } from "./styles"

const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <Post className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <Wrap>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </Wrap>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButtons post={post} />
    </Post>
  ))

  return (
    <Section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </Section>
  )
}

export default PostsList
