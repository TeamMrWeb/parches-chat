import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"
import { sendFriendRequestToUser, createChatBetweenFriends } from "../../graphql/mutations"
import { useDispatch, useSelector } from "react-redux"
import { createAlertMessage } from "../../slicers/alertMessageSlice"

export const useAddFriend = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const { lazyQueryMethod: sendFriendRequest } = useFetchingMethod(sendFriendRequestToUser)
  const { lazyQueryMethod: createChat } = useFetchingMethod(createChatBetweenFriends)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])
  const dispatch = useDispatch()
  const loggedUser = useSelector((state: any) => state.loggedUser)

  useEffect(() => {
    if (inputValue.length === 0) return setResults([])
    setIsLoading(true)
    const timer = setTimeout(async () => {
      const res = await getFriendByUsername({ variables: { username: inputValue } })
      const users = res.data.users
      setIsLoading(false)
      users && setResults(users)
    }, 1000)
    return () => clearTimeout(timer)
  }, [inputValue])

  const addFriendToLoggedUser = (friendId: string, friendUsername: string) => {
    console.log(loggedUser, friendId)
    sendFriendRequest({ variables: { userId: friendId, senderId: loggedUser.id } }).then((res: any) => {
      if (!res.data) return
      dispatch(
        createAlertMessage({
          title: "Se ha agregado a un nuevo amigo",
          type: "success",
          visible: true
        })
      )
      createChat({ variables: { name: friendUsername, usersId: [loggedUser.id, friendId] } })
    })
  }

  return { setInputValue, inputValue, results, isLoading, addFriendToLoggedUser }
}
