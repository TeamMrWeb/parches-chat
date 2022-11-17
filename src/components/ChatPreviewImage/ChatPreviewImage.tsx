import downArrow from "../../assets/icons/down-arrow-icon.svg"
import { useChatPreviewImage } from "./useChatPreviewImage"
import trashIcon from "../../assets/icons/trash-icon.svg"

export default function ChatPreviewImage({
  images,
  setImages
}: {
  images: File[]
  setImages: React.Dispatch<React.SetStateAction<File[]>>
}) {
  const { sendImages, removeImage } = useChatPreviewImage(images, setImages)

  return (
    <section className="preview-container">
      <ul className="images-list">
        {images.map((image, index) => (
          <div className="preview-wrapper" key={index}>
            <div className="preview-image">
              <img className="preview-image__image" src={URL.createObjectURL(image)} alt="imagen" />
              <span className="preview-image__name">{image.name}</span>
              <button className="delete-image" onClick={() => removeImage(index)}>
                <img className="delete-image__icon" src={trashIcon} alt="Borrar Imágen" />
              </button>
            </div>
            <button className="send-image" onClick={() => sendImages(images)}>
              <img className="send-image__icon" src={downArrow} alt="Enviar imágen" />
            </button>
          </div>
        ))}
      </ul>
    </section>
  )
}
