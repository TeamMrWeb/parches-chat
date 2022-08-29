import { useForm } from "./useForm"
import FormGroupInput from "../FormGroupInput/FormGroupInput"
import AccountQuestion from "../AccountQuestion/AccountQuestion"

export default function Form() {
  const { handleSubmit } = useForm()

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormGroupInput type="email" label="Correo electrónico" placeholder="example@gmail.com" required={true} />
      <FormGroupInput type="password" label="Contraseña" placeholder="example196" minLength={4} maxLength={15} required={true} />
      <input className="form__submit" type="submit" value="Ingresar" />
      <AccountQuestion question="¿No estas registrado?" href="http://localhost:3000/accounts/register" hrefText="Registrarse" />
    </form>
  )
}
