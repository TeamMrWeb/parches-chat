import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useSubscription } from "@apollo/client"
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions"
import { useNotifications } from "../../hooks/useNotifications"
import { setSuscriptionMessage } from "../../slicers/messagesSlice"

interface User {
  __typename: string
  id: string
  username: string
  avatar: string
}

export const useChat = () => {
  const navigate = useNavigate()
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const { updateTitle, getNotificationsNumber, setDefaultTitle } = useNotifications()
  const chat = useSelector((state: any) => state.chat)
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { chatId: chat.id } })
  const dispatch = useDispatch()
  const [showButton, setShowButton] = useState(false)
  const scrollBottom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const auth = localStorage.auth
    !auth && navigate("/login")
  }, [])

  useEffect(() => {
    if (!data) return
    dispatch(setSuscriptionMessage(data))
  }, [data])

  useEffect(() => {
    if (!chat.id) return
    const possiblyAuthor = chat.users.find((user: User) => user.id !== loggedUser.id)
    const notifications = JSON.parse(localStorage.getItem("notifications") as string)
    const authorIndexFromNotifications = notifications.findIndex((notification: any) => notification.author === possiblyAuthor.id)
    if (authorIndexFromNotifications === -1) return
    notifications.splice(authorIndexFromNotifications, 1)
    localStorage.setItem("notifications", JSON.stringify(notifications))
    const notificationsNumber = getNotificationsNumber(notifications)
    notificationsNumber === 0 && setDefaultTitle()
    notificationsNumber >= 1 && updateTitle(notificationsNumber.toString())
  }, [chat])

  useEffect(() => {
    const onScroll = (e: any) => {
      e.target.scrollTop <= -50 ? setShowButton(true) : setShowButton(false)
    }
    const messagesSection = document.querySelector(".messages")
    messagesSection?.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goDown = () => {
    const messagesSection = document.querySelector(".messages")
    if (messagesSection) messagesSection.scrollTop = 0
  }

  return { showButton, goDown, scrollBottom }
}
