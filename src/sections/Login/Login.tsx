import { useSubmitForm } from "../../hooks/useSubmitForm"
import { AccountQuestion, FormGroupInput, ViewRepository } from "../../components"
import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"
import { Form, Formik } from "formik"
import * as Yup from "yup"
export default function Login() {
  const { handleSubmit } = useSubmitForm()

  return (
    <section className="login">
      <div className="content">
        <header className="header">
          <img className="content__image" src={parchesChatIcon} alt="Ícono de Parches Chat" />
          <h1 className="content__title">Parches Chat</h1>
          <p className="content__description">¡Ingresa con tu cuenta y comienza a chatear!</p>
        </header>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Correo electrónico inválido").required("Requerido"),
            password: Yup.string()
              .max(20, "Debe contener 20 caracteres o menos")
              .min(6, "Debe contener 6 caracteres o mas")
              .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}$/,
                "Debe contener al menos una mayúscula, una minúscula y un número"
              )
              .required("Requerido")
          })}
          onSubmit={values => handleSubmit(values, "login", "/chat")}
        >
          <Form className="form">
            <FormGroupInput
              type="email"
              label="Correo electrónico"
              placeholder="example@gmail.com"
              required={true}
            />
            <FormGroupInput
              type="password"
              label="Contraseña"
              placeholder="example196"
              minLength={4}
              maxLength={15}
              required={true}
            />
            <input className="form__submit" type="submit" value="Ingresar" />
            <AccountQuestion
              question="¿No estas registrado?"
              href="/accounts/register"
              hrefText="Registrarse"
            />
          </Form>
        </Formik>
      </div>
      <ViewRepository />
    </section>
  )
}
