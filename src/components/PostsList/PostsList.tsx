// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// components
import PostAuthor from "components/PostAuthor"
// styles
import { Section, Post } from "./styles"

const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  const renderedPosts = posts.map((post) => (
    <Post className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.userId} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
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
