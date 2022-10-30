import { useLazyQuery } from "@apollo/client"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SEND_EMAIL_VERIFICATION } from "../../graphql/queries"
import { createAlertMessage } from "../../slicers/alertMessageSlice"

export const useEmailVerification = () => {
  const [buttonCooldown, setButtonCooldown] = useState(0)
  const [sendVerificationToEmail] = useLazyQuery(SEND_EMAIL_VERIFICATION)
  const dispatch = useDispatch()

  const sendEmailVerification = (email: string) => {
    sendVerificationToEmail({ variables: { email } })
      .then(() => {
        setButtonCooldown(300)
        setInterval(() => {
          setButtonCooldown(prev => prev - 1)
        }, 1000)
        dispatch(
          createAlertMessage({
            title: `Se ha enviado un correo de verificación a ${email}`,
            type: "success",
            visible: true
          })
        )
      })
      .catch((err: any) => {
        dispatch(
          createAlertMessage({
            title: `Ha ocurrido un error`,
            description: err.message,
            type: "error",
            visible: true
          })
        )
      })
  }

  const convertTimeToMinutesAndSeconds = (time: number) => {
    const minutes = Math.floor(time / 60)
    const rawSeconds = time - minutes * 60
    const seconds = rawSeconds < 10 ? `0${rawSeconds}` : rawSeconds
    return `0${minutes}:${seconds}`
  }

  return { sendEmailVerification, buttonCooldown, convertTimeToMinutesAndSeconds }
}
