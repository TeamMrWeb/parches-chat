import { useEffect, useState } from "react"
import { chats } from "../../graphql/queries/queries"

export const useGroups = () => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getGroups()
  }, [])

  const getGroups = () => {
    //traer grupos
  }

  return { groups }
}
