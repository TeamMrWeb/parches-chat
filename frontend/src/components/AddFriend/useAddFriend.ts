import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createChatBetweenFriends, sendFriendRequestToUser } from "../../graphql/mutations"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { usersByUsername } from "../../graphql/queries"
import { createAlertMessage } from "../../slicers/alertMessageSlice"

export const useAddFriend = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const loggedUser = useSelector((state: any) => state.loggedUser)
  const [createChat] = useMutation(createChatBetweenFriends, {
    refetchQueries: [{ query: chatsFromLoggedUser, variables: { userId: loggedUser.id, isGroup: false } }]
  })
  const { lazyQueryMethod: sendFriendRequest } = useFetchingMethod(sendFriendRequestToUser)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])
  const dispatch = useDispatch()

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

  const addFriendToLoggedUser = async (friendId: string, friendUsername: string) => {
    await sendFriendRequest({ variables: { userId: friendId, senderId: loggedUser.id } }).then(async (res: any) => {
      if (!res.data) return
      dispatch(
        createAlertMessage({
          title: "Se ha agregado a un nuevo amigo",
          type: "success",
          visible: true
        })
      )
      await createChat({ variables: { name: friendUsername, usersId: [loggedUser.id, friendId] } })
    })
  }

  return { setInputValue, inputValue, results, isLoading, addFriendToLoggedUser }
}
