import { useSubmitForm } from "../../hooks/useSubmitForm"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { AccountQuestion, FormGroupInput, ViewRepository } from "../../components"
import parchesChatIcon from "../../assets/icons/parches-chat-icon.svg"
import googleIcon from "../../assets/icons/google-icon.svg"
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn"

export default function Register() {
  const { handleSubmit } = useSubmitForm()
  const { signInWithGoogle } = useGoogleSignIn()

  return (
    <section className="register">
      <div className="content">
        <header className="header">
          <img className="content__image" src={parchesChatIcon} alt="Ícono de Parches Chat" />
          <h1 className="content__title">Parches Chat</h1>
          <p className="content__description">Registra tu cuenta</p>
        </header>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: ""
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Debe contener 15 caracteres o menos")
              .matches(/^[a-zA-Z]+$/, "Solo se permiten letras")
              .required("Requerido"),
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
          onSubmit={values => handleSubmit(values, "register", "/login")}
        >
          <Form className="form">
            <FormGroupInput
              type="username"
              label="Nombre de usuario"
              placeholder="example"
              required={true}
            />
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
            <input className="form__submit" type="submit" value="Registrar cuenta" />
            <button className="google-register" onClick={() => signInWithGoogle()} type="button">
              <img src={googleIcon} alt="Ícono de Google" />
              <span>Registrarse con Google</span>
            </button>
            <AccountQuestion
              question="¿Ya tienes una cuenta?"
              href="/accounts/login"
              hrefText="Ingresar"
            />
          </Form>
        </Formik>
      </div>
      <ViewRepository />
    </section>
  )
}
