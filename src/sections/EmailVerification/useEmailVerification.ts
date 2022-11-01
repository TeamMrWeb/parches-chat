import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { SEND_EMAIL_VERIFICATION } from "../../graphql/queries"

export const useEmailVerification = () => {
  const [buttonCooldown, setButtonCooldown] = useState(0)
  const { lazyQueryMethod: sendVerificationToEmail, error } =
    useFetchingMethod(SEND_EMAIL_VERIFICATION)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!error && buttonCooldown === 300) {
      dispatch(
        createAlertMessage({
          title: `Se ha enviado un correo de verificación a tu correo electrónico`,
          type: "success",
          visible: true
        })
      )
    }
  }, [error, buttonCooldown])

  const sendEmailVerification = (email: string) => {
    setButtonCooldown(300)
    sendVerificationToEmail({ variables: { email } }).then(() => {
      setInterval(() => setButtonCooldown(prev => prev - 1), 1000)
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
