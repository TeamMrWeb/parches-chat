import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setLoggedUserField } from "../../slicers/loggedUserSlice"
import { setChat } from "../../slicers/chatSlice"
import { LoggedUserId, chatById } from "../../graphql/queries"
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

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })

  useEffect(() => {
    const userAlreadyLogged = Object.keys(loggedUser).length !== 0
    if (userAlreadyLogged) return
    getUserLoggedId()
  }, [loggedUser, loading])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById }
}
