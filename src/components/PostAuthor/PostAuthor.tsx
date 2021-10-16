// hooks
import { useSelector } from "app/hooks"
// actions
import { selectUserById } from "slices/users"
// styles
import { Span } from "./styles"

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useSelector((state) => selectUserById(state, userId))

  return <Span>by {author ? author.name : "Unknown author"}</Span>
}

export default PostAuthor
