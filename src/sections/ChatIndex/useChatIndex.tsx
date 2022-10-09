import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION } from "../../graphql/subscriptions"
import { LoggedUserId, chatById } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { useShowChat } from "../../contexts/ShowChatContext"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"
import { useNotifications } from "../../hooks/useNotifications"
import { useSubscription } from "@apollo/client"
import { startLoaderSpinner } from "../../slicers/loaderSpinnerSlice"

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getLoggedUserId, loading: loggedUserLoading } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()
  const { data } = useSubscription(LOGGED_USER_MESSAGE_NOTIFICATION_SUSCRIPTION, { variables: { userId: loggedUser.id } })
  const dispatch = useDispatch()
  const { emitSoundOnNewMessage, showNewNotificationOnBrowserTab, showCurrentNotificationsOnBrowserTab } = useNotifications()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />

  useEffect(() => {
    const userAlreadyLogged = Object.keys(loggedUser).length !== 0
    if (userAlreadyLogged) return
    getLoggedUserId()
  }, [loggedUser, loggedUserLoading])

  useEffect(() => {
    if (!data) return
    emitSoundOnNewMessage()
    showNewNotificationOnBrowserTab(data.userMessageNotification.author.id)
  }, [data])

  useEffect(() => {
    showCurrentNotificationsOnBrowserTab()
    dispatch(startLoaderSpinner())
  }, [])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile }
}
