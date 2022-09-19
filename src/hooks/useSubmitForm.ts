import { useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createAlertMessage } from "../slicers/alertMessageSlice"
import { startLoader, completeProgressLoader } from "../slicers/loaderSlice"
import { userRegister, userLogin } from "../graphql/mutations"

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

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

  const getUserData = (e: React.FormEvent<HTMLFormElement>) => {
    const formInputsElements = e.currentTarget.elements as HTMLFormControlsCollection
    const inputsArray = Object.values(formInputsElements).slice(0, -1)
    let userData = {}
    inputsArray.forEach(elem => {
      Object.assign(userData, { [(elem as HTMLInputElement).name]: (elem as HTMLInputElement).value })
    })
    const { username, email, password } = userData as any
    return { username, email, password }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string, redirecturl: string) => {
    e.preventDefault()
    dispatch(startLoader())
    const { username, email, password } = getUserData(e)
    submitMethods[type as keyof typeof submitMethods]({ variables: { username, email, password } })
      .then((res: any) => {
        dispatch(completeProgressLoader())
        dispatch(
          createAlertMessage({
            title: `El ${capitalizeFirstLetter(type)} se realizó correctamente`,
            type: "success",
            visible: true
          })
        )
        if (type === "login") {
          const token = res.data.login
          localStorage.setItem("auth", token)
          navigate("/chat")
        }
      })
      .catch((err: any) => {
        dispatch(completeProgressLoader())
        console.log(err)
        dispatch(
          createAlertMessage({
            title: `Error de ${capitalizeFirstLetter(type)}`,
            description: err.message,
            type: "error",
            visible: true
          })
        )
      })
  }

  return { handleSubmit }
}
