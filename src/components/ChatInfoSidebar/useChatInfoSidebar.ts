import { useSelector } from "react-redux"
import { useShowChatInfoSidebarContext } from "../../contexts/ShowChatInfoSIdebarContext"
import { useShowChatContainerContext } from "../../contexts/ShowChatContainerContext"
import { ChatProps, RootState } from "../../ts/interfaces"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { DELETE_CHAT } from "../../graphql/mutations"

export const useChatInfoSidebar = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const { showChatInfoSidebar, setShowChatInfoSidebar } = useShowChatInfoSidebarContext()
  const { setShowChatContainer } = useShowChatContainerContext()
  const { lazyQueryMethod: deleteChat } = useFetchingMethod(DELETE_CHAT)

  const defineChatAvatar = (chat: ChatProps) =>
    chat.avatar
      ? chat.avatar.secure_url
      : chat.users?.find(user => user.id !== loggedUser.id)?.avatar.secure_url

  const defineChatName = (chat: ChatProps) =>
    chat.name ? chat.name : chat.users?.find(user => user.id !== loggedUser.id)?.username

  const closeChatInfoSidebar = () => {
    setShowChatInfoSidebar!(!showChatInfoSidebar)
    setShowChatContainer!(true)
  }

  const deleteFriend = (chat: ChatProps) => {
    deleteChat({ variables: { chatId: chat.id } })
  }

  return { defineChatAvatar, defineChatName, closeChatInfoSidebar, deleteFriend }
}
