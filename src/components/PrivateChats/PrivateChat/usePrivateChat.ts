import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../../apollo/useFetchingMethod"
import { useShowChat } from "../../../contexts/ShowChatContext"
import { chatById, messagesByChatId } from "../../../graphql/queries"
import { setChat } from "../../../slicers/chatSlice"
import { RootState } from "../../../ts/interfaces"

const borderColors = ["green", "orange", "red", "gray"]

export const usePrivateChat = ({ id }: { id: string }) => {
  const [lastMessage, setLastMessage] = useState<any>()
  const { setShowChat } = useShowChat()
  const chat = useSelector((state: RootState) => state.chat)
  const getChatById = (chatId: string) => getChatByid({ variables: { id: chatId } })
  const { lazyQueryMethod: getChatByid } = useFetchingMethod(chatById, setChat)
  const { lazyQueryMethod: getLastMessage } = useFetchingMethod(messagesByChatId, setLastMessage)

  useEffect(() => {
    getLastMessage({ variables: { id: id, limit: 1, skip: 0, orderBy: "DESC" } })
  }, [])

  const defineChatActive = (id: string) =>
    chat.id === id ? "loggedUser-chat active" : "loggedUser-chat"

  return { setShowChat, getChatById, defineChatActive, borderColors, lastMessage }
}
