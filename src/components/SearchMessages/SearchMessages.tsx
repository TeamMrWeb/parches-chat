import downArrow from "../../assets/icons/down-arrow-icon.svg"
import closeIcon from "../../assets/icons/close-icon.svg"
import { useShowSearchMessages } from "../../contexts/ShowSearchMessagesContext"
import { useSearchMessages } from "./useSearchMessages"

export default function SearchMessages() {
  const { showSearchMessages, setShowSearchMessages } = useShowSearchMessages()
  const { setMessage, setCoincidence } = useSearchMessages()

  return (
    <section className="search-messages">
      <input
        className="search-messages__input"
        type="text"
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="search-messages__coincidence"
        onClick={() =>
          setCoincidence(coincidence => {
            return { index: coincidence.index + 1, direction: "up" }
          })
        }
      >
        <img className="search-messages__arrow" src={downArrow} alt="Subir coincidencia" />
      </button>
      <button
        className="search-messages__coincidence"
        onClick={() =>
          setCoincidence(coincidence => {
            return { index: coincidence.index - 1, direction: "down" }
          })
        }
      >
        <img className="search-messages__arrow--down" src={downArrow} alt="Bajar coincidencia" />
      </button>
      <button
        className="search-messages__close"
        onClick={() => setShowSearchMessages!(!showSearchMessages)}
      >
        <img className="search-messages__close-icon" src={closeIcon} alt="Cerrar buscar mensajes" />
      </button>
    </section>
  )
}
