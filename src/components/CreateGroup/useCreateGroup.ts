import { useState } from "react"
import { useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { CREATE_GROUP } from "../../graphql/mutations"
import { UserProps, RootState } from "../../ts/interfaces"

export const useCreateGroup = () => {
  const [name, setName] = useState("Nuevo Grupo")
  const [avatar, setAvatar] = useState<File>()
  const { lazyQueryMethod: creatGroup } = useFetchingMethod(CREATE_GROUP)
  const loggedUser = useSelector((state: RootState) => state.loggedUser)

  const createGroup = (
    friends: UserProps[],
    name: string = "Nuevo grupo",
    avatar: File | undefined
  ) => {
    const friendsId = friends.map((friend: UserProps) => friend.id)
    const usersId = [...friendsId, loggedUser.id]
    console.log(friendsId, usersId, name, avatar)
    creatGroup({ variables: { name, usersId, avatar } })
  }

  return { name, setName, avatar, setAvatar, createGroup }
}
