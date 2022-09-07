import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setUserLoggedField } from "../../slicers/userLoggedSlice"
import { userLoggedId } from "../../graphql/queries/queries"
import { useLazyQueries } from "../../apollo/useLazyQueries"
import { useShowChat } from "../../contexts/ShowChatContext"
import Chat from "../../components/Chat/Chat"
import Home from "../Home/Home"

const maxMobileDeviceWidth = 480
const notMobile = window.screen.width >= maxMobileDeviceWidth

export const useChatIndex = (chatContainer: React.MutableRefObject<undefined>) => {
  const { lazyQueryMethod: getUserLoggedId, loading } = useLazyQueries(userLoggedId, setUserLoggedField)
  const userLogged = useSelector((state: any) => state.userLogged)
  const [firstAccess, setFirstAccess] = useState(!notMobile)
  const { showChat } = useShowChat()

  const desktopBehaviour = () => (showChat ? <Chat chatContainer={chatContainer} /> : <Home />)
  const mobileBehaviour = () => !firstAccess && <Chat chatContainer={chatContainer} />

  useEffect(() => {
    const userAlreadyLogged = Object.keys(userLogged).length !== 0
    if (userAlreadyLogged) return
    getUserLoggedId()
  }, [userLogged, loading])

  return { firstAccess, setFirstAccess, mobileBehaviour, desktopBehaviour, notMobile }
}
