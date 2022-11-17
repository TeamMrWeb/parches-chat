import { Link } from "react-router-dom"
import { AccountQuestionProps } from "../../ts/interfaces"

export default function AccountQuestion({ question, href, hrefText }: AccountQuestionProps) {
  return (
    <div className="account-question">
      <p className="account-question__text">{question}</p>
      <Link className="account-question__link" to={href}>
        {hrefText}
      </Link>
    </div>
  )
}
