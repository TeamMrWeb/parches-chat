import { useEffect, useState } from "react"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { usersByUsername } from "../../graphql/queries"

export const useAddFriend = () => {
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])
  const { lazyQueryMethod: getFriendByUsername } = useFetchingMethod(usersByUsername, setResults)

  useEffect(() => {
    const timer = setTimeout(() => {
      // getFriendByUsername({ variables: { username: inputValue } })
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  return { setInputValue, inputValue, results }
}
