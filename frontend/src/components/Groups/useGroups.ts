import { useEffect, useState } from "react"

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
