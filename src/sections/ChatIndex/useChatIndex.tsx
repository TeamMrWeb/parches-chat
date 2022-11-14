import { RefObject, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLoaderSpinner } from "../../slicers/loaderSpinnerSlice"
import { LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION } from "../../graphql/subscriptions"
import { useSubscription } from "@apollo/client"
import { useShowChat } from "../../contexts/ShowChatContext"
import { useNotifications } from "../../hooks/useNotifications"
import { Chat } from "../../components"
import Home from "../Home/Home"
import { RootState, UserProps } from "../../ts/interfaces"

const maxMobileDeviceWidth = 550
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const chat = useSelector((state: RootState) => state.chat)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()
  const { data } = useSubscription(LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION, {
    variables: { userId: loggedUser.id }
  })
  const dispatch = useDispatch()
  const {
    emitSoundOnNewMessage,
    showNewNotificationOnBrowserTab,
    showCurrentNotificationsOnBrowserTab
  } = useNotifications()

  const desktopBehaviour = () => (showChat ? <Chat /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat />

  const checkIfIsAlreadyOnChat = () => {
    if (!chat.users) return
    const author = chat.users.find((user: UserProps) => user.id !== loggedUser.id)
    return author?.id === data.userMessageNotification.author.id
  }

  useEffect(() => {
    if (
      !data ||
      data.userMessageNotification.author.id === loggedUser.id ||
      checkIfIsAlreadyOnChat()
    )
      return
    emitSoundOnNewMessage()
    showNewNotificationOnBrowserTab(data.userMessageNotification.author.id)
  }, [data])

  useEffect(() => {
    showCurrentNotificationsOnBrowserTab()
    dispatch(startLoaderSpinner())
  }, [])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile }
}
