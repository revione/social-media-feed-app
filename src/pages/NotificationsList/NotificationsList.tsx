// libraries
import { useSelector } from "app/hooks"
import { formatDistanceToNow, parseISO } from "date-fns"
// styles
import { Section, Notification } from "./styles"

import { selectAllUsers } from "features/users/slice"

import { selectAllNotifications } from "features/notifications/slice"

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    }

    return (
      <Notification key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </Notification>
    )
  })

  return (
    <Section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </Section>
  )
}

export default NotificationsList
