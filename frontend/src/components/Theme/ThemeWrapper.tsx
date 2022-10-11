import { useState, useEffect } from "react"
import { ThemeContext, themes } from "../../contexts/ThemeContext"

export default function ThemeWrapper(props: any) {
  const [theme, setTheme] = useState(themes.dark)

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content")
        break
      case themes.dark:
      default:
        document.body.classList.remove("white-content")
        break
    }
  }, [theme])

  // return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>
}
