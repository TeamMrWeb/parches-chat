import { gql, useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../slicers/alertMessageSlice"

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

export const useSubmitForm = () => {
  const [register] = useMutation(userRegister)
  const [login] = useMutation(userLogin)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string, redirecturl: string) => {
    e.preventDefault()
    const formInputsElements = e.currentTarget.elements as HTMLFormControlsCollection
    const inputsArray = Object.values(formInputsElements).slice(0, -1)
    let userData = {}
    inputsArray.forEach(elem => {
      Object.assign(userData, { [(elem as HTMLInputElement).name]: (elem as HTMLInputElement).value })
    })
    const { username, email, password } = userData as any
    console.log({ username, email, password })

    if (type === "register") {
      register({ variables: { username, email, password } })
        .then(res => {
          console.log(res)
          const authToken = res.data.register
          localStorage.setItem("auth", authToken)
        })
        .catch(err => {
          console.log(err)
          dispatch(createAlertMessage({ title: "Error de Registro", description: err.message, type: "warning", visible: true }))
        })
    } else {
      login({ variables: { email, password } })
        .then(res => {
          const authToken = res.data.login
          localStorage.setItem("auth", authToken)
        })
        .catch(err => {
          console.log(err)
          dispatch(createAlertMessage({ title: "Error de Ingreso", description: err.message, type: "error", visible: true }))
        })
    }
  }

  return { handleSubmit }
}
