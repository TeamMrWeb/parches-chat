import { useEffect } from "react"
import { provider } from "../authGoogleProvider"
import { useSubmitForm } from "./useSubmitForm"
import { getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth"

export const useGoogleSignIn = (authMethod: string) => {
  const auth = getAuth()
  const { handleSubmit } = useSubmitForm()

  useEffect(() => {
    getRedirectResult(auth).then((result: any) => {
      if (!result) return
      const user = result.user
      const email = user.email
      const username = user.displayName
      const password = ""
      const authStrategy = "google"
      console.log(user)
      console.log(authMethod)
      authMethod === "register"
        ? handleSubmit(
            { username, email, password, authStrategy },
            "register",
            "/accounts/emailverification"
          )
        : handleSubmit({ email, password, authStrategy }, "login", "/chat")
    })
  }, [authMethod])

  const signInWithGoogle = () => signInWithRedirect(auth, provider)

  return { signInWithGoogle }
}
