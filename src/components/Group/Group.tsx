import { setChat } from "../../slicers/chatSlice"
import { chatById } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
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

  return (
    <li
      className="group"
      onClick={() => {
        setFirstAccess(false), setShowChat && setShowChat(true), getChatById({ variables: { id } })
      }}
    >
      <img className="group__image" src={image} alt="Imágen de grupo" />
    </li>
  )
}
