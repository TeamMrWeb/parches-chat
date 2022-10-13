import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLoaderSpinner } from "../../slicers/loaderSpinnerSlice"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION } from "../../graphql/subscriptions"
import { LoggedUserId } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { useSubscription } from "@apollo/client"
import { useShowChat } from "../../contexts/ShowChatContext"
import { useNotifications } from "../../hooks/useNotifications"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getLoggedUserId, loading: loggedUserLoading } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const chat = useSelector((state: any) => state.chat)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()
  const { data } = useSubscription(LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION, { variables: { userId: loggedUser.id } })
  const dispatch = useDispatch()
  const { emitSoundOnNewMessage, showNewNotificationOnBrowserTab, showCurrentNotificationsOnBrowserTab } = useNotifications()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />

  const checkIfIsAlreadyOnChat = () => {
    if (!chat.users) return
    const author = chat.users.find((user: any) => user.id !== loggedUser.id)
    return author.id === data.userMessageNotification.author.id
  }

  useEffect(() => {
    const userAlreadyLogged = Object.keys(loggedUser).length !== 0
    if (userAlreadyLogged) return
    getLoggedUserId()
  }, [loggedUser, loggedUserLoading])

  useEffect(() => {
    if (!data || data.userMessageNotification.author.id === loggedUser.id || checkIfIsAlreadyOnChat()) return
    emitSoundOnNewMessage()
    showNewNotificationOnBrowserTab(data.userMessageNotification.author.id)
  }, [data])

  useEffect(() => {
    showCurrentNotificationsOnBrowserTab()
    dispatch(startLoaderSpinner())
  }, [])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile }
}
