import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState, UserProps } from "../../ts/interfaces"

export const useGroupMembers = () => {
  const [groupMembers, setGroupMembers] = useState<UserProps[]>([])
  const [statusList, setStatusList] = useState<any>([])
  const chat = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    if (!chat) return
    setStatusList([...new Set(chat.users?.map(user => user.status))])
    console.log(statusList)
    setGroupMembers(chat.users!)
  }, [chat])

  const membersOfStatus = (status: number) => {
    return groupMembers.filter(member => member.status === status)
  }

  return { groupMembers, statusList, membersOfStatus }
}
