import { setChat } from "../../slicers/chatSlice"
import { chatById } from "../../graphql/queries"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"

export default function Group({ id, image }: { id: string; image: string }) {
  const { lazyQueryMethod: getChatById } = useFetchingMethod(chatById, setChat)

  return (
    <li className="group" onClick={() => getChatById(id)}>
      <img className="group__image" src={image} alt="Imágen de grupo" />
    </li>
  )
}
