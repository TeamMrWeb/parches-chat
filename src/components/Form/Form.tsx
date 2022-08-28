import { useForm } from "./useForm"
import Button from "../Button/Button"

export default function Form() {

  const {handleSubmit} = useForm()  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="email">Correo electrónico</label>
      <input type="text" name="email" placeholder="example@gmail.com" />
      <label className="form__label" htmlFor="password">Contraseña</label>
      <input type="password" name="password" placeholder="example719" />
      <p className="form__register-text">¿No estas registrado? <Button text="Registro"/></p>
      <input type="submit" value="Ingresar" />
    </form>
  )
}