// libraries
import React from "react"
import { Link } from "react-router-dom"
// hooks
import { useSelector } from "app/hooks"
// actions
import { selectAllUsers } from "slices/users"
// styles
import { Section } from "./styles"

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  return (
    <Section>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default UsersList
