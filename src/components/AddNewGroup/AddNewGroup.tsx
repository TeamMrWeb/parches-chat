import { useAddFriend } from "../AddFriend/useAddFriend"
import FriendsResults from "../FriendsResults/FriendsResults"
import SearchFriends from "../SearchFriends/SearchFriends"
import { useAddNewGroup } from "./useAddNewGroup"

export default function AddNewGroup({
  setShowAddNewGroup
}: {
  setShowAddNewGroup: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { addFriendToLoggedUser } = useAddFriend()
  const { friends, loggedUser, setUsersToGroup, nexStep } = useAddNewGroup()

  return (
    <section className="add-new-group">
      <SearchFriends
        title="Crea un nuevo grupo"
        showModal={setShowAddNewGroup}
        type="addNewGroup"
        setAction={addFriendToLoggedUser}
      >
        {friends.length >= 1 ? (
          <FriendsResults
            results={friends}
            loggedUser={loggedUser}
            setAction={null}
            type="addNewGroup"
            onChecked={setUsersToGroup}
          />
        ) : (
          <></>
        )}
      </SearchFriends>
      <button className="next-step" onClick={() => nexStep()}>
        Siguiente
      </button>
    </section>
  )
}
