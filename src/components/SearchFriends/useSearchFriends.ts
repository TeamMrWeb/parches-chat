import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"
import { RootState } from "../../ts/interfaces"

export const useSearchFriends = () => {
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])

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

  return { isLoading, results, loggedUser, inputValue, setInputValue }
}
