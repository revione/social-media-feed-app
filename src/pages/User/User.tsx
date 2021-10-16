// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// actions
import { selectUserById } from "slices/users"
import { selectPostsByUser } from "slices/posts"
// styles
import { Section } from "./styles"

const UserPage = ({ match }: { match: { params: { userId: string } } }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  return (
    <Section>
      <h2>{user?.name}</h2>

      <ul>
        {postsForUser.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default UserPage
