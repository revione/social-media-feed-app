// libraries
import { Link } from "react-router-dom"
// hooks
import { useDispatch, useSelector } from "app/hooks"
//
import {
  fetchNotifications,
  selectAllNotifications,
} from "features/notifications/slice"
// styles
import { Nav, NavContent, ButtonNotifications } from "./styles"

const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = <span>{numUnreadNotifications}</span>
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
        <ButtonNotifications onClick={fetchNewNotifications}>
          Refresh Notifications <span>{unreadNotificationsBadge}</span>
        </ButtonNotifications>
      </section>
    </Nav>
  )
}

export default Navbar
