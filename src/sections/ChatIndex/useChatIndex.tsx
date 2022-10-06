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

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getUserLoggedId, loading } = useFetchingMethod(LoggedUserId, setLoggedUserField)
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION)
  const dispatch = useDispatch()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })

  useEffect(() => {
    const userAlreadyLogged = Object.keys(loggedUser).length !== 0
    if (userAlreadyLogged) return
    getUserLoggedId()
  }, [loggedUser, loading])

  useEffect(() => {
    if (data) {
      console.log({ data })
      dispatch(setSuscriptionMessage(data))
    }
  }, [data])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById }
}
