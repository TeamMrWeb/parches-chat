import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">¡Ups! La ruta que has ingresado no existe.</h1>
      <Link className="not-found__button" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}
