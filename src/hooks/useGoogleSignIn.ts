import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { provider } from "../authGoogleProvider"
import { useSubmitForm } from "./useSubmitForm"

export const useGoogleSignIn = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { handleSubmit } = useSubmitForm()

  useEffect(() => {
    getRedirectResult(auth)
      .then((result: any) => {
        const user = result?.user
        const email = user.email
        console.log(user)
        // handleSubmit(user, "login", "/chat")
        // navigate("/login")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error?.customData?.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorCode, errorMessage, email, credential)
      })
  }, [])

  const signInWithGoogle = () => signInWithRedirect(auth, provider)

  return { signInWithGoogle }
}
