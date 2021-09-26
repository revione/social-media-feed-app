// hooks
import { useSelector } from "app/hooks"
// styles
import { Span } from "./styles"

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )

  return <Span>by {author ? author.name : "Unknown author"}</Span>
}

export default PostAuthor
