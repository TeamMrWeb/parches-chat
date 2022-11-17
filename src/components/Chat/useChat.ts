import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useSubscription } from "@apollo/client"
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions"
import { useNotifications } from "../../hooks/useNotifications"
import { setSuscriptionMessage } from "../../slicers/messagesSlice"
import { NotificationProps, RootState, UserProps } from "../../ts/interfaces"
import { useShowChatIndexWrapperContext } from "../../contexts/showChatIndexWrapperContext"
import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import { useShowChatContainerContext } from "../../contexts/ShowChatContainerContext"

export const useChat = () => {
  const navigate = useNavigate()
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const chat = useSelector((state: RootState) => state.chat)
  const { updateTitle, getNotificationsNumber, setDefaultTitle } = useNotifications()
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { chatId: chat.id } })
  const dispatch = useDispatch()
  const [showButton, setShowButton] = useState(false)
  const scrollBottom = useRef<HTMLDivElement>(null)
  const { setShowChatIndexWrapper } = useShowChatIndexWrapperContext()
  const { showChatContainer, setShowChatContainer } = useShowChatContainerContext()
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()

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
    const possiblyAuthor = chat?.users?.find((user: UserProps) => user.id !== loggedUser.id)
    const notifications = JSON.parse(localStorage.getItem("notifications") as string)
    const authorIndexFromNotifications = notifications.findIndex(
      (notification: NotificationProps) => notification.author === possiblyAuthor?.id
    )
    if (authorIndexFromNotifications === -1) return
    notifications.splice(authorIndexFromNotifications, 1)
    localStorage.setItem("notifications", JSON.stringify(notifications))
    const notificationsNumber = getNotificationsNumber(notifications)
    notificationsNumber === 0 && setDefaultTitle()
    notificationsNumber >= 1 && updateTitle(notificationsNumber.toString())
  }, [chat])

  useEffect(() => {
    const onScroll = (e: Event) => {
      ;(e.target as HTMLDivElement).scrollTop <= -50 ? setShowButton(true) : setShowButton(false)
    }
    const messagesSection = document.querySelector(".messages")
    messagesSection?.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goDown = () => {
    const messagesSection = document.querySelector(".messages")
    if (messagesSection) messagesSection.scrollTop = 0
  }

  const focusOnChat = () => {
    if (showChatInfoSidebar || window.innerWidth >= 900 || showChatContainer) return
    setShowChatIndexWrapper!(false)
    setShowChatInfoSidebar!(false)
    setShowChatContainer!(true)
  }

  return { showButton, goDown, scrollBottom, chat, focusOnChat }
}
