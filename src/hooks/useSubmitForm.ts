import { gql, useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../slicers/alertMessageSlice"
import { startLoader, stopLoader, completeProgressLoader } from "../slicers/loaderSlice"

const userRegister = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`

const userLogin = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const useSubmitForm = () => {
  const [register, { loading }] = useMutation(userRegister)
  const [login] = useMutation(userLogin)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string, redirecturl: string) => {
    e.preventDefault()
    dispatch(startLoader())

    const formInputsElements = e.currentTarget.elements as HTMLFormControlsCollection
    const inputsArray = Object.values(formInputsElements).slice(0, -1)
    let userData = {}
    inputsArray.forEach(elem => {
      Object.assign(userData, { [(elem as HTMLInputElement).name]: (elem as HTMLInputElement).value })
    })
    const { username, email, password } = userData as any

    const submitMethods: {
      register: any
      login: any
    } = {
      register,
      login
    }

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
