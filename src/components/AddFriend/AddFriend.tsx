import { useAddFriend } from "./useAddFriend"
import SearchFriends from "../SearchFriends/SearchFriends"

export default function AddFriend({
  setShowAddFriend
}: {
  setShowAddFriend: (showAddFriend: boolean) => void
}) {
  const { addFriendToLoggedUser } = useAddFriend()

  return (
    <SearchFriends
      title="Agrega a un amigo por su nombre de usuario"
      showModal={setShowAddFriend}
      setAction={addFriendToLoggedUser}
    />
  )
}
