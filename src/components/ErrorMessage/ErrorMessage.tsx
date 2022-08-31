import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import closeIcon from "../../assets/icons/close-icon.svg"
import errorIcon from "../../assets/icons/error-icon.svg"
import { closeError } from "../../slicers/errorMessageSlice"

export default function ErrorMessage() {
  const errorMessage = useSelector((state: any) => state.errorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeError())
    }, 10000)
  }, [])

  return (
    <section className="error">
      <img className="error__icon error__icon--danger" src={errorIcon} alt="Ícono de error" />
      <div className="error-message">
        <strong className="error-message__title">{errorMessage.title}</strong>
        <p className="error-message__description">{errorMessage.description}</p>
      </div>
      <img
        className="error__icon error__icon--close"
        src={closeIcon}
        alt="Ícono de cerrar mensaje"
        onClick={() => dispatch(closeError())}
      />
    </section>
  )
}
