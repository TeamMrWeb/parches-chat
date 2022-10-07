import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useNotifications } from "../../hooks/useNotifications"

interface User {
  __typename: string
  id: string
  username: string
  avatar: string
}

export const useChat = () => {
  const navigate = useNavigate()
  const chat = useSelector((state: any) => state.chat)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const { updateTitle, getNotificationsNumber, setDefaultTitle } = useNotifications()

  useEffect(() => {
    const auth = localStorage.auth
    !auth && navigate("/login")
  }, [])

  useEffect(() => {
    if (!chat.id) return
    const possiblyAuthor = chat.users.find((user: User) => user.id !== loggedUser.id)
    const notifications = JSON.parse(localStorage.getItem("notifications") as string)
    const authorIndex = notifications.findIndex((notification: any) => notification.author === possiblyAuthor.id)
    if (authorIndex === -1) return
    notifications.splice(authorIndex, 1)
    localStorage.setItem("notifications", JSON.stringify(notifications))
    const notificationsNumber = getNotificationsNumber(notifications)
    notificationsNumber === 0 && setDefaultTitle()
    notificationsNumber >= 1 && updateTitle(notificationsNumber)
  }, [chat])
}
