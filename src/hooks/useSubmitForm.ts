import { ApolloClient, gql, useMutation } from "@apollo/client"

const userRegister = gql`
  mutation {
    register(username: "puto", email: "puto@hotmail.com", password: "puto")
  }
`

export const useSubmitForm = () => {
  const [RegisterUser] = useMutation(userRegister)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string, redirecturl: string) => {
    e.preventDefault()
    const formArray = Array.from(e.currentTarget.elements as HTMLFormControlsCollection)
    const inputsValues = formArray.map(element => (element as HTMLInputElement).value).slice(0, -1)
    const [username, email, password] = inputsValues
    console.log(username, email, password)

    RegisterUser().then(res => console.log(res))

    //dependiendo de la id del form, hacer el graphql hacia donde diga
    // setForm({ ...form, email, password })
    //graphql = "regisstro/manu".then( response ) mostrar la reponse
  }

  return { handleSubmit }
}
