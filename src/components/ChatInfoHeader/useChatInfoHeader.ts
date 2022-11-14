import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useShowChatIndexWrapperContext } from "../../contexts/showChatIndexWrapperContext"
import { useShowChatContainerContext } from "../../contexts/ShowChatContainerContext"
import { ChatDataProps, RootState, UserProps } from "../../ts/interfaces"

export const useChatInfoHeader = () => {
  const [chatData, setChatData] = useState<ChatDataProps>()
  const chat = useSelector((state: RootState) => state.chat)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const { setShowChatIndexWrapper } = useShowChatIndexWrapperContext()
  const { setShowChatContainer } = useShowChatContainerContext()

  useEffect(() => {
    if (Object.keys(chat).length === 0) return
    let id = chat.id!,
      name,
      avatar
    if (chat.isGroup) {
      name = chat.name!
      avatar = chat.avatar!
    } else {
      const loggedUserId = loggedUser.id
      name = chat?.users?.find((user: UserProps) => user.id !== loggedUserId)?.username!
      avatar = chat.users![0].avatar
    }
    setChatData({ ...chatData, id, name, avatar, isGroup: chat.isGroup! })
  }, [chat])

  const expandChatIndexWrapper = () => {
    setShowChatIndexWrapper!(true)
    setShowChatContainer!(false)
  }

  return { chatData, expandChatIndexWrapper }
}
