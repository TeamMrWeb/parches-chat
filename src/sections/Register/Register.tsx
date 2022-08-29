import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"
import githubIcon from "../../assets/icons/github-icon.svg"

export default function Register() {
  return (
    <section className="register">
      <div className="content">
        <header className="header">
          <img className="content__image" src={parchesChatIcon} alt="Ícono de Parches Chat" />
          <h1 className="content__title">Parches Chat</h1>
          <p className="content__description">Registra tu cuenta</p>
        </header>
        {/* <Form /> */}
      </div>
      <a className="content__repository" href="https://github.com/teamparches/parches-chat" target="_blank">
        Ver repositorio <img src={githubIcon} alt="Ícono de Github" />
      </a>
    </section>
  )
}
