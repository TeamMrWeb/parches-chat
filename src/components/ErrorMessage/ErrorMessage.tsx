import closeIcon from "../../assets/icons/close-icon.svg"
import errorIcon from "../../assets/icons/error-icon.svg"

export default function ErrorMessage({ setError }: { setError: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <section className="error">
      <img className="error__icon error__icon--danger" src={errorIcon} alt="Ícono de error" />
      <div className="error-message">
        <strong className="error-message__title">Error!</strong>
        <p className="error-message__description">Ups, algo salió mal. Intenta probar más tarde</p>
      </div>
      <img className="error__icon error__icon--close" src={closeIcon} alt="Ícono de cerrar mensaje" onClick={() => setError(false)} />
    </section>
  )
}
