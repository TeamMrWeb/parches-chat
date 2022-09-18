import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setUserLoggedField } from "../../slicers/userLoggedSlice"
import { setChat } from "../../slicers/chatSlice"
import { userLoggedId, chatById } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { useShowChat } from "../../contexts/ShowChatContext"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getUserLoggedId, loading } = useFetchingMethod(userLoggedId, setUserLoggedField)
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)
  const userLogged = useSelector((state: any) => state.userLogged)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })

  useEffect(() => {
    const userAlreadyLogged = Object.keys(userLogged).length !== 0
    if (userAlreadyLogged) return
    getUserLoggedId()
  }, [userLogged, loading])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile, getChatById }
}
