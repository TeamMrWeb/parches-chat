import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../ts/interfaces"

export const useSearch = (getter: any, variables: any) => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    if (inputValue.length === 0) return setResults([])
    setIsLoading(true)
    const timer = setTimeout(async () => {
      const variablesObject = { ...variables }
      let variableKey = Object.keys(Object.values(variablesObject)[0]!)[0]
      variablesObject.variables[variableKey] = inputValue
      const res = await getter(variablesObject)
      const users = res.data.users
      setIsLoading(false)
      users && setResults(users)
    }, 1000)
    return () => clearTimeout(timer)
  }, [inputValue])

  return { isLoading, results, loggedUser, inputValue, setInputValue }
}
