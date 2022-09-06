import { Link } from "react-router-dom"

interface AccountQuestion {
  question: string
  href: string
  hrefText: string
}

export default function AccountQuestion({ question, href, hrefText }: AccountQuestion) {
  return (
    <div className="account-question">
      <p className="account-question__text">{question}</p>
      <Link className="account-question__link" to={href}>
        {hrefText}
      </Link>
    </div>
  )
}
