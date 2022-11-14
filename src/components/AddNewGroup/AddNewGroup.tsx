import CreateGroup from "../CreateGroup/CreateGroup"
import FriendsResults from "../FriendsResults/FriendsResults"
import SearchFriends from "../SearchFriends/SearchFriends"
import { useAddNewGroup } from "./useAddNewGroup"

export default function AddNewGroup({
  setShowAddNewGroup
}: {
  setShowAddNewGroup: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    friends,
    loggedUser,
    usersToGroup,
    setUsersToGroup,
    nexStep,
    showNextStep,
    setShowNextStep
  } = useAddNewGroup()

  return (
    <section className="add-new-group">
      {showNextStep ? (
        <CreateGroup
          friendsAdded={usersToGroup}
          setShowNextStep={setShowNextStep}
          setShowAddNewGroup={setShowAddNewGroup}
          setUsersToGroup={setUsersToGroup}
        />
      ) : (
        <div className="add-new-group-wrapper">
          <SearchFriends
            title="Crea un nuevo grupo"
            showModal={setShowAddNewGroup}
            type="addNewGroup"
            onChecked={setUsersToGroup}
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
          {usersToGroup.length >= 1 ? (
            <button className="next-step" onClick={() => nexStep()}>
              Siguiente
            </button>
          ) : null}
        </div>
      )}
    </section>
  )
}
