interface AccountQuestion {
  question: string
  href: string
  hrefText: string
}

export default function AccountQuestion({ question, href, hrefText }: AccountQuestion) {
  return (
    <div className="account-question">
      <p className="account-question__text">{question}</p>
      <a className="account-question__link" href={href}>
        {hrefText}
      </a>
    </div>
  )
}
