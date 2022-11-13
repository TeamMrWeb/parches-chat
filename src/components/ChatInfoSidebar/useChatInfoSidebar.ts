import { useSelector } from "react-redux"
import { ChatProps, RootState } from "../../ts/interfaces"

export const useChatInfoSidebar = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)

  const defineChatAvatar = (chat: ChatProps) =>
    chat.avatar
      ? chat.avatar.secure_url
      : chat.users?.find(user => user.id !== loggedUser.id)?.avatar.secure_url

  const defineChatName = (chat: ChatProps) =>
    chat.name ? chat.name : chat.users?.find(user => user.id !== loggedUser.id)?.username

  return { defineChatAvatar, defineChatName }
}
