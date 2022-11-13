import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ChatDataProps, RootState, UserProps } from "../../ts/interfaces"

export const useChatInfoHeader = () => {
  const [chatData, setChatData] = useState<ChatDataProps>()
  const chat = useSelector((state: RootState) => state.chat)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const groupMembersElement = document.querySelector(".group-members")

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
    const chatIndexWrapperElement = document.querySelector(".chat-index-wrapper")
    chatIndexWrapperElement!.className = `${chatIndexWrapperElement!.classList[0]} expanded`
    const chatContainerElement = document.querySelector(".chat-container")
    chatContainerElement!.className = `${chatContainerElement!.classList[0]} disabled`
  }

  useEffect(() => {
    groupMembersElement && toggleGroupMembers()
  }, [groupMembersElement])

  const toggleGroupMembers = () => {
    if (groupMembersElement && groupMembersElement.classList[1] === "expanded")
      groupMembersElement.className = groupMembersElement.classList[0]
    else groupMembersElement?.classList.add("expanded")
  }

  return { chatData, expandChatIndexWrapper, toggleGroupMembers }
}
