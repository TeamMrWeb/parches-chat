import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"
import { addFriend } from "../../graphql/mutations"

export const useAddFriend = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const { lazyQueryMethod: addUserFriend } = useFetchingMethod(addFriend)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (inputValue.length === 0) setResults([])
    setIsLoading(true)
    const timer = setTimeout(async () => {
      const res = await getFriendByUsername({ variables: { username: inputValue } })
      const users = res.data.users
      setIsLoading(false)
      setResults(users)
    }, 1000)
    return () => clearTimeout(timer)
  }, [inputValue])

  const addFriendById = (userId: string) => addUserFriend({ variables: { userId } })

  return { setInputValue, inputValue, results, isLoading, addFriendById }
}
