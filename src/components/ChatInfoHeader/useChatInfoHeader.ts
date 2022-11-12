import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useShowChat } from "../../contexts/ShowChatContext"
import { ChatDataProps, RootState, UserProps } from "../../ts/interfaces"

export const useChatInfoHeader = () => {
  const [chatData, setChatData] = useState<ChatDataProps>()
  const { showChat } = useShowChat()
  const chat = useSelector((state: RootState) => state.chat)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)

  useEffect(() => {
    if (Object.keys(chat).length === 0) return
    if (chat.isGroup) {
      const id = chat.id!
      const name = chat.name!
      const avatar = chat.avatar!
      setChatData({ ...chatData, id, name, avatar })
    } else {
      const loggedUserId = loggedUser.id
      const id = chat.id!
      const name = chat?.users?.find((user: UserProps) => user.id !== loggedUserId)?.username!
      const avatar = chat.users![0].avatar
      setChatData({ ...chatData, id, name, avatar })
    }
  }, [chat])

  return { showChat, chatData }
}
