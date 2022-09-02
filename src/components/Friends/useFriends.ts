import { useEffect, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    getFriends()
  }, [])

  const getFriends = () => {
    //traer amigos
  }

  return { friends }
}
