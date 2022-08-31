import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"
import githubIcon from "../../assets/icons/github-icon.svg"
import AccountQuestion from "../../components/AccountQuestion/AccountQuestion"
import { useSubmitForm } from "../../hooks/useSubmitForm"
import FormGroupInput from "../../components/FormGroupInput/FormGroupInput"
import { FormEventHandler } from "react"

export default function Register() {
  const { handleSubmit } = useSubmitForm()

  return (
    <section className="register">
      <div className="content">
        <header className="header">
          <img className="content__image" src={parchesChatIcon} alt="Ícono de Parches Chat" />
          <h1 className="content__title">Parches Chat</h1>
          <p className="content__description">Registra tu cuenta</p>
        </header>
        <form className="form" onSubmit={e => handleSubmit(e, "register", "/chat")}>
          <FormGroupInput type="username" label="Nombre de usuario" placeholder="example" required={true} />
          <FormGroupInput type="email" label="Correo electrónico" placeholder="example@gmail.com" required={true} />
          <FormGroupInput type="password" label="Contraseña" placeholder="example196" minLength={4} maxLength={15} required={true} />
          <input className="form__submit" type="submit" value="Registrar cuenta" />
          <AccountQuestion question="¿Ya tienes una cuenta?" href="http://localhost:3000/accounts/login" hrefText="Ingresar" />
        </form>
      </div>
      <a className="content__repository" href="https://github.com/teamparches/parches-chat" target="_blank">
        Ver repositorio <img src={githubIcon} alt="Ícono de Github" />
      </a>
    </section>
  )
}
