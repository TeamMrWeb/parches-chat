import githubIcon from "../../assets/icons/github-icon.svg"

export default function ViewRepository() {
  return (
    <a className="view-repository" href="https://github.com/teamparches/parches-chat" target="_blank">
      Ver repositorio <img src={githubIcon} alt="Ícono de Github" />
    </a>
  )
}
