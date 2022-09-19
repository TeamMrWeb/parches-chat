export default function ChatPreviewImage({ image, setImage }: { image: string; setImage: (image: string) => void }) {
  return (
    <section className="preview-container">
      <div className="preview-wrapper">
        <div className="preview-image">
          <img className="preview-image__image" src={image} alt="imagen" />
          <span className="preview-image__name">hola</span>
        </div>
      </div>
    </section>
  )
}
