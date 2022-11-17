import ViewRepository from "../../components/ViewRepository/ViewRepository"
import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"

export default function Home() {
  return (
    <section className="home">
      <header className="home-header">
        <img className="home__logo" src={parchesChatIcon} alt="Logo de Parches Chat" />
        <h1 className="home__title">Parches Chat</h1>
        <p className="home__description">Agrega a tus amigos, envía mensajes, crea o únete a un grupo, y mucho más!</p>
      </header>
      <div className="button-container">
        <ViewRepository />
      </div>
    </section>
  )
}
