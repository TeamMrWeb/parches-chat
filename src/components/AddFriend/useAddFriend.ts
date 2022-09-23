import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"
import { addFriend, createChatBetweenFriends } from "../../graphql/mutations"
import { useDispatch, useSelector } from "react-redux"
import { createAlertMessage } from "../../slicers/alertMessageSlice"

export const useAddFriend = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const { lazyQueryMethod: addUserFriend } = useFetchingMethod(addFriend)
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

  const addFriendById = (userId: string) => {
    addUserFriend({ variables: { userId } })
      .then((res: any) => {
        console.log({ res })
        dispatch(
          createAlertMessage({
            title: "Se ha agregado a un nuevo amigo",
            type: "success",
            visible: true
          })
        )
        const friend = res.data.addUserFriend
        createChat({ variables: { name: friend.username, usersId: [loggedUser.id, friend.id] } })
      })
      .catch(() => {
        return
      })
  }

  return { setInputValue, inputValue, results, isLoading, addFriendById }
}
