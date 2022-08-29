import { useForm } from "./useForm"
import Button from "../Button/Button"

export default function Form() {
  const { handleSubmit } = useForm()

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form__label" htmlFor="email">
          Correo electrónico
        </label>
        <input className="form__input" type="email" name="email" id="email" placeholder="example@gmail.com" required />
      </div>
      <div className="form-group">
        <label className="form__label" htmlFor="password">
          Contraseña
        </label>
        <input
          className="form__input"
          type="password"
          name="password"
          id="password"
          placeholder="example719"
          required
          minLength={4}
          maxLength={15}
        />
      </div>
      <input className="form__submit" type="submit" value="Ingresar" />
      <div className="not-registered">
        <p className="form__register-text">¿No estas registrado? </p>
        <a className="form__register-anchor" href="#/">
          Registro
        </a>
      </div>
    </form>
  )
}
