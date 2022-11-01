import { useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createAlertMessage } from "../slicers/alertMessageSlice"
import { startLoader, completeProgressLoader } from "../slicers/loaderSlice"
import { userRegister, userLogin } from "../graphql/mutations"

export const useSubmitForm = () => {
  const [register] = useMutation(userRegister)
  const [login] = useMutation(userLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitMethods: {
    register: any
    login: any
  } = {
    register,
    login
  }

  const handleSubmit = (values: any, type: string, redirecturl: string) => {
    dispatch(startLoader())
    console.log(values)
    const { username, email, password, authStrategy } = values
    submitMethods[type as keyof typeof submitMethods]({
      variables: { username, email, password, authStrategy }
    })
      .then((res: any) => {
        dispatch(completeProgressLoader())
        if (type === "register") return navigate(`${redirecturl}/${email}`)
        if (type === "login") {
          const token = res.data.login
          localStorage.setItem("auth", token)
        }
        redirecturl && navigate(redirecturl)
      })
      .catch((err: any) => {
        dispatch(completeProgressLoader())
        console.log(err)
        dispatch(
          createAlertMessage({
            title: `Error de ${type === "login" ? "inicio de sesión" : "registro"}`,
            description: err.message,
            type: "error",
            visible: true
          })
        )
      })
  }

  return { handleSubmit }
}
