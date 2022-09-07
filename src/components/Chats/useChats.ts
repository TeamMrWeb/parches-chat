import { useEffect, useState } from "react"

export const useChats = () => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    // getFriends()
  }, [])

  const getFriends = () => {
    //traer amigos
  }

  return { chats }
}
