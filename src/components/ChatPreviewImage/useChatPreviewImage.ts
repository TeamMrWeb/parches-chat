import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createMessage } from "../../graphql/mutations"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { RootState } from "../../ts/interfaces"

export const useChatPreviewImage = (
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>
) => {
  const { lazyQueryMethod: createNewMessage } = useFetchingMethod(createMessage)
  const chat = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()

  const sendImages = (images: File[], text: string = "a") => {
    const imageUploadUrl = import.meta.env.VITE_UPLOAD_IMAGE
    images.forEach(async image => {
      const messageCreated = await createNewMessage({
        variables: { chatId: chat.id, text, hasImage: true }
      })
      const messageId = messageCreated.data.createMessage.id
      const chatId = chat.id
      let formData = new FormData()
      formData.append("image", image)
      fetch(`${imageUploadUrl}${chatId}/${messageId}`, {
        method: "POST",
        headers: {
          auth: localStorage.getItem("accessToken")!
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => {
          console.error("Error:", error)
          dispatch(
            createAlertMessage({
              title: "Ocurrió un error al subir la imagen",
              description: "Intenta de nuevo más tarde",
              type: "error",
              visible: true
            })
          )
        })
    })
  }

  const removeImage = (imageId: number) => {
    const imagesCopy = [...images]
    imagesCopy.splice(imageId, 1)
    setImages(imagesCopy)
  }

  return { sendImages, removeImage }
}
