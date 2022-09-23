import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"
import { addFriend } from "../../graphql/mutations"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../../slicers/alertMessageSlice"

export const useAddFriend = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const { lazyQueryMethod: addUserFriend } = useFetchingMethod(addFriend)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
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

  const addFriendById = async (userId: string) => {
    const res = await addUserFriend({ variables: { userId } })
    res.data &&
      dispatch(
        createAlertMessage({
          title: "Se ha agregado a un nuevo amigo",
          type: "success",
          visible: true
        })
      )
  }

  return { setInputValue, inputValue, results, isLoading, addFriendById }
}
