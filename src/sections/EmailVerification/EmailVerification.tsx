import { useParams } from "react-router-dom"
import { useEmailVerification } from "./useEmailVerification"

export default function EmailVerification() {
  const { email, username } = useParams<{ email: string; username: string }>()
  const { sendEmailVerification, buttonCooldown, convertTimeToMinutesAndSeconds } =
    useEmailVerification()

  return (
    <section className="email-verification">
      <div className="email-verification-wrapper">
        <h1 className="email-verification__title">Gracias por registrarte</h1>
        <h2 className="email-verification__subtitle">
          ¡Tu cuenta ha sido creada satisfactoriamente!
        </h2>
        <p className="email-verification__description">
          Por favor confirma que quieres usar este correo para ingresar a Parches Chat
        </p>
        <button
          className={buttonCooldown >= 1 ? "button disabled" : "button"}
          onClick={() => email && sendEmailVerification(email)}
          disabled={buttonCooldown >= 1}
        >
          Verificar correo electrónico
        </button>
        {buttonCooldown >= 1 && (
          <p className="email-verification__cooldown">
            Podras volver a enviar la verificación en:{" "}
            <span>{convertTimeToMinutesAndSeconds(buttonCooldown)}</span>
          </p>
        )}
      </div>
    </section>
  )
}
