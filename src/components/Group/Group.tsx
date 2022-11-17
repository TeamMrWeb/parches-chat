import { setChat } from "../../slicers/chatSlice"
import { chatById } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { useShowChatIndexWrapperContext } from "../../contexts/showChatIndexWrapperContext"
import { useShowChatContainerContext } from "../../contexts/ShowChatContainerContext"
import { useShowChat } from "../../contexts/ShowChatContext"

export default function Group({
  id,
  image,
  setFirstAccess
}: {
  id: string
  image: string
  setFirstAccess: (firstAccess: boolean) => void
}) {
  const { lazyQueryMethod: getChatById } = useFetchingMethod(chatById, setChat)
  const { setShowChat } = useShowChat()
  const { setShowChatIndexWrapper } = useShowChatIndexWrapperContext()
  const { setShowChatContainer } = useShowChatContainerContext()

  return (
    <li
      className="group"
      onClick={() => {
        setFirstAccess(false)
        setShowChat!(true)
        setShowChatContainer!(true)
        if (window.innerWidth <= 900) setShowChatIndexWrapper!(false)
        getChatById({ variables: { id } })
      }}
    >
      <img className="group__image" src={image} alt="Imágen de grupo" />
    </li>
  )
}
