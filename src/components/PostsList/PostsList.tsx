// hooks
import { useSelector } from "app/hooks"
// styles
import { Section, Post } from "./styles"

const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  const renderedPosts = posts.map((post) => (
    <Post className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
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
