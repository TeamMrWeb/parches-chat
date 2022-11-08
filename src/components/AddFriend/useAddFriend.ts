import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createChatBetweenFriends, sendFriendRequestToUser } from "../../graphql/mutations"
import { chatsFromLoggedUser } from "../../graphql/queries"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { AddFriendErrorResponseProps, AddFriendResponseProps, RootState } from "../../ts/interfaces"

export const useAddFriend = () => {
  const loggedUser = useSelector((state: RootState) => state.loggedUser)
  const [createChat] = useMutation(createChatBetweenFriends, {
    refetchQueries: [
      { query: chatsFromLoggedUser, variables: { userId: loggedUser.id, isGroup: false } }
    ]
  })
  const { lazyQueryMethod: sendFriendRequest } = useFetchingMethod(sendFriendRequestToUser)
  const dispatch = useDispatch()

  const addFriendToLoggedUser = async (friendId: string, friendUsername: string) => {
    await sendFriendRequest({ variables: { userId: friendId, senderId: loggedUser.id } }).then(
      async (res: AddFriendResponseProps | AddFriendErrorResponseProps) => {
        if (!res.data) return
        dispatch(
          createAlertMessage({
            title: "Se ha agregado a un nuevo amigo",
            type: "success",
            visible: true
          })
        )
        await createChat({
          variables: { name: friendUsername, usersId: [loggedUser.id, friendId] }
        })
      }
    )
  }

  return { addFriendToLoggedUser }
}
