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
    const { username, email, password } = values
    submitMethods[type as keyof typeof submitMethods]({ variables: { username, email, password } })
      .then((res: any) => {
        dispatch(completeProgressLoader())
        type === "register" &&
          dispatch(
            createAlertMessage({
              title: `Tu cuenta se ha registrado satisfactoriamente`,
              type: "success",
              visible: true
            })
          )
        if (type === "login") {
          const token = res.data.login
          localStorage.setItem("auth", token)
        }
        navigate(redirecturl)
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
