// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// actions
import { selectPostById } from "features/posts/slice"
// components
import PostAuthor from "components/PostAuthor"
import TimeAgo from "components/TimeAgo"
import ReactionButtons from "components/ReactionButtons"
// styles
import { Section, Wrap } from "./styles"

const SinglePost = ({ match }: { match: any }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

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
        <Wrap>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </Wrap>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </Section>
  )
}

export default SinglePost
