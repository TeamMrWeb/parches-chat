import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { stopLoaderSpinner } from "../../slicers/loaderSpinnerSlice"

export default function LoaderSpinner() {
  const [tooLongLoadMessage, setTooLongLoadMessage] = useState<any>()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("hola")
    const timeOut = setTimeout(() => {
      setTooLongLoadMessage(
        <p>
          ¿Está tardando demasiado? Puede que haya un error con el servidor.
          <br />
          <span> Intenta de nuevo más tarde.</span>
        </p>
      )
    }, 5000)
    return () => clearTimeout(timeOut)
  }, [])

  return (
    <div className="loader-spinner">
      <Oval
        height={100}
        width={100}
        color="#dd4ec6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#8d4fc9"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <p>Cargando Parches Chat...</p>
      {tooLongLoadMessage && (
        <div className="message-wrapper">
          {tooLongLoadMessage}
          <Link to="/login" className="button" onClick={() => dispatch(stopLoaderSpinner())}>
            Volver al inicio de sesión
          </Link>
        </div>
      )}
    </div>
  )
}
