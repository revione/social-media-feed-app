// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// styles
import { Section } from "./styles"

const SinglePost = ({ match }: { match: any }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  if (!post) {
    return (
      <Section>
        <h2>Post not found!</h2>
      </Section>
    )
  }

  return (
    <Section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </Section>
  )
}

export default SinglePost
