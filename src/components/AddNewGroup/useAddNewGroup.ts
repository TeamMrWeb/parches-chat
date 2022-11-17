import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { GET_FRIENDS_FROM_LOGGED_USER } from "../../graphql/queries"
import { RootState } from "../../ts/interfaces"

export const useAddNewGroup = () => {
  const [friends, setFriends] = useState([])
  const [usersToGroup, setUsersToGroup] = useState([])
  const [showNextStep, setShowNextStep] = useState(false)
  const { lazyQueryMethod: getFriendsFromLoggedUser } = useFetchingMethod(
    GET_FRIENDS_FROM_LOGGED_USER
  )
  const loggedUser = useSelector((state: RootState) => state.loggedUser)

  useEffect(() => {
    getFriends()
  }, [])

  const getFriends = async () => {
    const res = await getFriendsFromLoggedUser({
      variables: { userId: loggedUser.id, isGroup: false }
    })
    setFriends(res.data.friends)
  }

  const nexStep = () => {
    setShowNextStep(true)
  }

  return {
    friends,
    loggedUser,
    usersToGroup,
    setUsersToGroup,
    nexStep,
    showNextStep,
    setShowNextStep
  }
}
