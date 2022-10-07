import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSubscription } from "@apollo/client"
import { setSuscriptionMessage } from "../../slicers/messagesSlice"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { setChat } from "../../slicers/chatSlice"
import { LoggedUserId, chatById } from "../../graphql/queries"
import { MESSAGES_SUBSCRIPTION } from "../../graphql/subscriptions"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { useShowChat } from "../../contexts/ShowChatContext"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"
import { useNotifications } from "../../hooks/useNotifications"

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getLoggedUserId, loading } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION)
  const dispatch = useDispatch()
  const { emitSoundOnNewMessage, showNewNotificationOnBrowserTab, showCurrentNotificationsOnBrowserTab } = useNotifications()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })

  useEffect(() => {
    const userAlreadyLogged = Object.keys(loggedUser).length !== 0
    if (userAlreadyLogged) return
    getLoggedUserId()
  }, [loggedUser, loading])

  useEffect(() => {
    if (data) {
      if (data.messageAdded.author.id !== loggedUser.id) {
        emitSoundOnNewMessage()
        showNewNotificationOnBrowserTab(data.messageAdded.author.id)
      }
      dispatch(setSuscriptionMessage(data))
    }
  }, [data])

  useEffect(() => {
    showCurrentNotificationsOnBrowserTab()
  }, [])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById }
}
