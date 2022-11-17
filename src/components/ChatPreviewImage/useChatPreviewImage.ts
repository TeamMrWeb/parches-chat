import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { createMessage } from "../../graphql/mutations"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { RootState } from "../../ts/interfaces"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MmIxMmYyMGU1Y2E5ZTVlNTBiYWIwIiwidXNlcm5hbWUiOiJHYWJyaWVsIENhcmFtw6lzIiwiZW1haWwiOiJnYWJyaWVsY2FyYW1lczFAZ21haWwuY29tIn0sImlhdCI6MTY2NzgyMDI3MywiZXhwIjoxNjY3OTA2NjczfQ.KdJnu-r160yvroHzi81eHkxxFfwbMdDlP_VqNbM16Lc"

export const useChatPreviewImage = (
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>
) => {
  const { lazyQueryMethod: createNewMessage } = useFetchingMethod(createMessage)
  const chat = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()

  const sendImages = (images: File[], text: string = "a") => {
    const uploadImageUrl = import.meta.env.VITE_UPLOAD_IMAGE
    console.log(images)
    images.forEach(async image => {
      const messageCreated = await createNewMessage({
        variables: { chatId: chat.id, text, hasImage: true }
      })
      const messageId = messageCreated.data.createMessage.id
      const chatId = chat.id
      let formData = new FormData()
      formData.append("image", image, image.name)
      fetch(`${uploadImageUrl}${chatId}/${messageId}`, {
        method: "POST",
        headers: {
          auth: token,
          "Content-Type": "multipart/form-data"
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

  const covertFileImageToJSON = (image: File) => {
    const JSONImage = {
      image: {
        lastModified: image.lastModified,
        name: image.name,
        size: image.size,
        type: image.type,
        webkitRelativePath: image.webkitRelativePath
      }
    }
    return JSON.stringify(JSONImage)
  }

  const removeImage = (imageId: number) => {
    const imagesCopy = [...images]
    imagesCopy.splice(imageId, 1)
    setImages(imagesCopy)
  }

  return { sendImages, removeImage }
}
