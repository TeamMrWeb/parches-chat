import { useEffect } from "react"
import { provider } from "../authGoogleProvider"
import { useSubmitForm } from "./useSubmitForm"
import { getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../slicers/loaderSlice"

export const useGoogleSignIn = (authMethod: string) => {
  const auth = getAuth()
  const { handleSubmit } = useSubmitForm()
  const dispatch = useDispatch()

  useEffect(() => {
    getRedirectResult(auth).then((result: any) => {
      if (!result) return
      dispatch(stopLoader())
      const user = result.user
      const email = user.email
      const username = user.displayName
      const password = ""
      const authStrategy = "google"
      authMethod === "register"
        ? handleSubmit(
            { username, email, password, authStrategy },
            "register",
            "/accounts/emailverification"
          )
        : handleSubmit({ email, password, authStrategy }, "login", "/chat")
    })
  }, [authMethod])

  const signInWithGoogle = () => {
    dispatch(startLoader())
    signInWithRedirect(auth, provider)
  }

  return { signInWithGoogle }
}
