// libraries
import { useDispatch } from "app/hooks"
// actions
import { reactionAdded } from "features/posts/slice"
// types
import { Post } from "features/posts/slice"
// styles
import { Wrapper } from "./styles"

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
}

const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      ))}
    </Wrapper>
  )
}

export default ReactionButtons
