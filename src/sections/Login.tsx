import parchesChatIcon from "../assets/icons/parches-chat-icon.svg"
import Button from "../components/Button/Button"
import Form from "../components/Form/Form"
import githubIcon from "../assets/icons/github-icon.svg"

export default function Login() {
  return (
    <section className="login">
      <div className="content">
        <img className="content__image" src={parchesChatIcon} alt="Ícono de Parches Chat" />
        <h1 className="content__title">Parches Chat</h1>
        <p className="content_description">Agrega a tus amigos, envía mensajes, crea o únete a un grupo, y mucho más!</p>
        <Form />
        <Button text="Ingresar" />
        <p className="content__repository">Ver repositorio <img src={githubIcon} alt="Ícono de Github" /></p>
      </div>
    </section>
  )
}