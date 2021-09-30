// libraries
import { Link } from "react-router-dom"
// hooks
import { useDispatch } from "app/hooks"
//
import { fetchNotifications } from "features/notifications/slice"
// styles
import { Nav, NavContent } from "./styles"

const Navbar = () => {
  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <Nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <NavContent>
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/counter">Counter</Link>
          <Link to="/notifications">Notifications</Link>
        </NavContent>
        <button className="button" onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
      </section>
    </Nav>
  )
}

export default Navbar
