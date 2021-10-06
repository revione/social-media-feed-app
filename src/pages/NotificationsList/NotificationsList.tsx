// libraries
import { useLayoutEffect } from "react"
import { formatDistanceToNow, parseISO } from "date-fns"
// hooks
import { useSelector, useDispatch } from "app/hooks"
// styles
import { Section, Notification } from "./styles"

import { selectAllUsers } from "slices/users"

import {
  selectAllNotifications,
  allNotificationsRead,
} from "slices/notifications"

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    }

    return (
      <Notification key={notification.id} new={notification.isNew}>
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
