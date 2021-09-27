// libraries
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// actions
import { selectUserById } from "features/users/slice"
import { selectAllPosts } from "features/posts/slice"
// styles
import { Section } from "./styles"

const UserPage = ({ match }: { match: { params: { userId: string } } }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

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
